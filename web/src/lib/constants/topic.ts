import { Topic } from '@/lib/types';

const TOPICS: Topic[] = [
  {
    id: 1,
    title: '본인에게 의미있는 인물에 대한 위인전을 쓰시오.',
    subject: '나의 위인전',
    type: '자기표현',
    prompt: [
      '요즘은 책을 통해서뿐만 아니라 유튜브, 강의와 같이 다양한 매체를 통해 자신만의 롤모델을 찾을 수 있습니다.',
      '여러분도 자신만의 롤모델이 있을 것 같은데요.',
      '자신의 롤모델인 인물처럼 되었다고 생각하고 나만의 위인전을 작성해보세요.',
      '본인이 그 사람이 되었다고 생각하고 작성해도 좋고, 제 3자의 입장에서 바라보는 형식으로 작성해도 좋아요.',
      '나의 롤모델은 목표를 이루기 위해 어떤 노력을 했을지, 어떤 행운이 있었을지, 목표를 이루고 난 다음에 어떤 기분이 들었을지 마음 껏 상상해보시고 작성해주세요.',
    ],
  },
  {
    id: 2,
    title: '본인의 성격과 장/단점에 대해 쓰시오.',
    subject: '본인의 성격',
    type: '정보전달',
    prompt: [
      '우리는 모두 다른 성격을 가지고 살아갑니다.',
      '나와 제일 친한 친구도 나와 성격이 모두 같은 건 아니지요.',
      '그렇기 때문에 어떤 특별한 것에 비유될 수 있고 여러분만 아는 본인의 장단점이 있을 겁니다.',
      '장점을 예로 들어보면, 아무도 모르게 학교에 가장 먼저 와서 기다린다든지, 친구들 모르게 혼자 참고 이해해주는 경우가 많다든지, 부모님께서 힘들어 보이면 어깨를 주물러 드리는 경우가 될 것 같아요.',
      '단점을 예로 들면, 약속 시각에 항상 늦는다던가 아무렇지 않은 일에 갑자기 화가 나는 경우가 있을 것 같아요.',
      '여러분의 성격은 어떤 성격인가요? 불같은 성격인가요? 아니면 소나무처럼 우직한 성격인가요?',
      '아니면 모든 것을 빠르게 해결하고 싶어 하는 번개 같은 성격인가요?',
      '더불어 여러분의 성격의 장단점은 무엇인가요?',
      '본인의 성격을 이해하기 쉽게 어떤 것에 비유해보고 그 이유를 작성해주세요.',
      '그리고 장점 1가지와 단점 1가지를 제시하고 단점을 보완할 방법을 작성해주세요.',
      '장단점이 없다면 그렇게 생각한 이유를 작성해주세요.',
    ],
  },
  {
    id: 3,
    title: '본인이 최근 인상깊게 본 영화 혹은 책에 대해 감상문을 쓰시오.',
    subject: '감상문',
    type: '정보전달',
    prompt: [
      '영화에는 로맨스, 액션, 스릴러 등 정말 많은 장르가 있습니다.',
      '사람마다 좋아하는 장르가 있고 절대 보지 않는 장르도 있습니다.',
      '독서도 마찬가지입니다. 소설, 수필, 시, 만화, 위인전 등 여러가지 장르가 있습니다.',
      '여러분은 어떤 장르를 좋아하나요?',
      '그리고 해당 장르에서 가장 재미있게 봤던 영화나 책은 무엇인가요?',
      '자신이 봤던 영화 혹은 책을 한 편 선정하여 주제와 내용 그리고 느낀점을 감상문으로 작성해주세요.',
    ],
  },
];

export const CATEGORY_LIST = {
  '주제의 명료성': '주제 명료성',
  '설명의 구체성': '설명 구체성',
  '프롬프트 독해력': '독해력',
  '사고의 창의성': '사고 창의성',
  '문법의 정확성': '문법 정확성',
  '단어 사용의 적절성': '단어 사용',
  '문장 표현의 적절성': '문장 표현',
  '문단 간 구조의 적절성': '문단 간 구조',
  '문단 내 구조의 적절성': '문단 내 구조',
  '구조의 일관성': '구조 일관성',
  '분량의 적절성': '분량 적절성',
  '문장 표현의 탄력성': '문장 표현 탄력성',
};

export default TOPICS;
