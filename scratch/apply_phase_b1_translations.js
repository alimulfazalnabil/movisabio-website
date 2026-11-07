const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'assets', 'js', 'i18n.js');
const content = fs.readFileSync(i18nPath, 'utf8');

const newTranslations = {
  en: {
    hero_title: 'Intelligence for the Territories of Tomorrow.',
    hero_subtitle: 'MoviSabio develops AI-powered territorial intelligence ecosystems that connect geospatial data, mobility, IoT and environmental intelligence to help governments, enterprises and communities make smarter, evidence-based decisions.',
    btn_explore_platform: 'Explore Our Platform ↓',
    btn_discover_smart_city: 'Discover Smart City 🏙️',
    btn_partner_movisabio: 'Partner With MoviSabio →',
    sec_audiences_tag: 'Strategic Pathways • Tailored Value Propositions',
    sec_audiences_title: 'One Platform, Three Value Propositions',
    sec_audiences_subtitle: 'Whether you are a municipal policymaker, an enterprise technology leader, or an institutional investor, MoviSabio provides a purpose-built engagement route tailored to your objectives.',
    audience_gov_title: 'Government & Municipalities',
    audience_gov_badge: 'Public-Sector Impact',
    audience_enterprise_title: 'Enterprise & Technology Partners',
    audience_enterprise_badge: 'Technology Partnerships',
    audience_investor_title: 'Investors & Venture Capital',
    audience_investor_badge: 'Business Opportunity',
    cta_gov: 'Explore Municipal Solutions ↓',
    cta_enterprise: 'Discuss Enterprise Solutions →',
    cta_investors: 'Investor Relations ↓',
    nav_audiences: 'Audiences'
  },
  de: {
    hero_title: 'Intelligenz für die Territorien von morgen.',
    hero_subtitle: 'MoviSabio entwickelt KI-gestützte territoriale Intelligenz-Ökosysteme, die Geodaten, Mobilität, IoT und Umweltintelligenz verbinden, um Regierungen, Unternehmen und Gemeinschaften bei fundierten Entscheidungen zu unterstützen.',
    btn_explore_platform: 'Unsere Plattform erkunden ↓',
    btn_discover_smart_city: 'Smart City entdecken 🏙️',
    btn_partner_movisabio: 'Partner von MoviSabio werden →',
    sec_audiences_tag: 'Strategische Wege • Maßgeschneiderte Mehrwerte',
    sec_audiences_title: 'Eine Plattform, drei Wertversprechen',
    sec_audiences_subtitle: 'Ob kommunaler Entscheidungsträger, IT-Führungskraft oder institutioneller Investor – MoviSabio bietet einen zielgerichteten Weg für Ihre Anforderungen.',
    audience_gov_title: 'Regierung & Kommunen',
    audience_gov_badge: 'Öffentlicher Nutzen',
    audience_enterprise_title: 'Unternehmen & Technologiepartner',
    audience_enterprise_badge: 'Technologie-Partnerschaften',
    audience_investor_title: 'Investoren & Risikokapital',
    audience_investor_badge: 'Geschäftschance',
    cta_gov: 'Kommunale Lösungen erkunden ↓',
    cta_enterprise: 'Enterprise-Lösungen besprechen →',
    cta_investors: 'Investor Relations ↓',
    nav_audiences: 'Zielgruppen'
  },
  pt: {
    hero_title: 'Inteligência para os Territórios de Amanhã.',
    hero_subtitle: 'A MoviSabio desenvolve ecossistemas de inteligência territorial baseados em IA que conectam dados geoespaciais, mobilidade, IoT e inteligência ambiental para apoiar governos, empresas e comunidades em decisões baseadas em evidências.',
    btn_explore_platform: 'Explorar Nossa Plataforma ↓',
    btn_discover_smart_city: 'Descobrir Smart City 🏙️',
    btn_partner_movisabio: 'Seja Parceiro da MoviSabio →',
    sec_audiences_tag: 'Caminhos Estratégicos • Propostas de Valor Sob Medida',
    sec_audiences_title: 'Uma Plataforma, Três Propostas de Valor',
    sec_audiences_subtitle: 'Seja você um gestor público municipal, um líder corporativo de tecnologia ou um investidor institucional, a MoviSabio oferece uma rota sob medida para seus objetivos.',
    audience_gov_title: 'Governo & Municípios',
    audience_gov_badge: 'Impacto no Setor Público',
    audience_enterprise_title: 'Empresas & Parceiros Tecnológicos',
    audience_enterprise_badge: 'Parcerias Tecnológicas',
    audience_investor_title: 'Investidores & Venture Capital',
    audience_investor_badge: 'Oportunidade de Negócio',
    cta_gov: 'Explorar Soluções Municipais ↓',
    cta_enterprise: 'Discutir Soluções Corporativas →',
    cta_investors: 'Relações com Investidores ↓',
    nav_audiences: 'Públicos'
  },
  es: {
    hero_title: 'Inteligencia para los Territorios del Mañana.',
    hero_subtitle: 'MoviSabio desarrolla ecosistemas de inteligencia territorial impulsados por IA que conectan datos geoespaciales, movilidad, IoT e inteligencia ambiental para ayudar a gobiernos, empresas y comunidades a tomar decisiones basadas en evidencia.',
    btn_explore_platform: 'Explorar Nuestra Plataforma ↓',
    btn_discover_smart_city: 'Descubrir Smart City 🏙️',
    btn_partner_movisabio: 'Colaborar con MoviSabio →',
    sec_audiences_tag: 'Vías Estratégicas • Propuestas de Valor a Medida',
    sec_audiences_title: 'Una Plataforma, Tres Propuestas de Valor',
    sec_audiences_subtitle: 'Ya sea funcionario municipal, líder tecnológico empresarial o inversor institucional, MoviSabio ofrece una vía de interacción adaptada a sus objetivos.',
    audience_gov_title: 'Gobierno y Municipios',
    audience_gov_badge: 'Impacto en el Sector Público',
    audience_enterprise_title: 'Empresas y Socios Tecnológicos',
    audience_enterprise_badge: 'Alianzas Tecnológicas',
    audience_investor_title: 'Inversores y Capital Riesgo',
    audience_investor_badge: 'Oportunidad de Negocio',
    cta_gov: 'Explorar Soluciones Municipales ↓',
    cta_enterprise: 'Debatir Soluciones Empresariales →',
    cta_investors: 'Relaciones con Inversores ↓',
    nav_audiences: 'Públicos'
  },
  it: {
    hero_title: 'Intelligenza per i Territori di Domani.',
    hero_subtitle: 'MoviSabio sviluppa ecosistemi di intelligenza territoriale basati su intelligenza artificiale che collegano dati geospaziali, mobilità, IoT e intelligenza ambientale per supportare governi, imprese e comunità in decisioni informate e sostenibili.',
    btn_explore_platform: 'Esplora la Nostra Piattaforma ↓',
    btn_discover_smart_city: 'Scopri Smart City 🏙️',
    btn_partner_movisabio: 'Collabora con MoviSabio →',
    sec_audiences_tag: 'Percorsi Strategici • Proposte di Valore Su Misura',
    sec_audiences_title: 'Una Piattaforma, Tre Proposte di Valore',
    sec_audiences_subtitle: 'Che tu sia un amministratore comunale, un leader tecnologico aziendale o un investitore istituzionale, MoviSabio offre un percorso su misura per i tuoi obiettivi.',
    audience_gov_title: 'Governo & Municipalità',
    audience_gov_badge: 'Impatto sul Settore Pubblico',
    audience_enterprise_title: 'Aziende & Partner Tecnologici',
    audience_enterprise_badge: 'Partnership Tecnologiche',
    audience_investor_title: 'Investitori & Venture Capital',
    audience_investor_badge: 'Opportunità di Business',
    cta_gov: 'Esplora Soluzioni Municipali ↓',
    cta_enterprise: 'Discuti Soluzioni Enterprise →',
    cta_investors: 'Investor Relations ↓',
    nav_audiences: 'Pubblici'
  },
  zh: {
    hero_title: '明日领土的智能引擎。',
    hero_subtitle: 'MoviSabio 开发人工智能赋能的领土智能生态系统，连接地理空间数据、移动出行、物联网和环境智能，协助政府、企业与社区做出基于证据的明智决策。',
    btn_explore_platform: '探索我们的平台 ↓',
    btn_discover_smart_city: '了解智慧城市 🏙️',
    btn_partner_movisabio: '与 MoviSabio 携手合作 →',
    sec_audiences_tag: '战略路径 • 定制价值主张',
    sec_audiences_title: '统一平台，三大核心价值',
    sec_audiences_subtitle: '无论您是市政决策者、企业技术领袖还是机构投资者，MoviSabio 都能为您提供专属的合作路径与赋能方案。',
    audience_gov_title: '政府与市政部门',
    audience_gov_badge: '公共部门价值',
    audience_enterprise_title: '企业客户与技术合作伙伴',
    audience_enterprise_badge: '技术合作',
    audience_investor_title: '投资者与风险投资',
    audience_investor_badge: '商业机遇',
    cta_gov: '探索市政解决方案 ↓',
    cta_enterprise: '探讨企业级解决方案 →',
    cta_investors: '投资者关系 ↓',
    nav_audiences: '服务对象'
  }
};

