
export enum MbtiDimension {
  IE = 'IE', // Introversion / Extroversion
  SN = 'SN', // Sensing / Intuition
  TF = 'TF', // Thinking / Feeling
  JP = 'JP', // Judging / Perceiving
}

export interface AnswerOption {
  text: string;
  value: {
    dimension: MbtiDimension;
    score: 1 | -1;
  };
}

export interface Question {
  question: string;
  options: [AnswerOption, AnswerOption];
}

export type MbtiScores = {
  [key in MbtiDimension]: number;
};

export type MbtiType = string;

export type GameState = 'start' | 'playing' | 'loading' | 'result';
