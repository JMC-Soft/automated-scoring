from flask import Flask, request, jsonify
from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import ElectraTokenizer, pipeline

app = Flask(__name__)

model_names = ["cont0", "cont1",  "cont3","exp0", "exp1", "exp2", "org0", "org1", "org2", "org3"]
essay_directory = "onnx_essay/"


# essay part
models_essay = {
    name: ORTModelForSequenceClassification.from_pretrained(essay_directory + name, file_name="model_optimized.onnx") for
    name in model_names}
tokenizers_essay = {name: ElectraTokenizer.from_pretrained(essay_directory + name) for name in model_names}
pipelines_essay = {name: pipeline("text-classification", model=models_essay[name], tokenizer=tokenizers_essay[name],padding=True, truncation=True) for name in
             model_names}


label_dict = {"LABEL_0":0,"LABEL_1":1,"LABEL_2":2,"LABEL_3":3}

@app.route("/predict/essay", methods=["POST"])
def essay():
    if request.method == "POST":

        data = request.get_json(force=True)

        # Get the input_text from the request
        input_text = data.get('essayText', None)

        # Perform inference using all models

        results = {name: label_dict[pipelines_essay[name](input_text)[0]["label"]] for name in model_names}

        for key in results:
            if key == "cont1" or "exp2" or "org3":
                pass

            else:
                results[key] += 1

        resp = {"exp":[],"org":[],"cont":[]}
        for key in results:
            if "exp" in key:
                resp["exp"].append(results[key])
            elif "cont" in key:
                resp["cont"].append(results[key])
            else:
                resp["org"].append(results[key])



        return jsonify(resp)
    

@app.route("/")
def test():
    print("hello cutty") 
    
    return "connect is available"  


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True, threaded=True)
