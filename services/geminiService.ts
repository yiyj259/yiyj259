import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion } from '../types';
import { TOTAL_QUESTIONS } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const prompt = `
      You are a language expert specializing in creating test preparation materials for the TEPS (Test of English Proficiency developed by Seoul National University).

      Your task is to generate ${TOTAL_QUESTIONS} unique, high-quality, multiple-choice vocabulary questions. These questions should focus on essential, frequently-used vocabulary crucial for the TEPS exam. Please prioritize important, high-frequency words over overly obscure or specialized ones. The target difficulty should be intermediate to advanced, suitable for a wide range of test-takers.

      For each question, provide:
      1. A sentence in English with a blank (represented by "______") where a key vocabulary word should go. The sentence should provide enough context to deduce the meaning of the word.
      2. Four multiple-choice options.
      3. One of the options must be the correct answer that fits perfectly in the blank.
      4. The other three options must be incorrect but plausible distractors. They might be related in meaning, sound similar, or be common mistakes.
      5. The correct answer itself.
      6. A concise explanation of the correct answer's meaning and why it fits the sentence's context, written in Korean.

      Return the result in a JSON format that strictly adheres to the provided schema. Do not include any introductory text, backticks, or markdown formatting around the JSON output.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sentence: {
                type: Type.STRING,
                description: "The sentence with a blank '______'."
              },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING
                },
                description: "An array of four strings: one correct answer and three distractors."
              },
              answer: {
                type: Type.STRING,
                description: "The correct word that fits in the blank."
              },
              explanation: {
                type: Type.STRING,
                description: "A concise explanation, in Korean, of the correct answer's meaning and its suitability for the sentence."
              }
            },
            required: ["sentence", "options", "answer", "explanation"]
          }
        }
      }
    });

    const jsonString = response.text.trim();
    const questions = JSON.parse(jsonString);

    // Ensure options are shuffled for each question
    return questions.map((q: QuizQuestion) => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("Failed to generate quiz questions from Gemini API.");
  }
}