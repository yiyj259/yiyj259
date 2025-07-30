
import { GoogleGenAI } from "@google/genai";
import type { MbtiType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMbtiAnalysis = async (mbtiType: MbtiType): Promise<string> => {
  const prompt = `
    "${mbtiType}" 성격 유형을 가진 학생을 위한 심층 성격 분석을 생성해줘. 8비트 게임 캐릭터가 설명해주는 것처럼 친근하고 재미있는 말투로 작성해줘. 응답은 다음 형식의 마크다운을 사용해야 해:

    ### 🎮 주요 특징
    - [특징 1]
    - [특징 2]
    - [특징 3]

    ### 📚 학습 스타일
    - [학습 스타일 1]
    - [학습 스타일 2]

    ### 🚀 추천 진로
    - [직업 1]
    - [직업 2]
    - [직업 3]

    ### ✨ 강점 & 💧 약점
    - **강점:** [강점 1], [강점 2]
    - **약점:** [약점 1], [약점 2]
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching MBTI analysis from Gemini API:", error);
    return "오류가 발생하여 성격 분석을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.";
  }
};
