const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:/Users/aflna/.gemini/antigravity/brain/2a6d3723-354c-4cb6-a2c2-4abe06b62c60/.system_generated/logs/transcript_full.jsonl';
if (!fs.existsSync(logPath)) {
  console.error('Log file does not exist at', logPath);
  process.exit(1);
}

const rl = readline.createInterface({
  input: fs.createReadStream(logPath)
});

let lastPrompt = '';
rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    if (obj.source === 'USER_EXPLICIT' || obj.type === 'USER_INPUT') {
      if (obj.content && obj.content.includes('MOVISABIO — WEBSITE CONTENT RESTORATION')) {
        lastPrompt = obj.content;
      }
    }
  } catch (e) {}
});

rl.on('close', () => {
  const target = path.join(__dirname, 'full_user_prompt.txt');
  fs.writeFileSync(target, lastPrompt, 'utf-8');
  console.log('Saved prompt length:', lastPrompt.length);
});
