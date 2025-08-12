export interface QuizQuestion {
  sentence: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface IncorrectAnswer {
  question: QuizQuestion;
  userAnswer: string;
}

export enum GameState {
  LOADING,
  READY,
  ANSWERED,
  FINISHED,
  ERROR,
}