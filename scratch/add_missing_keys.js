const fs = require('fs');

const missingAdditions = {
  de: {
    sec_solutions_tag: "Unternehmensportfolio",
    sec_portfolio: "Modulare territoriale Lösungen",
    sec_videos_tag: "Simulation & Filmmaterial",
    sec_impact_tag: "Georäumliche Operationen",
    sec_impact: "Globale Operationen & Digitale Zwillinge",
    sec_leadership_tag: "Führung & Governance",
    sec_submit_idea_tag: "Institutionelle Zusammenarbeit",
    sec_submit_idea: "Projektvorschlag oder Idee einreichen",
    sec_partner_tag: "Globale Partnerschaften",
    sec_partner: "Partner werden",
    btn_send: "Institutionelle Nachricht senden"
  },
  pt: {
    sec_solutions_tag: "Portfólio Empresarial",
    sec_portfolio: "Soluções Territoriais Modulares",
    sec_videos_tag: "Simulação & Imagens",
    sec_impact_tag: "Operações Geoespaciais",
    sec_impact: "Operações Globais & Gêmeos Digitais",
    sec_leadership_tag: "Governança & Liderança",
    sec_submit_idea_tag: "Colaboração Institucional",
    sec_submit_idea: "Enviar Proposta ou Ideia de Projeto",
    sec_partner_tag: "Parcerias Globais",
    sec_partner: "Seja Nosso Parceiro",
    btn_send: "Enviar Mensagem Institucional"
  },
  es: {
    sec_solutions_tag: "Portafolio Empresarial",
    sec_portfolio: "Soluciones Territoriales Modulares",
    sec_videos_tag: "Simulación y Grabaciones",
    sec_impact_tag: "Operaciones Geoespaciales",
    sec_impact: "Operaciones Globales y Gemelos Digitales",
    sec_leadership_tag: "Gobernanza y Liderazgo",
    sec_submit_idea_tag: "Colaboración Institucional",
    sec_submit_idea: "Enviar Propuesta o Idea de Proyecto",
    sec_partner_tag: "Asociaciones Globales",
    sec_partner: "Asóciese con Nosotros",
    btn_send: "Enviar Mensaje Institucional"
  },
  it: {
    sec_solutions_tag: "Portfolio Aziendale",
    sec_portfolio: "Soluzioni Territoriali Modulari",
    sec_videos_tag: "Simulazione e Riprese",
    sec_impact_tag: "Operazioni Geospaziali",
    sec_impact: "Operazioni Globali & Digital Twin",
    sec_leadership_tag: "Governance & Leadership",
    sec_submit_idea_tag: "Collaborazione Istituzionale",
    sec_submit_idea: "Invia Proposta o Idea di Progetto",
    sec_partner_tag: "Partnership Globali",
    sec_partner: "Collabora con Noi",
    btn_send: "Invia Messaggio Istituzionale"
  },
  zh: {
    sec_solutions_tag: "企业产品组合",
    sec_portfolio: "模块化空间地域解决方案",
    sec_videos_tag: "仿真模拟与视频展示",
    sec_impact_tag: "空间地理运营",
    sec_impact: "全球运营与数字孪生",
    sec_leadership_tag: "管理与领导团队",
    sec_submit_idea_tag: "机构合作",
    sec_submit_idea: "提交项目提案或建议",
    sec_partner_tag: "全球合作伙伴",
    sec_partner: "与我们携手合作",
    btn_send: "发送机构留言"
  }
};

let content = fs.readFileSync('assets/js/i18n.js', 'utf-8');
const langs = ['de', 'pt', 'es', 'it', 'zh'];

langs.forEach(lang => {
  const pattern = new RegExp(`(${lang}:\\s*\\{[\\r\\n]+)`, 'm');
  const match = content.match(pattern);
  if (match) {
    let linesToInsert = '';
    const obj = missingAdditions[lang];
    for (const [k, v] of Object.entries(obj)) {
      linesToInsert += `            ${k}: ${JSON.stringify(v)},\n`;
    }
    content = content.replace(match[0], match[0] + linesToInsert);
    console.log(`Added missing keys to ${lang}`);
  }
});

fs.writeFileSync('assets/js/i18n.js', content, 'utf-8');
console.log('Successfully updated assets/js/i18n.js across all non-en languages!');
