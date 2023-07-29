import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score, classification_report, roc_auc_score
from sklearn.preprocessing import LabelBinarizer
import seaborn as sns
import dataframe_image as dfi
import numpy as np

# plt 한글깨짐 방지
plt.rc('font', family='Malgun Gothic')

# call DataFrame
df_essay = pd.read_excel("val.xlsx")
# df_explain = pd.read_excel("data/영화_독서감상문.xlsx")
# df_alternative = pd.read_excel("data/혐오시설 건설문제에 대한 본인의 생각.xlsx")

df_result_essay = pd.read_excel("result.xlsx")
# df_result__explain = pd.read_excel("result_explain.xlsx")
# df_result__alternative = pd.read_excel("result_alternative.xlsx")
model_names = {"cont0": "내용1 – 주제의 명료성", "cont1": "내용2 – 근거의 적절성", "cont3": "내용3 – 프롬프트 독해력",
               "exp0": "표현1 – 문법의 적절성", "exp1": "표현2 – 단어 사용의 적절성", "exp2": "표현3 – 문장 표현의 적절성",
               "org0": "구성1 – 문단 내 구조의 적절성", "org1": "구성2 – 문단 간 구조의 적절성", "org2": "구성3 – 구조의 일관성",
               "org3": "구성4 – 분량의 적절성"}


def export_result(category):
    df_label = df_essay
    df_preds = df_result_essay

    df_scatter = pd.DataFrame()
    df_temp = df_label.drop(df_label.columns[0], axis=1)
    df_scatter["label"] = df_temp.sum(axis=1)
    df_scatter["pred"] = df_preds.sum(axis=1)
    labels = df_scatter["label"]
    preds = df_scatter["pred"]
    score_dict = {}
    detail = "all"
    print(labels)
    print(preds)

    # for detail in model_names.keys():
    #     print(detail)
    #     score_dict = {}
    #     labels = df_label[detail]
    #     print(labels)
    #     preds = df_preds[detail]
    #     print(preds)

    # classification_report
    report = classification_report(labels, preds, output_dict=True)

    report_df = pd.DataFrame(report)
    dfi.export(report_df, f'./result_report_{detail}.png', max_cols=-1, max_rows=-1)
    print(f"{category}+{detail} report SAVE")

    # confusion matrix
    cm = confusion_matrix(labels, preds)
    ax = sns.heatmap(cm, annot=True, cmap='YlGn_r')
    # plt.title(model_names[detail])
    plt.title(detail)
    plt.savefig(f'./result_confusion_matrix.png')
    print(f"{category}+{detail} cm SAVE")
    plt.clf()

    # score
    score_dict["accuracy_score"] = '{:.4f}'.format(accuracy_score(labels, preds))
    score_dict["f1_score(micro)"] = '{:.4f}'.format(f1_score(labels, preds, average="micro"))
    score_dict["f1_score(macro)"] = '{:.4f}'.format(f1_score(labels, preds, average="macro"))
    score_dict["f1_score(weighted)"] = '{:.4f}'.format(f1_score(labels, preds, average="weighted"))

    label_binarizer = LabelBinarizer().fit(labels)
    labels = label_binarizer.transform(labels)
    preds = label_binarizer.transform(preds)
    auc = roc_auc_score(
        labels,
        preds,
        multi_class="ovr",
        average="micro",
    )
    score_dict["auc-ovr(mircro)"] = '{:.4f}'.format(auc)

    score_df = pd.DataFrame(score_dict, index=[0])
    score_df = score_df.style.set_table_styles([
        {'selector': 'th',
         'props': [('text-align', 'center')]},
        {'selector': 'td',
         'props': [('text-align', 'center')]}
    ])
    dfi.export(score_df, f'./result_score_{detail}.png', max_cols=-1, max_rows=-1)
    print(f"{category}+{detail} score SAVE")


if __name__ == "__main__":
    cata = ["essay", "explain", "alternative"]
    # for category in cata:
    #     export_result(category)
    export_result("essay")
