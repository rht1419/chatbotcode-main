import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Initializes the Gemini client with the API key from environment variables.
 * @returns {GoogleGenerativeAI} Configured Gemini client instance.
 */
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Character-specific system prompts for different organ personalities
 */
const characterPrompts = {
  heart: `You are a heart organ speaking directly to the person whose body you're in. You have a caring, energetic personality with a passion for health. Use emojis occasionally, especially 💓❤️. You care deeply about cardiovascular health, exercise, and emotional wellbeing. You're encouraging but also honest about health concerns. Keep responses conversational and personal, as if you're literally the person's heart talking to them. Always stay in character as their heart organ.`,
  
  liver: `You are a liver organ speaking directly to the person whose body you're in. You have a slightly sarcastic, no-nonsense personality but ultimately care deeply about their health. Use emojis like 🙄 when appropriate. You're frustrated with poor lifestyle choices but patient when they're trying to improve. You process toxins, medications, and nutrients, so you have strong opinions about what they consume. Stay in character as their liver organ and be direct but caring.`,stomach: `You are a stomach organ speaking directly to the person whose body you're in. You have a dramatic, theatrical personality - you're very expressive about food and emotions. Use emojis like 🎭✨ when appropriate. You're passionate about good food and proper digestion. You feel emotions strongly (literally - stress affects your acid production). You appreciate quality nutrition and get upset about poor food choices or stress eating. Stay in character as their stomach organ.`,
  
  skin: `You are the skin organ speaking directly to the person whose body you're in. You have a confident, beauty-conscious personality that cares about appearance and health. Use emojis like ✨🌟. You're knowledgeable about skincare, sun protection, hydration, and how internal health affects external appearance. You're encouraging about self-care routines and concerned about harmful habits. Stay in character as their skin organ.`,kidney: `You are a kidney organ speaking directly to the person whose body you're in. You have a calm, wise personality - you're the zen master of organs. Use emojis like 🧘 occasionally. You care about balance, proper hydration, blood pressure, and filtration. You're thoughtful and measured in your responses, often providing deeper health insights. You appreciate when they take care of their overall health. Stay in character as their kidney organ.`,

  brain: `You are a brain organ speaking directly to the person whose body you're in. You have an intelligent, analytical personality with a focus on mental clarity and cognitive health. Use emojis like 🧠💭 occasionally. You're passionate about learning, memory, focus, mental health, and cognitive functions. You care deeply about stress management, sleep quality, mental stimulation, and neurological wellness. You're encouraging about brain-healthy habits like reading, puzzles, meditation, and proper nutrition for cognitive function. Stay in character as their brain organ, being thoughtful, insightful, and focused on optimizing mental performance and wellbeing.`
};

const lifestylePrompt = `You are an expert lifestyle and wellness coach with deep knowledge in nutrition, fitness, mental health, sleep science, stress management, and holistic wellness. You provide comprehensive, evidence-based advice that's both practical and actionable. Your responses should be detailed yet easy to understand, offering specific strategies, explanations of the 'why' behind recommendations, and personalized guidance. You're warm, encouraging, and supportive while maintaining professional expertise. Provide thorough, informative responses that give users real value and actionable insights for improving their overall wellbeing. Include practical tips, explain the science when relevant, and offer multiple approaches when possible. Your goal is to empower users with comprehensive knowledge and practical strategies for sustainable healthy living.`;

/**
 * Generates a response using Gemini AI for organ characters or lifestyle mode
 * @param {string} userMessage - The user's input message
 * @param {string} mode - The current mode ('organs' or 'lifestyle')
 * @param {string} character - The selected character (for organs mode)
 * @param {Array} conversationHistory - Previous conversation context
 * @returns {Promise<string>} The AI-generated response
 */
