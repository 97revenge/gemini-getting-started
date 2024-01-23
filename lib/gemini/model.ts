import { GoogleGenerativeAI } from "@google/generative-ai";

const genIA = new GoogleGenerativeAI(process.env.API_KEY!);

export const model = genIA.getGenerativeModel({ model: "gemini-pro-vision" });
