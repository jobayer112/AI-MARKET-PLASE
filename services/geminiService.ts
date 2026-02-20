
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CACHE_KEY = 'ni_daily_inspiration_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const getDailyInspiration = async () => {
  try {
    // Check cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { text, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return text;
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Provide a short, beautiful Islamic daily inspiration or a Hadith in Bengali. Focus on patience, gratitude, or Dhikr.',
      config: {
        systemInstruction: "You are a wise Islamic scholar providing daily guidance in Bengali. Keep it concise.",
      }
    });

    const inspirationText = response.text || "আজকের অনুপ্রেরণা: সর্বদা আল্লাহর শুকরিয়া আদায় করুন।";
    
    // Save to cache
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      text: inspirationText,
      timestamp: Date.now()
    }));

    return inspirationText;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "আজকের অনুপ্রেরণা: সর্বদা আল্লাহর শুকরিয়া আদায় করুন।";
  }
};

export const getSurahDetails = async (surahName: string) => {
  // Use a local cache for surahs to speed up repeated visits
  const surahCacheKey = `ni_surah_${surahName.replace(/\s+/g, '_').toLowerCase()}`;
  const cached = localStorage.getItem(surahCacheKey);
  if (cached) return cached;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide the COMPLETE text of Surah ${surahName} with all its verses. Format it as: Verse number, then Arabic text, then Bengali meaning (অনুবাদ). Also include a short summary of the Surah's significance in Bengali at the end. Please ensure the response is detailed and covers the entire Surah.`,
      config: {
        systemInstruction: "You are an expert Quranic scholar and translator. Provide clear, accurate Arabic text and Bengali translations.",
      }
    });
    
    const text = response.text || "তথ্য লোড করা সম্ভব হচ্ছে না।";
    if (text !== "তথ্য লোড করা সম্ভব হচ্ছে না।") {
        localStorage.setItem(surahCacheKey, text);
    }
    return text;
  } catch (error) {
    return "তথ্য লোড করা সম্ভব হচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।";
  }
};

export const getHadithDetails = async (category: string) => {
  const hadithCacheKey = `ni_hadith_${category.toLowerCase()}`;
  const cached = localStorage.getItem(hadithCacheKey);
  if (cached) return cached;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 5 important Sahih Hadiths related to ${category} in Bengali. Include the source reference (e.g., Bukhari, Muslim) for each and a brief explanation in Bengali.`,
    });
    const text = response.text || "হাদীসের তথ্য লোড করা সম্ভব হচ্ছে না।";
    if (text !== "হাদীসের তথ্য লোড করা সম্ভব হচ্ছে না।") {
        localStorage.setItem(hadithCacheKey, text);
    }
    return text;
  } catch (error) {
    return "হাদীসের তথ্য লোড করা সম্ভব হচ্ছে না।";
  }
};