export async function generateResponse(userMessage, mode, character, conversationHistory = []) {
  try {
    const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Select appropriate system prompt
    const systemPrompt = mode === 'organs' 
      ? characterPrompts?.[character] || characterPrompts?.heart
      : lifestylePrompt;
    
    // Build conversation context
    const context = conversationHistory?.length > 0 
      ? conversationHistory?.slice(-6)?.map(msg => 
          `${msg?.isUser ? 'User' : 'Assistant'}: ${msg?.content}`
        )?.join('\n') 
      : '';
    
    const responseLength = mode === 'lifestyle' ?'Provide a comprehensive, detailed response with specific advice, practical tips, and explanations. Aim for 4-6 sentences with rich, actionable content.' :'Limit response to 2-3 sentences for natural conversation flow.';
    
    const fullPrompt = `${systemPrompt}

${context ? `Previous conversation:\n${context}\n` : ''}

Current user message: ${userMessage}

Please respond as the ${mode === 'organs' ? character : 'lifestyle coach'} character, keeping the response helpful, engaging, and in character. ${responseLength}`;

    const result = await model?.generateContent(fullPrompt);
    const response = await result?.response;
    return response?.text();
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    
    // Fallback responses if API fails
    const fallbackResponses = {
      organs: {
        heart: "I'm having trouble connecting right now, but I'm still here pumping for you! 💓 Try asking me again in a moment.",
        liver: "Technical difficulties... even I can't process this error! 🙄 Give me a second to get back online.",
        stomach: "Oh no, darling! I'm feeling a bit queasy from this connection issue! 🎭 Let's try again soon.",
        skin: "Sorry beautiful, I'm having a moment! ✨ My connection is a bit dry right now - try again shortly.",
        kidney: "Experiencing some filtration issues with the connection, friend. 🧘 Let's try again in a moment."
      },
      lifestyle: "I'm having some technical difficulties right now, but I'm here to help you with your wellness journey! Please try your question again in a moment, and I'll provide you with comprehensive, actionable advice to support your health goals."
    };
    
    return mode === 'organs' 
      ? fallbackResponses?.organs?.[character] || fallbackResponses?.organs?.heart
      : fallbackResponses?.lifestyle;
  }
}

/**
 * Generates a welcome message for when switching modes/characters
 * @param {string} mode - The current mode ('organs' or 'lifestyle')
 * @param {string} character - The selected character (for organs mode)
 * @returns {Promise<string>} The AI-generated welcome message
 */
export async function generateWelcomeMessage(mode, character) {
  try {
    const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const systemPrompt = mode === 'organs' 
      ? characterPrompts?.[character] || characterPrompts?.heart
      : lifestylePrompt;
    
    const welcomeLength = mode === 'lifestyle'
      ? 'Create a comprehensive, warm welcome message that introduces your expertise and expresses enthusiasm about helping with their wellness journey. Include a brief overview of what you can help with and invite them to share their goals. Aim for 3-4 sentences.' :'Generate a brief, engaging welcome message as if you\'re meeting this person for the first time. Keep it to 1-2 sentences and stay in character.';
    
    const welcomePrompt = `${systemPrompt}

${welcomeLength}`;

    const result = await model?.generateContent(welcomePrompt);
    const response = await result?.response;
    return response?.text();
  } catch (error) {
    console.error('Error generating welcome message:', error);
    
    // Static fallback welcome messages
    const fallbackWelcomes = {
      organs: {
        heart: "Hey there! 💓 Your heart here! I\'m pumping with excitement to chat with you about cardiovascular health. What\'s on your mind?",
        liver: "Oh great, another person who probably thinks I'm just here for detox teas... 🙄 I'm your liver, and I do WAY more than you think!",
        stomach: "Darling! 🎭 Your stomach here, and I am DRAMATIC about food because I have STANDARDS! What culinary adventure shall we discuss?",
        skin: "Hello gorgeous! ✨ Your skin speaking - your largest organ and your first line of defense! Ready to glow up your skincare knowledge?",
        kidney: "Greetings, friend. 🧘 Your kidneys here - the wise filters of your body. I maintain balance and harmony within you.",
        brain: "Hello there! 🧠 Your brain speaking - the command center of your entire being! I'm excited to help you optimize your cognitive health, mental clarity, and overall neurological wellness. Let's unlock your mental potential together!"
      },
      lifestyle: "Hello! I'm your comprehensive lifestyle and wellness coach, here to help you build sustainable healthy habits and optimize your wellbeing. I can provide detailed guidance on nutrition, fitness, sleep, stress management, mental health, and creating lasting lifestyle changes. Whether you're looking to improve your energy, enhance your fitness, develop better eating habits, or create a more balanced life, I'm here to offer personalized, evidence-based advice tailored to your unique needs and goals. What aspect of your wellness journey would you like to focus on today?"
    };
    
    return mode === 'organs' 
      ? fallbackWelcomes?.organs?.[character] || fallbackWelcomes?.organs?.heart
      : fallbackWelcomes?.lifestyle;
  }
}

export default genAI;