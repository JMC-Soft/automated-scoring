from flask import Flask, request, jsonify
from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import ElectraTokenizer, pipeline

app = Flask(__name__)

model_names = ["cont0", "cont1",  "cont3","exp0", "exp1", "exp2", "org0", "org1", "org2", "org3"]
save_directory = "onnx/"

models = {
    name: ORTModelForSequenceClassification.from_pretrained(save_directory + name, file_name="model_quantized.onnx") for
    name in model_names}
tokenizers = {name: ElectraTokenizer.from_pretrained(save_directory + name) for name in model_names}
#tokenizers = ElectraTokenizer.from_pretrained(tokenizer_file="tokenizer.json")
pipelines = {name: pipeline("text-classification", model=models[name], tokenizer=tokenizers[name]) for name in
             model_names}

label_dict = {"LABEL_0":0,"LABEL_1":1,"LABEL_2":2,"LABEL_3":3}

@app.route("/predict", methods=["POST"])
def high():
    if request.method == "POST":

        data = request.get_json(force=True)

        # Get the input_text from the request
        input_text = data.get('essayText', None)

        # Perform inference using all models

        results = {name: label_dict[pipelines[name](input_text)[0]["label"]] for name in model_names}

        for key in results:
            if key == "cont1":
                pass
            elif key == "org1":
                results[key] += 2
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
