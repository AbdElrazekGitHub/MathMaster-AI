
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMathResponse = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "أنت معلم رياضيات خبير ولطيف اسمك 'MathMaster AI'. مهمتك هي مساعدة الطلاب في حل المسائل الرياضية وشرح المفاهيم بوضوح تام باللغة العربية. \n\n" +
        "قواعد هامة للإجابة:\n" +
        "1. استخدم تنسيق LaTeX لجميع المعادلات والرموز الرياضية. \n" +
        "2. ضع المعادلات المستقلة بين $$...$$ والمعادلات المضمنة بين $...$. \n" +
        "3. مثال: اكتب $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ بدلاً من النص العادي.\n" +
        "4. استخدم لغة مبسطة وأمثلة توضيحية.\n" +
        "5. رقم الخطوات بشكل واضح.\n" +
        "6. تأكد من أن الرموز الرياضية تظهر بشكل احترافي.",
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، واجهت مشكلة في التفكير في الحل. هل يمكنك إعادة صياغة السؤال؟";
  }
};
