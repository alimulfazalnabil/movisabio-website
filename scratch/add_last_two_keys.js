const fs = require('fs');

const additions = {
  en: {
    sec_videos: "Project Videos & Media",
    sec_leadership: "Executive Leadership"
  },
  de: {
    sec_videos: "Projektvideos & Medien",
    sec_leadership: "Unternehmensführung"
  },
  pt: {
    sec_videos: "Vídeos do Projeto & Mídia",
    sec_leadership: "Liderança Executiva"
  },
  es: {
    sec_videos: "Videos del Proyecto y Medios",
    sec_leadership: "Liderazgo Ejecutivo"
  },
  it: {
    sec_videos: "Video di Progetto e Media",
    sec_leadership: "Leadership Esecutiva"
  },
  zh: {
    sec_videos: "项目视频与媒体演示",
    sec_leadership: "核心领导团队"
  }
};

let content = fs.readFileSync('assets/js/i18n.js', 'utf-8');
const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];

langs.forEach(lang => {
  const pattern = new RegExp(`(${lang}:\\s*\\{[\\r\\n]+)`, 'm');
  const match = content.match(pattern);
  if (match) {
    let linesToInsert = '';
    const obj = additions[lang];
    for (const [k, v] of Object.entries(obj)) {
      linesToInsert += `            ${k}: ${JSON.stringify(v)},\n`;
    }
    content = content.replace(match[0], match[0] + linesToInsert);
    console.log(`Added sec_videos and sec_leadership to ${lang}`);
  }
});

fs.writeFileSync('assets/js/i18n.js', content, 'utf-8');
console.log('Successfully updated assets/js/i18n.js with sec_videos and sec_leadership!');
