from kiwipiepy import Kiwi
from collections import Counter

kiwi = Kiwi()


def lambda_handler(event, context):
    input_text = "안녕하세요. 저는 박찬호입니다."

    word_Cloud = [token.form for token in kiwi.tokenize(input_text) if token.tag[0] == "N"]
    resp = dict(Counter(word_Cloud))

    return resp

print(lambda_handler(1, 2))