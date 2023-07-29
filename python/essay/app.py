from flask import Flask, request, jsonify
from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import ElectraTokenizer, pipeline
from kiwipiepy import Kiwi
from collections import Counter

app = Flask(__name__)
kiwi = Kiwi()

model_names = ["cont0", "cont1",  "cont3","exp0", "exp1", "exp2", "org0", "org1", "org2", "org3"]
label_dict = {"LABEL_0":0,"LABEL_1":1,"LABEL_2":2,"LABEL_3":3}

essay_directory = "onnx_essay/"


# essay part
models_essay = {
    name: ORTModelForSequenceClassification.from_pretrained(essay_directory + name, file_name="model_optimized.onnx") for
    name in model_names}
tokenizers_essay = {name: ElectraTokenizer.from_pretrained(essay_directory + name) for name in model_names}
pipelines_essay = {name: pipeline("text-classification", model=models_essay[name], tokenizer=tokenizers_essay[name],padding=True, truncation=True) for name in
             model_names}


detail_name =  {
                "exp0" : "문법의 적절성",
                "exp1" : "단어 사용의 적절성",
                "exp2" : "문장 표현의 적절성",
                "org0" : "문단 내 구조의 적절성",
                "org1" : "문단 간 구조의 적절성",
                "org2" : "구조의 일관성",
                "org3" : "분량의 적절성",
                "cont0": "주제의 명료성",
                "cont1" : "근거의 적절성",
                "cont3" : "프롬프트 독해력"
            }

cata_dict = {"exp":"표현", "org":"구성", "cont": "내용"}

def make_result(result_dic, average = 2.4):
    resp = {}
    for cata in cata_dict.keys():
       resp[cata] = {"title":cata_dict[cata], "detail":[]}

    for detail in result_dic.keys():
        for cata in cata_dict.keys():
            if cata in detail:
                in_detail = {"title":detail_name[detail], "score":result_dic[detail], "average":average}
                resp[cata]["detail"].append(in_detail)
            else:
                pass

    return  resp




@app.route("/predict/1", methods=["POST"])
def essay():
    if request.method == "POST":

        data = request.get_json(force=True)

        # Get the input_text from the request
        input_text = data.get('essayText', None)

        # Perform inference using all models
        results = {name: label_dict[pipelines_essay[name](input_text)[0]["label"]] for name in model_names}

        plus2_list = ["org0", "org2"]
        for key in results.keys():

            if key in plus2_list:
                results[key] += 2

            else:
                results[key] += 1

        resp = make_result(results)
        word_Cloud = [token.form for token in kiwi.tokenize(input_text) if token.tag[0]=="N"]
        resp["wordCloud"] = dict(Counter(word_Cloud))



        return jsonify(resp)


@app.route("/")
def test():
    print("hello cutty")

    return "ESSAY connect is available"


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True, threaded=True)