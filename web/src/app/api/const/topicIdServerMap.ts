const TOPIC_ID_SERVER_MAP = {
  // 자기표현-나의 위인전
  1: {
    // 표현
    exp0: `${process.env.FLASK_BASE_SERVER}/biography_exp_0`,
    exp1: `${process.env.FLASK_BASE_SERVER}/biography_exp_1`,
    exp2: `${process.env.FLASK_BASE_SERVER}/biography_exp_2`,
    // 구성
    org0: `${process.env.FLASK_BASE_SERVER}/biography_org_0`,
    org1: `${process.env.FLASK_BASE_SERVER}/biography_org_1`,
    org2: `${process.env.FLASK_BASE_SERVER}/biography_org_2`,
    org3: `${process.env.FLASK_BASE_SERVER}/biography_org_3`,
    // 내용
    cont0: `${process.env.FLASK_BASE_SERVER}/biography_cont_0`,
    cont1: `${process.env.FLASK_BASE_SERVER}/biography_cont_1`,
    cont2: `${process.env.FLASK_BASE_SERVER}/biography_cont_3`,
  },

  //
  2: {
    // 표현
    exp0: `${process.env.FLASK_BASE_SERVER}/character_exp_0`,
    exp1: `${process.env.FLASK_BASE_SERVER}/character_exp_1`,
    exp2: `${process.env.FLASK_BASE_SERVER}/character_exp_2`,
    // 구성
    org0: `${process.env.FLASK_BASE_SERVER}/character_org_0`,
    org1: `${process.env.FLASK_BASE_SERVER}/character_org_1`,
    org2: `${process.env.FLASK_BASE_SERVER}/character_org_2`,
    org3: `${process.env.FLASK_BASE_SERVER}/character_org_3`,
    // 내용
    cont0: `${process.env.FLASK_BASE_SERVER}/character_cont_0`,
    cont1: `${process.env.FLASK_BASE_SERVER}/character_cont_1`,
    cont2: `${process.env.FLASK_BASE_SERVER}/character_cont_3`,
  },

  // 정보 전달-영화_독서 감상문
  3: {
    // 표현
    exp0: `${process.env.FLASK_BASE_SERVER}/review_exp_0`,
    exp1: `${process.env.FLASK_BASE_SERVER}/review_exp_1`,
    exp2: `${process.env.FLASK_BASE_SERVER}/review_exp_2`,
    // 구성
    org0: `${process.env.FLASK_BASE_SERVER}/review_org_0`,
    org1: `${process.env.FLASK_BASE_SERVER}/review_org_1`,
    org2: `${process.env.FLASK_BASE_SERVER}/review_org_2`,
    org3: `${process.env.FLASK_BASE_SERVER}/review_org_3`,
    // 내용
    cont0: `${process.env.FLASK_BASE_SERVER}/review_cont_0`,
    cont1: `${process.env.FLASK_BASE_SERVER}/review_cont_1`,
    cont2: `${process.env.FLASK_BASE_SERVER}/review_cont_3`,
  },
};

export default TOPIC_ID_SERVER_MAP;
