# -*- coding: utf-8 -*-

import onnxruntime
from transformers import ElectraTokenizer
import numpy as np

name = "exp0"
label_dict = {"LABEL_0": 0, "LABEL_1": 1, "LABEL_2": 2, "LABEL_3": 3}
dir_path = "essay/onnx_essay/"

onnx_model = onnxruntime.InferenceSession(dir_path + name + "/model_optimized.onnx")
onnx_tokenizer = ElectraTokenizer.from_pretrained(dir_path + name)


# Creating a custom pipeline
def onnx_pipeline(model, tokenizer, text):
    # Encoding the text
    encoded_input = tokenizer.encode_plus(text, return_tensors='np', padding='max_length', truncation=True,
                                          max_length=512)

    # Convert inputs to ndarray and ensure type is int64
    inputs_onnx = {k: np.array(v).astype(np.int64) for k, v in encoded_input.items()}

    # Running the model
    raw_outputs = model.run(None, inputs_onnx)

    # Getting the predicted class
    pred_class = np.argmax(raw_outputs[0])

    # Converting to Hugging Face's format
    return [{"label": "LABEL_" + str(pred_class), "score": raw_outputs[0].max()}]


def lambda_handler(event, context):
    # input_text = event.get('essayText', None)
    input_text = "월트디즈니는 미국 일리노이주에서 태어나 어릴적부터 그림에 관심이 많았고 새로운 매체를 접하게되면서 애니메이션 제작자로써의 꿈을 키우게된다. 그는 성인이 되고 애니메이션 영화를 만들기 위해 헐리우드로 도착해 실사영화판에서 감독직을 하면서 영화를 배우게되고 자신만의 영화를 만들려고 하지만 자본의 문제로 몇 개월동안 헤매게된다 하지만 헐리우드 최초의 여성 배극자였던 마거릿 윈클러가 윌트 디즈니에게 관심을 보이기 시작했다고 한다. 단순한 관심이 아닌 월트 디즈니의 작품을 보고 투자를 하기로 마음 먹었던 것이다. 이후 월트 디즈니는 미키마우스를 탄생시키고 대 히트를 치게된다. 이후 유성 애니메이션이라는 센세이션을 불러 일으키면서 폭팔적인 반응을 일으키고 여론이 월트 디즈니에게 좋게 돌아가자 월트디즈니가 그토록 찾아 헤메던 투자자와 배급사들이 줄을 서게되었다고 한다. 월트디즈니는 이후로도 애니메이션을 제작하다가 흑백 애니메이션보단 컬러 에니메이션을 제작하고 싶어서 연구를 통해 컬러 애니메이션을 만들게된다 당시 색감은 그리 좋은 것은 아니였지만 컬러 애니메이션을 만들었다는 것에 큰 호평을 받았다 월트 디즈니가 만든 디즈니는 현재까지도 애니메니션을 제작하면서 전세계 사람들에게 보여지고 있는데 나도 디즈니처럼 나만의 영화사를 만들어서 전세계 사람들이 내 영화를 봐주었으면 좋겠다."
    result = label_dict[onnx_pipeline(onnx_model, onnx_tokenizer, input_text)[0]["label"]] + 1
    response = {name: result}

    return response


print(lambda_handler(1, 2))
