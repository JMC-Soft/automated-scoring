from flask import Flask, request, jsonify
from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import ElectraTokenizer, pipeline

app = Flask(__name__)

model_names = ["cont0", "cont1",  "cont3","exp0", "exp1", "exp2", "org0", "org1", "org2", "org3"]
label_dict = {"LABEL_0":0,"LABEL_1":1,"LABEL_2":2,"LABEL_3":3}

essay_directory = "onnx_essay/"
explain_directory = "onnx_explain/"
alternative_directory = "onnx_alternative/"


# essay part
models_essay = {
    name: ORTModelForSequenceClassification.from_pretrained(essay_directory + name, file_name="model_optimized.onnx") for
    name in model_names}
tokenizers_essay = {name: ElectraTokenizer.from_pretrained(essay_directory + name) for name in model_names}
pipelines_essay = {name: pipeline("text-classification", model=models_essay[name], tokenizer=tokenizers_essay[name],padding=True, truncation=True) for name in
             model_names}


#explain part
models_explain = {
    name: ORTModelForSequenceClassification.from_pretrained(explain_directory + name, file_name="model_optimized.onnx") for
    name in model_names}
tokenizers_explain = {name: ElectraTokenizer.from_pretrained(explain_directory + name) for name in model_names}
pipelines_explain = {name: pipeline("text-classification", model=models_explain[name], tokenizer=tokenizers_explain[name], padding=True, truncation=True) for name in
             model_names}

# alternative part
models_alternative = {
    name: ORTModelForSequenceClassification.from_pretrained(alternative_directory + name, file_name="model_optimized.onnx") for
    name in model_names}
tokenizers_alternative = {name: ElectraTokenizer.from_pretrained(alternative_directory + name) for name in model_names}
pipelines_alternative = {name: pipeline("text-classification", model=models_alternative[name], tokenizer=tokenizers_alternative[name], padding=True, truncation=True) for name in
             model_names}



@app.route("/predict/essay", methods=["POST"])
def essay():
    if request.method == "POST":

        data = request.get_json(force=True)

        # Get the input_text from the request
        input_text = data.get('essayText', None)

        # Perform inference using all models
        results = {name: label_dict[pipelines_essay[name](input_text)[0]["label"]] for name in model_names}

        plus2_list = ["org0", "org2"]
        for key in results:
            
            if key in plus2_list:
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
    
    
    
@app.route("/predict/explain", methods=["POST"])
def explain():
    if request.method == "POST":

        data = request.get_json(force=True)

        # Get the input_text from the request
        input_text = data.get('essayText', None)

        # Perform inference using all models
        results = {name: label_dict[pipelines_explain[name](input_text)[0]["label"]] for name in model_names}

        plus0_list = ["cont1","exp2", "org3"]
        for key in results:
            
            if key in plus0_list:
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
    
    
@app.route("/predict/alternative", methods=["POST"])
def alternative():
    if request.method == "POST":

        data = request.get_json(force=True)

        # Get the input_text from the request
        input_text = data.get('essayText', None)

        # Perform inference using all models
        results = {name: label_dict[pipelines_alternative[name](input_text)[0]["label"]] for name in model_names}
        
        plus2_list = ["cont0", "cont3", "exp0", "org0", "org3"]
        for key in results:
            
            if key in plus2_list:
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
