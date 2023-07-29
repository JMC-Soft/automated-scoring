const TOPIC_ID_SERVER_MAP = {
  // 자기표현-나의 위인전
  1: {
    // 표현
    exp0: `${process.env.FLASK_BASE_SERVER}/biology/exp0`,
    exp1: `${process.env.FLASK_BASE_SERVER}/biology/exp1`,
    exp2: `${process.env.FLASK_BASE_SERVER}/biology/exp2`,
    // 구성
    org0: `${process.env.FLASK_BASE_SERVER}/biology/org0`,
    org1: `${process.env.FLASK_BASE_SERVER}/biology/org1`,
    org2: `${process.env.FLASK_BASE_SERVER}/biology/org2`,
    org3: `${process.env.FLASK_BASE_SERVER}/biology/org3`,
    // 내용
    cont0: `${process.env.FLASK_BASE_SERVER}/biology/cont0`,
    cont1: `${process.env.FLASK_BASE_SERVER}/biology/cont1`,
    cont2: `${process.env.FLASK_BASE_SERVER}/biology/cont3`,
  },

  //
  2: {
    // 표현
    exp0: `${process.env.FLASK_BASE_SERVER}/character/exp0`,
    exp1: `${process.env.FLASK_BASE_SERVER}/character/exp1`,
    exp2: `${process.env.FLASK_BASE_SERVER}/character/exp2`,
    // 구성
    org0: `${process.env.FLASK_BASE_SERVER}/character/org0`,
    org1: `${process.env.FLASK_BASE_SERVER}/character/org1`,
    org2: `${process.env.FLASK_BASE_SERVER}/character/org2`,
    org3: `${process.env.FLASK_BASE_SERVER}/character/org3`,
    // 내용
    cont0: `${process.env.FLASK_BASE_SERVER}/character/cont0`,
    cont1: `${process.env.FLASK_BASE_SERVER}/character/cont1`,
    cont2: `${process.env.FLASK_BASE_SERVER}/character/cont3`,
  },

  // 정보 전달-영화_독서 감상문
  3: {
    // 표현
    exp0: `${process.env.FLASK_BASE_SERVER}/review/exp0`,
    exp1: `${process.env.FLASK_BASE_SERVER}/review/exp1`,
    exp2: `${process.env.FLASK_BASE_SERVER}/review/exp2`,
    // 구성
    org0: `${process.env.FLASK_BASE_SERVER}/review/org0`,
    org1: `${process.env.FLASK_BASE_SERVER}/review/org1`,
    org2: `${process.env.FLASK_BASE_SERVER}/review/org2`,
    org3: `${process.env.FLASK_BASE_SERVER}/review/org3`,
    // 내용
    cont0: `${process.env.FLASK_BASE_SERVER}/review/cont0`,
    cont1: `${process.env.FLASK_BASE_SERVER}/review/cont1`,
    cont2: `${process.env.FLASK_BASE_SERVER}/review/cont3`,
  },
};

export default TOPIC_ID_SERVER_MAP;
