const TOPIC_ID_SERVER_MAP = {
  // 자기표현-나의 위인전
  1: {
    // 표현
    exp0: `${process.env.FLASK_SERVER_1}/exp0`,
    exp1: `${process.env.FLASK_SERVER_1}/exp1`,
    exp2: `${process.env.FLASK_SERVER_1}/exp2`,
    // 구성
    org0: `${process.env.FLASK_SERVER_1}/org0`,
    org1: `${process.env.FLASK_SERVER_1}/org1`,
    org2: `${process.env.FLASK_SERVER_1}/org2`,
    org3: `${process.env.FLASK_SERVER_1}/org3`,
    // 내용
    cont0: `${process.env.FLASK_SERVER_1}/cont0`,
    cont1: `${process.env.FLASK_SERVER_1}/cont1`,
    cont2: `${process.env.FLASK_SERVER_1}/cont2`,
  },

  // 설득-혐오 시설에 대한 본인의 생각
  2: {
    // 표현
    exp0: `${process.env.FLASK_SERVER_2}/exp0`,
    exp1: `${process.env.FLASK_SERVER_2}/exp1`,
    exp2: `${process.env.FLASK_SERVER_2}/exp2`,
    // 구성
    org0: `${process.env.FLASK_SERVER_2}/org0`,
    org1: `${process.env.FLASK_SERVER_2}/org1`,
    org2: `${process.env.FLASK_SERVER_2}/org2`,
    org3: `${process.env.FLASK_SERVER_2}/org3`,
    // 내용
    cont0: `${process.env.FLASK_SERVER_2}/cont0`,
    cont1: `${process.env.FLASK_SERVER_2}/cont1`,
    cont2: `${process.env.FLASK_SERVER_2}/cont2`,
  },

  // 정보 전달-영화_독서 감상문
  3: {
    // 표현
    exp0: `${process.env.FLASK_SERVER_3}/exp0`,
    exp1: `${process.env.FLASK_SERVER_3}/exp1`,
    exp2: `${process.env.FLASK_SERVER_3}/exp2`,
    // 구성
    org0: `${process.env.FLASK_SERVER_3}/org0`,
    org1: `${process.env.FLASK_SERVER_3}/org1`,
    org2: `${process.env.FLASK_SERVER_3}/org2`,
    org3: `${process.env.FLASK_SERVER_3}/org3`,
    // 내용
    cont0: `${process.env.FLASK_SERVER_3}/cont0`,
    cont1: `${process.env.FLASK_SERVER_3}/cont1`,
    cont2: `${process.env.FLASK_SERVER_3}/cont2`,
  },
};

export default TOPIC_ID_SERVER_MAP;
