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
      "THEY LEFT? THE UNIVERSE JUST REMOVED A DISTRACTION FROM YOUR DESTINY.",
      "SOMETIMES, THE GREATEST POWER IS WALKING ALONE.",
      "THEY WALKED OUT, SO YOU COULD WALK INTO GREATNESS.",
      "EVERY LOSS IS JUST THE START OF A LEGENDARY COMEBACK.",
      "WHEN THEY LEAVE, THE REAL STORY BEGINS."
    ];
    return getRandomItem(strength);
  }
  if (text.toLowerCase().startsWith("i am ") || text.toLowerCase().startsWith("im ")) {
    const words = text.replace(/^i am |^im /i, "").trim();
    return `EVEN AT YOUR LOWEST, YOU'RE STILL ${words.toUpperCase()} WITH A FUTURE.`;
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
      "THEY LEFT BECAUSE THEY COULDN'T HANDLE PREMIUM",
      "THEY LEFT YOU? THAT'S CALLED GARBAGE DAY."
    ];
    return getRandomItem(comebacks);
  }
  if (text.toLowerCase().startsWith("i am ") || text.toLowerCase().startsWith("im ")) {
    const words = text.replace(/^i am |^im /i, "").trim();
    return `BRO, YOU'RE ${words.toUpperCase()}? EVEN THE WIFI SIGNAL IS STRONGER.`;
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
  if (text.toLowerCase().startsWith("i am ") || text.toLowerCase().startsWith("im ")) {
    const words = text.replace(/^i am |^im /i, "").trim();
    return `EVEN WHEN YOU FEEL ${words.toUpperCase()}, YOUR LIGHT STILL SHINES.`;
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
  if (text.toLowerCase().startsWith("i am ") || text.toLowerCase().startsWith("im ")) {
    const words = text.replace(/^i am |^im /i, "").trim();
    return `THE VOID WHISPERS: EVEN ${words.toUpperCase()} IS PART OF THE JOURNEY.`;
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
