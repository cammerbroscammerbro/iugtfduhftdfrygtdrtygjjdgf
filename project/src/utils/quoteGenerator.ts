import { Quote, QuoteMode } from '../types';

export const generateQuote = (input: string, mode: QuoteMode): Quote => {
  let transformedText = input.trim();
  let emoji = '';

  // Remove ending punctuation if present
  transformedText = transformedText.replace(/[.!?]$/, '');

  switch (mode) {
    case 'classic':
      transformedText = classicTransform(transformedText);
      emoji = getRandomEmoji(['💫', '⚡', '🌟', '✨', '💪', '🦁', '👑']);
      break;
    case 'roast':
      transformedText = roastTransform(transformedText);
      emoji = getRandomEmoji(['💅', '👑', '💎', '✨', '🔥', '⚡', '💫']);
      break;
    case 'wholesome':
      transformedText = wholesomeTransform(transformedText);
      emoji = getRandomEmoji(['💖', '🌸', '✨', '💫', '🦋', '🌈', '💝']);
      break;
    case 'deep':
      transformedText = deepTransform(transformedText);
      emoji = getRandomEmoji(['🌌', '💫', '🌊', '🕊️', '🌙', '⭐', '✨']);
      break;
  }

  return {
    text: transformedText,
    mode,
    emoji,
    originalText: input
  };
};

function classicTransform(text: string): string {
  // Handle relationship/emotional content
  if (text.toLowerCase().includes("left me") || 
      text.toLowerCase().includes("broke up") || 
      text.toLowerCase().includes("ex")) {
    const strength = [
      "DESTINY FAVORS THE BRAVE WHO RISE ALONE",
      "YOUR STORY IS FAR FROM OVER",
      "LEGENDS ARE FORGED IN SOLITUDE",
      "EVERY SETBACK REVEALS YOUR STRENGTH",
      "WHEN THEY LEAVE, GREATNESS STAYS"
    ];
    return getRandomItem(strength);
  }
  
  if (text.toLowerCase().includes("i am") || text.toLowerCase().includes("im ")) {
    const words = text.toLowerCase().replace(/^i am |^im /i, "").trim();
    return `IN YOUR WEAKNESS LIES YOUR GREATEST POWER: ${words.toUpperCase()}`;
  }

  // Make classic more legendary
  return `LEGENDS DON'T TALK, THEY ${text.toUpperCase()}`;
}

function roastTransform(text: string): string {
  // Transform negative situations into savage roasts
  if (text.toLowerCase().includes("left me") || 
      text.toLowerCase().includes("broke up")) {
    const comebacks = [
      "BRO, EVEN GOOGLE CAN'T FIND WHO ASKED",
      "HEARTBREAK? NAH, JUST TOOK OUT THE TRASH",
      "THEY LEFT? THE AIR JUST GOT CLEANER",
      "CONGRATS, YOU JUST LEVELED UP WITHOUT DEAD WEIGHT",
      "THEY LEFT BECAUSE THEY COULDN'T HANDLE PREMIUM"
    ];
    return getRandomItem(comebacks);
  }
  // General savage roast
  return `BRO, ${text.toUpperCase()}? THAT'S CUTE. TRY HARDER.`;
}

function wholesomeTransform(text: string): string {
  // Handle emotional content with care
  if (text.toLowerCase().includes("left me") || 
      text.toLowerCase().includes("broke up")) {
    const healing = [
      "YOUR HEART WILL WRITE LEGENDS OF LOVE AGAIN",
      "IN YOUR HEALING LIES A BEAUTIFUL STORY",
      "THIS PAIN SHAPES YOUR MASTERPIECE",
      "YOUR SOUL GROWS MORE BEAUTIFUL THROUGH STORMS",
      "LOVE LEFT A WARRIOR IN ITS WAKE"
    ];
    return getRandomItem(healing);
  }

  // Make wholesome more uplifting
  return `THE WORLD NEEDS YOUR LIGHT: ${text.toUpperCase()}`;
}

function deepTransform(text: string): string {
  // Transform pain into wisdom
  if (text.toLowerCase().includes("left me") || 
      text.toLowerCase().includes("broke up")) {
    const wisdom = [
      "IN THE DEPTHS OF LOSS, DESTINY FORGES LEGENDS",
      "THROUGH BROKEN HEARTS, WARRIORS RISE",
      "YOUR SOLITUDE IS THE UNIVERSE'S EMBRACE",
      "PAIN CREATES THE DIAMONDS OF TOMORROW",
      "IN YOUR DARKNESS, STARS ARE BORN"
    ];
    return getRandomItem(wisdom);
  }

  // Make deep more profound
  return `IN THE ENDLESS COSMOS, ${text.toUpperCase()} IS YOUR POWER.`;
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomEmoji(emojis: string[]): string {
  return emojis[Math.floor(Math.random() * emojis.length)];
}