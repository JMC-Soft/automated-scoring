# -*- coding: utf-8 -*-

from transformers import ElectraTokenizer
from optimum.onnxruntime import ORTModelForSequenceClassification
from optimum.onnxruntime.configuration import OptimizationConfig
from optimum.onnxruntime import ORTOptimizer

# MODEL_NAMES = ["cont0", "cont1", "cont3", "exp0", "exp1", "exp2", "org0", "org1", "org2", "org3"]
MODEL_NAMES = ["org0", "org1", "org2", "org3"]


def main(detail):
    model_checkpoint = f"model/kykim-electra-kor-base_{detail}_model"
    save_directory = f"model/onnx/{detail}"

    ort_model = ORTModelForSequenceClassification.from_pretrained(model_checkpoint, export=True, from_transformers=True)
    tokenizer = ElectraTokenizer.from_pretrained(model_checkpoint)
    # Save the onnx model and tokenizer
    ort_model.save_pretrained(save_directory)
    tokenizer.save_pretrained(save_directory)

    optimizer = ORTOptimizer.from_pretrained(ort_model)
    optimization_config = OptimizationConfig(optimization_level=99)  # enable all optimizations

    optimizer.optimize(
        save_dir=save_directory,
        optimization_config=optimization_config,
    )


for models in MODEL_NAMES:
    main(models)
