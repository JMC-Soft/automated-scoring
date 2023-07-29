import pandas as pd
from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import ElectraTokenizer
from optimum.pipelines import pipeline

MODEL_NAMES = ["cont0", "cont1", "cont3", "exp0", "exp1", "exp2", "org0", "org1", "org2", "org3"]
EXCEL_PATH = "./preprocess/"
CATEGORY = "글짓기"
ONNX = "model.onnx"

essay_directory = "model/onnx/"
# explain_directory = "onnx_explain/"
# alternative_directory = "onnx_alternative/"

# essay part
models_essay = {
    name: ORTModelForSequenceClassification.from_pretrained(essay_directory + name, file_name=ONNX)
    for
    name in MODEL_NAMES}
tokenizers_essay = {name: ElectraTokenizer.from_pretrained(essay_directory + name) for name in MODEL_NAMES}
pipelines_essay = {
    name: pipeline("text-classification", model=models_essay[name], tokenizer=tokenizers_essay[name], padding=True,
                   truncation=True, accelerator="ort") for name in
    MODEL_NAMES}

label_dict = {"LABEL_0": 0, "LABEL_1": 1, "LABEL_2": 2, "LABEL_3": 3}

result_essay = {name: [] for name in MODEL_NAMES}
result_explain = {name: [] for name in MODEL_NAMES}
result_alternative = {name: [] for name in MODEL_NAMES}


# # inference 함수 구축


def infer_essay(text):
    results = {name: label_dict[pipelines_essay[name](text)[0]["label"]] for name in MODEL_NAMES}

    plus2_list = ["org0", "org2"]
    for key in results.keys():
        if key in plus2_list:
            results[key] += 2

        else:
            results[key] += 1

    for key in results.keys():
        result_essay[key].append(results[key])

    return text


# 평가할 항목 선택
df_essay = pd.read_excel(EXCEL_PATH + CATEGORY + "_val.xlsx")

print("start essay")
df_essay["text"] = df_essay["text"].apply(infer_essay)

result_essay = pd.DataFrame(result_essay)
result_essay["text"] = df_essay["text"]
result_essay.to_excel("result.xlsx", index=False)