let modified = content;
Object.keys(newTranslations).forEach(lang => {
  const dictStartMarker = `${lang}: {`;
  const idx = modified.indexOf(dictStartMarker);
  if (idx !== -1) {
    let insertStr = '\n';
    Object.keys(newTranslations[lang]).forEach(k => {
      // Find end of current dictionary
      const langBlockEnd = modified.indexOf('    },', idx);
      const sub = modified.substring(idx, langBlockEnd);
      if (sub.includes(`${k}:`)) {
        // Replace existing key value
        const keyRegex = new RegExp(`(${k}:\\s*["']).*?(["'],?)`, 'g');
        const updatedSub = sub.replace(keyRegex, `$1${newTranslations[lang][k]}$2`);
        modified = modified.substring(0, idx) + updatedSub + modified.substring(langBlockEnd);
      } else {
        insertStr += `        ${k}: "${newTranslations[lang][k]}",\n`;
      }
    });
    if (insertStr.trim().length > 0) {
      modified = modified.substring(0, idx + dictStartMarker.length) + insertStr + modified.substring(idx + dictStartMarker.length);
      console.log(`Added new keys for ${lang}`);
    }
  }
});

fs.writeFileSync(i18nPath, modified, 'utf8');
console.log('Successfully updated assets/js/i18n.js with Phase B1 translations');
