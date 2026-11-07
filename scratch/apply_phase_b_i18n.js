const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'assets', 'js', 'i18n.js');
const content = fs.readFileSync(i18nPath, 'utf8');

const newTranslations = {
  en: {
    nav_smart_city: 'Smart City',
    btn_explore_platform: 'Explore the Platform ↓',
    btn_discover_smart_city: 'Discover Smart City 🏙️',
    btn_view_portfolio: 'View Technology Portfolio →',
    btn_become_partner: 'Become a Strategic Partner →',
    btn_investor_enquiries: 'Investor Enquiries →',
    btn_contact_movisabio: 'Contact MoviSabio'
  },
  de: {
    nav_smart_city: 'Smart City',
    btn_explore_platform: 'Plattform erkunden ↓',
    btn_discover_smart_city: 'Smart City entdecken 🏙️',
    btn_view_portfolio: 'Technologie-Portfolio ansehen →',
    btn_become_partner: 'Strategischer Partner werden →',
    btn_investor_enquiries: 'Investorenanfragen →',
    btn_contact_movisabio: 'MoviSabio kontaktieren'
  },
  pt: {
    nav_smart_city: 'Smart City',
    btn_explore_platform: 'Explorar a Plataforma ↓',
    btn_discover_smart_city: 'Descobrir Smart City 🏙️',
    btn_view_portfolio: 'Ver Portfólio de Tecnologia →',
    btn_become_partner: 'Tornar-se um Parceiro Estratégico →',
    btn_investor_enquiries: 'Consultas de Investidores →',
    btn_contact_movisabio: 'Contatar MoviSabio'
  },
  es: {
    nav_smart_city: 'Smart City',
    btn_explore_platform: 'Explorar la Plataforma ↓',
    btn_discover_smart_city: 'Descubrir Smart City 🏙️',
    btn_view_portfolio: 'Ver Portafolio de Tecnología →',
    btn_become_partner: 'Convertirse en Socio Estratégico →',
    btn_investor_enquiries: 'Consultas de Inversores →',
    btn_contact_movisabio: 'Contactar a MoviSabio'
  },
  it: {
    nav_smart_city: 'Smart City',
    btn_explore_platform: 'Esplora la Piattaforma ↓',
    btn_discover_smart_city: 'Scopri Smart City 🏙️',
    btn_view_portfolio: 'Visualizza Portafoglio Tecnologico →',
    btn_become_partner: 'Diventa un Partner Strategico →',
    btn_investor_enquiries: 'Richieste per Investitori →',
    btn_contact_movisabio: 'Contatta MoviSabio'
  },
  zh: {
    nav_smart_city: '智慧城市',
    btn_explore_platform: '探索平台 ↓',
    btn_discover_smart_city: '了解智慧城市 🏙️',
    btn_view_portfolio: '查看技术组合 →',
    btn_become_partner: '成为战略合作伙伴 →',
    btn_investor_enquiries: '投资人咨询 →',
    btn_contact_movisabio: '联系 MoviSabio'
  }
};

let modified = content;
Object.keys(newTranslations).forEach(lang => {
  const dictStartMarker = `${lang}: {`;
  const idx = modified.indexOf(dictStartMarker);
  if (idx !== -1) {
    let insertStr = '\n';
    Object.keys(newTranslations[lang]).forEach(k => {
      // Check if key already exists in this block
      const langBlockEnd = modified.indexOf('    },', idx);
      const sub = modified.substring(idx, langBlockEnd);
      if (!sub.includes(`${k}:`)) {
        insertStr += `        ${k}: "${newTranslations[lang][k]}",\n`;
      }
    });
    if (insertStr.trim().length > 0) {
      modified = modified.substring(0, idx + dictStartMarker.length) + insertStr + modified.substring(idx + dictStartMarker.length);
      console.log(`Added keys for ${lang}`);
    }
  }
});

fs.writeFileSync(i18nPath, modified, 'utf8');
console.log('Successfully updated assets/js/i18n.js with Phase B keys');
