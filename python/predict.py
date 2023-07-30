import pandas as pd
from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import ElectraTokenizer
from optimum.pipelines import pipeline
import json

MODEL_NAMES = ["cont0", "cont1", "cont3", "exp0", "exp1", "exp2", "org0", "org1", "org2", "org3"]
EXCEL_PATH = "./preprocess_data/"
CATEGORY = "본인의 성격"
ONNX = "model_optimized.onnx"
MODEL_DIR = "model/onnx/character/"

# explain_directory = "onnx_explain/"
# alternative_directory = "onnx_alternative/"

# essay part
models_essay = {
    name: ORTModelForSequenceClassification.from_pretrained(MODEL_DIR + name, file_name=ONNX)
    for
    name in MODEL_NAMES}
tokenizers_essay = {name: ElectraTokenizer.from_pretrained(MODEL_DIR + name) for name in MODEL_NAMES}
pipelines_essay = {
    name: pipeline("text-classification", model=models_essay[name], tokenizer=tokenizers_essay[name], padding=True,
                   truncation=True, accelerator="ort") for name in
    MODEL_NAMES}

result_essay = {name: [] for name in MODEL_NAMES}
result_explain = {name: [] for name in MODEL_NAMES}
result_alternative = {name: [] for name in MODEL_NAMES}


# # inference 함수 구축


def infer_essay(text):
    results = {name: pipelines_essay[name](text)[0]["label"] for name in MODEL_NAMES}

    for key in results.keys():
        # json 파일 읽기
        json_path = MODEL_DIR + key + '/config.json'
        with open(json_path) as project_file:
            data = json.load(project_file)

        try:
            label_dict = data['label2id']
        except:
            label_dict = {
                "LABEL_0": 0,
                "LABEL_1": 1,
            }

        print(label_dict)

        plus_num = 4 - len(label_dict.keys())

        print(label_dict[results[key]])
        print(label_dict[results[key]] + plus_num)

        results[key] = label_dict[results[key]] + plus_num

    for key in results.keys():
        result_essay[key].append(results[key])

    return text


# 평가할 항목 선택
df_essay = pd.read_excel(EXCEL_PATH + CATEGORY + "_val.xlsx")

print("start essay")
df_essay["text"] = df_essay["text"].apply(infer_essay)

result_essay = pd.DataFrame(result_essay)
result_essay["text"] = df_essay["text"]
result_essay.to_excel(f"{CATEGORY}_result.xlsx", index=False)
