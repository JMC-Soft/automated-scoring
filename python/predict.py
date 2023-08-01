import pandas as pd
from optimum.onnxruntime import ORTModelForSequenceClassification
from transformers import ElectraTokenizer
from optimum.pipelines import pipeline
import json

MODEL_NAMES = ["cont0 - 주제의 명료성", "cont1 - 설명의 구체성", "cont3 - 사고의 창의성",
               "exp0 - 문법의 정확성", "exp1 - 단어 사용의 적절성", "exp2 - 문장 표현의 탄력성",
               "org0 - 문단 간 구조의 적절성", "org1 - 문단 내 구조의 적절성", "org2 - 구조의 일관성", "org3 - 분량의 적절성"]
CATEGORY = "영화_독서감상문"
VAL_FILE_PATH = "./preprocess_data/" + CATEGORY + "_val.xlsx"
RESULT_FILE_PATH = "./result/data/" + CATEGORY + "_result.xlsx"
ONNX = "model_optimized.onnx"

MODEL_DICT = {
    '본인의 성격': 'character',
    '나의 위인전': 'great',
    '영화_독서감상문': 'review',
}

MODEL_DIR = f"model/onnx/{MODEL_DICT[CATEGORY]}/"

model_dict = {
    name: ORTModelForSequenceClassification.from_pretrained(MODEL_DIR + name, file_name=ONNX)
    for name in MODEL_NAMES
}

tokenizers_essay = {name: ElectraTokenizer.from_pretrained(MODEL_DIR + name) for name in MODEL_NAMES}
pipelines_essay = {
    name: pipeline("text-classification", model=model_dict[name], tokenizer=tokenizers_essay[name], padding=True,
                   truncation=True, accelerator="ort") for name in
    MODEL_NAMES}

result_dict = {name: [] for name in MODEL_NAMES}


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

        plus_num = 4 - len(label_dict.keys())

        results[key] = label_dict[results[key]] + plus_num
        print(results[key])

    for key in results.keys():
        result_dict[key].append(results[key])

    return text


# 평가할 항목 선택
df_essay = pd.read_excel(VAL_FILE_PATH)

print("start essay")
df_essay["text"] = df_essay["text"].apply(infer_essay)

result_dict = pd.DataFrame(result_dict)
result_dict["text"] = df_essay["text"]
result_dict.to_excel(RESULT_FILE_PATH, index=False)
