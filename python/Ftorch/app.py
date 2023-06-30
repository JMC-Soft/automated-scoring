import onnxruntime as ort
import torch
from flask import Flask, request, jsonify
from transformers import ElectraTokenizer

app = Flask(__name__, template_folder="templates")


def to_numpy(tensor):
    return tensor.detach().cpu().numpy() if tensor.requires_grad else tensor.cpu().numpy()


def do_predict(numpy_input, idx):
    model_path = f"onnx_dir/output_model{idx}.onnx"  # Path to the saved model directory
    ort_session = ort.InferenceSession(model_path, providers=['CUDAExecutionProvider'])
    input_data = {ort_session.get_inputs()[0].name: numpy_input}
    outputs = ort_session.run(None, input_data)
    probabilities = torch.softmax(torch.tensor(outputs[0]), dim=1)
    predicted_class = torch.argmax(probabilities, dim=1).item()

    if idx == 4:
        return predicted_class + 2
    elif idx == 8:
        return predicted_class
    else:
        return predicted_class + 1


def loop_onnx(in_idx):
    return_dict = {}
    d_dict = {"score": 0, "sub": []}
    for i in range(10):
        score = do_predict(in_idx, i)
        print(score)
        d_dict["score"] = d_dict["score"] + score
        d_dict["sub"].append(score)
        if i == 2:
            return_dict["exp"] = d_dict.copy()
            d_dict["score"] = 0
            d_dict["sub"] = []
        elif i == 6:
            return_dict["org"] = d_dict.copy()
            d_dict["score"] = 0
            d_dict["sub"] = []
        elif i == 9:
            return_dict["cont"] = d_dict
        else:
            pass
        print(d_dict)
        print(return_dict)
    return return_dict


@app.route('/high', methods=['POST'])
def highschool():
    #text = request.form['data']
    text = request.get_json()["data"]
    tokenizer = ElectraTokenizer.from_pretrained('model_origin')
    encoded_input = tokenizer(text, padding="max_length", truncation=True, max_length=512, return_tensors='pt')
    input_ids = to_numpy(encoded_input['input_ids'])

    resp = loop_onnx(input_ids)
    print(resp)
    return jsonify(resp)


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
