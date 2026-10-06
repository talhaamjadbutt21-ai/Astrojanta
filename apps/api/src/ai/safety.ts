const CRISIS_PATTERNS = [
  /\bsuicid/i,
  /\bkill (my ?self|me)\b/i,
  /\bend (my|this) life\b/i,
  /\bself[- ]?harm/i,
  /\bwant to die\b/i,
  /\b(khud ?kushi|aatm ?hatya|atmhatya)\b/i,
  /\bmarna chaht[aei]\b/i,
  /आत्महत्या|खुदकुशी|मरना चाहत/,
];

export function isCrisisMessage(text: string): boolean {
  return CRISIS_PATTERNS.some((re) => re.test(text));
}

export const CRISIS_REPLY = [
  "I'm really sorry you're feeling this way. You don't have to face this alone, and talking to someone right now can help.",
  "",
  "• **Tele-MANAS (India, 24×7, free):** call **14416** or **1-800-891-4416**",
  "• **Emergency:** call **112**",
  "",
  "If you're outside India, please contact your local emergency number.",
  "",
  "Aap akele nahi hain. Kripya abhi 14416 par baat karein — yeh muft aur gopniya hai. 💛",
].join("\n");
