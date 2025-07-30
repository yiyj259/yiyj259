
import type { Question } from './types';
import { MbtiDimension } from './types';

export const QUESTIONS: Question[] = [
  // 1. IE
  {
    question: '파티에 갔을 때, 나는...',
    options: [
      { text: '많은 사람들과 어울린다', value: { dimension: MbtiDimension.IE, score: 1 } },
      { text: '몇 명과 깊은 대화를 나눈다', value: { dimension: MbtiDimension.IE, score: -1 } },
    ],
  },
  // 2. SN
  {
    question: '새로운 것을 배울 때, 나는...',
    options: [
      { text: '실제적인 예시와 경험을 선호한다', value: { dimension: MbtiDimension.SN, score: 1 } },
      { text: '개념과 이론에 더 흥미를 느낀다', value: { dimension: MbtiDimension.SN, score: -1 } },
    ],
  },
  // 3. TF
  {
    question: '친구가 고민을 털어놓을 때, 나는...',
    options: [
      { text: '논리적인 해결책을 제시한다', value: { dimension: MbtiDimension.TF, score: 1 } },
      { text: '따뜻하게 위로하고 공감해준다', value: { dimension: MbtiDimension.TF, score: -1 } },
    ],
  },
  // 4. JP
  {
    question: '여행을 계획할 때, 나는...',
    options: [
      { text: '상세한 일정을 미리 짠다', value: { dimension: MbtiDimension.JP, score: 1 } },
      { text: '즉흥적으로, 상황에 맞춰 움직인다', value: { dimension: MbtiDimension.JP, score: -1 } },
    ],
  },
  // 5. IE
  {
    question: '주말에 에너지를 얻는 방법은...',
    options: [
      { text: '친구들과 약속을 잡는다', value: { dimension: MbtiDimension.IE, score: 1 } },
      { text: '집에서 혼자 시간을 보낸다', value: { dimension: MbtiDimension.IE, score: -1 } },
    ],
  },
  // 6. SN
  {
    question: '문제를 해결할 때, 나는...',
    options: [
      { text: '현재의 사실에 집중한다', value: { dimension: MbtiDimension.SN, score: 1 } },
      { text: '미래의 가능성을 상상한다', value: { dimension: MbtiDimension.SN, score: -1 } },
    ],
  },
  // 7. TF
  {
    question: '결정을 내릴 때 중요한 것은...',
    options: [
      { text: '객관적인 사실과 원칙', value: { dimension: MbtiDimension.TF, score: 1 } },
      { text: '다른 사람들과의 관계와 조화', value: { dimension: MbtiDimension.TF, score: -1 } },
    ],
  },
  // 8. JP
  {
    question: '과제를 할 때, 나는...',
    options: [
      { text: '마감일 전에 미리 끝내놓는다', value: { dimension: MbtiDimension.JP, score: 1 } },
      { text: '마감일 직전에 집중해서 한다', value: { dimension: MbtiDimension.JP, score: -1 } },
    ],
  },
    // 9. IE
  {
    question: '팀 프로젝트를 할 때, 나는...',
    options: [
      { text: '아이디어를 내며 토론을 주도한다', value: { dimension: MbtiDimension.IE, score: 1 } },
      { text: '조용히 내 역할을 수행한다', value: { dimension: MbtiDimension.IE, score: -1 } },
    ],
  },
  // 10. SN
  {
    question: '영화를 볼 때, 나는...',
    options: [
      { text: '구체적인 줄거리와 장면에 집중한다', value: { dimension: MbtiDimension.SN, score: 1 } },
      { text: '영화 속 상징과 의미를 찾는다', value: { dimension: MbtiDimension.SN, score: -1 } },
    ],
  },
  // 11. TF
  {
    question: '피드백을 할 때, 나는...',
    options: [
      { text: '솔직하고 직설적으로 말한다', value: { dimension: MbtiDimension.TF, score: 1 } },
      { text: '상대방의 기분을 고려하여 조심스럽게 말한다', value: { dimension: MbtiDimension.TF, score: -1 } },
    ],
  },
  // 12. JP
  {
    question: '내 책상은 보통...',
    options: [
      { text: '잘 정리정돈 되어 있다', value: { dimension: MbtiDimension.JP, score: 1 } },
      { text: '창의적인 혼돈 상태다', value: { dimension: MbtiDimension.JP, score: -1 } },
    ],
  },
  // 13. IE (New)
  {
    question: '새로운 환경에 갔을 때, 나는...',
    options: [
        { text: '먼저 다가가서 말을 건다', value: { dimension: MbtiDimension.IE, score: 1 } },
        { text: '다른 사람이 말을 걸어주기를 기다린다', value: { dimension: MbtiDimension.IE, score: -1 } },
    ],
  },
  // 14. SN (New)
  {
    question: '나는 설명서를 볼 때...',
    options: [
      { text: '글자 그대로 따라하는 편이다', value: { dimension: MbtiDimension.SN, score: 1 } },
      { text: '전체적인 흐름을 파악하고 내 방식대로 한다', value: { dimension: MbtiDimension.SN, score: -1 } },
    ],
  },
  // 15. TF (New)
  {
    question: '나는 칭찬을 들으면...',
    options: [
      { text: "'어떤 점을 잘했는지' 구체적으로 듣고 싶다", value: { dimension: MbtiDimension.TF, score: 1 } },
      { text: "'잘했다'는 따뜻한 말 한마디면 충분하다", value: { dimension: MbtiDimension.TF, score: -1 } },
    ],
  },
  // 16. JP (New)
  {
    question: '갑자기 약속이 취소되면...',
    options: [
      { text: '미리 세워둔 다른 계획을 실행한다', value: { dimension: MbtiDimension.JP, score: 1 } },
      { text: "'자유시간이 생겼다!'며 즐거워한다", value: { dimension: MbtiDimension.JP, score: -1 } },
    ],
  },
    // 17. IE (New)
  {
    question: '에너지가 넘칠 때 나는...',
    options: [
      { text: '밖으로 나가서 활동적인 것을 한다', value: { dimension: MbtiDimension.IE, score: 1 } },
      { text: '혼자만의 상상이나 취미에 몰두한다', value: { dimension: MbtiDimension.IE, score: -1 } },
    ],
  },
  // 18. SN (New)
  {
    question: '나는 대화할 때...',
    options: [
      { text: "'그래서 실제로 어떻게 됐는데?'가 궁금하다", value: { dimension: MbtiDimension.SN, score: 1 } },
      { text: "'그게 어떤 의미를 가질까?'가 궁금하다", value: { dimension: MbtiDimension.SN, score: -1 } },
    ],
  },
  // 19. TF (New)
  {
    question: '논쟁이 생겼을 때, 나는...',
    options: [
      { text: '누가 맞고 틀렸는지가 더 중요하다', value: { dimension: MbtiDimension.TF, score: 1 } },
      { text: '모두의 감정이 상하지 않는 것이 더 중요하다', value: { dimension: MbtiDimension.TF, score: -1 } },
    ],
  },
  // 20. JP (New)
  {
    question: '방 청소를 할 때, 나는...',
    options: [
      { text: '구역을 나눠서 체계적으로 한다', value: { dimension: MbtiDimension.JP, score: 1 } },
      { text: '눈에 보이는 것부터 마음 가는 대로 한다', value: { dimension: MbtiDimension.JP, score: -1 } },
    ],
  },
];
