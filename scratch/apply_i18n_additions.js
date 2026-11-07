const fs = require('fs');

const additions = {
  en: {
    nav_company: "Company",
    nav_investor: "Investor",
    sec_about: "About MoviSabio",
    sec_about_tag: "Corporate Overview",
    sec_about_subtitle: "Pioneering borderless spatial intelligence, cloud-native scalability, and measurable ESG impact across global territories.",
    card_mission_title: "Global Vision & Mission",
    card_mission_text: "We are building the world's leading Territorial Intelligence Platform. Our mission is to scale AI, IoT, and quantum-ready digital ecosystems globally, empowering governments, enterprises, and communities across all continents to make evidence-based, sustainable decisions.",
    card_structure_title: "Borderless SaaS Architecture",
    card_structure_text: "Engineered for immediate international deployment, our cloud-native platform transforms fragmented territorial data into standardized, actionable intelligence. We enable rapid cross-border scalability without requiring heavy, localized hardware infrastructure.",
    card_strategy_title: "Worldwide Climate & ESG Impact",
    card_strategy_text: "Addressing universal challenges in urbanization, agriculture, and resource management. Our predictive AI models help global municipalities and organizations optimize mobility, drastically reduce carbon footprints, and meet rigorous international ESG standards.",
    platform_narrative_bridge: "The Territorial Intelligence Platform provides the underlying intelligence ecosystem. MoviSabio Smart City applies this ecosystem to urban mobility, infrastructure management and municipal decision-making.",
    platform_ecosystem_title: "Territorial Intelligence Platform",
    platform_ecosystem_subtitle: "The underlying spatial intelligence ecosystem empowering municipal, mobility, and regional transformation.",
    platform_core_label: "Underlying Intelligence Ecosystem",
    platform_flagship_label: "Flagship Enterprise Application",
    platform_cta_smart_city: "Explore Flagship Application: MoviSabio Smart City ↓",
    platform_cta_back: "← Back to Platform Core",
    slider_cat_1: "Smart City Traffic Infrastructure & IoT Sensor Mesh",
    slider_cat_2: "AI-Powered Traffic Signal Coordination (AITCS)",
    slider_cat_3: "Urban Traffic Monitoring & Command Operations",
    slider_cat_4: "Edge AI Computer Vision & Vehicle Classification",
    slider_cat_5: "Intelligent Transportation Systems & Transit Signal Priority",
    slider_cat_6: "3D Digital Twin & Geospatial Territorial Intelligence"
  },
  de: {
    nav_company: "Unternehmen",
    nav_investor: "Investoren",
    sec_about: "Über MoviSabio",
    sec_about_tag: "Unternehmensüberblick",
    sec_about_subtitle: "Wegweisende grenzenlose räumliche Intelligenz, Cloud-native Skalierbarkeit und messbare ESG-Wirkung in globalen Territorien.",
    card_mission_title: "Globale Vision & Mission",
    card_mission_text: "Wir bauen die weltweit führende territoriale Intelligenzplattform auf. Unsere Mission ist es, KI-, IoT- und quantenbereite digitale Ökosysteme weltweit zu skalieren und Regierungen, Unternehmen und Gemeinschaften auf allen Kontinenten zu befähigen, evidenzbasierte, nachhaltige Entscheidungen zu treffen.",
    card_structure_title: "Grenzenlose SaaS-Architektur",
    card_structure_text: "Entwickelt für den sofortigen internationalen Einsatz, transformiert unsere Cloud-native Plattform fragmentierte territoriale Daten in standardisierte, umsetzbare Intelligenz. Wir ermöglichen eine schnelle grenzüberschreitende Skalierbarkeit ohne schwere, lokale Hardware-Infrastruktur.",
    card_strategy_title: "Weltweite Klima- & ESG-Wirkung",
    card_strategy_text: "Bewältigung universeller Herausforderungen in Urbanisierung, Landwirtschaft und Ressourcenmanagement. Unsere prädiktiven KI-Modelle helfen weltweiten Kommunen und Organisationen, Mobilität zu optimieren, CO₂-Fußabdrücke drastisch zu reduzieren und strenge internationale ESG-Standards zu erfüllen.",
    platform_narrative_bridge: "Die Territorial Intelligence Platform stellt das zugrunde liegende Intelligenz-Ökosystem bereit. MoviSabio Smart City wendet dieses Ökosystem auf städtische Mobilität, Infrastrukturmanagement und kommunale Entscheidungsfindung an.",
    platform_ecosystem_title: "Territoriale Intelligenzplattform",
    platform_ecosystem_subtitle: "Das grundlegende räumliche Intelligenz-Ökosystem für kommunale, Mobilitäts- und regionale Transformation.",
    platform_core_label: "Grundlegendes Intelligenz-Ökosystem",
    platform_flagship_label: "Flaggschiff-Unternehmensanwendung",
    platform_cta_smart_city: "Flaggschiff-Anwendung erkunden: MoviSabio Smart City ↓",
    platform_cta_back: "← Zurück zur Plattform-Basis",
    slider_cat_1: "Smart-City-Verkehrsinfrastruktur & IoT-Sensornetz",
    slider_cat_2: "KI-gestützte Verkehrssignalkoordination (AITCS)",
    slider_cat_3: "Städtische Verkehrsüberwachung & Leitzentrale",
    slider_cat_4: "Edge-KI-Computervision & Fahrzeugklassifizierung",
    slider_cat_5: "Intelligente Transportsysteme & ÖPNV-Priorisierung",
    slider_cat_6: "3D-Digitaler-Zwilling & Geospatiale Territoriale Intelligenz"
  },
  pt: {
    nav_company: "Empresa",
    nav_investor: "Investidores",
    sec_about: "Sobre a MoviSabio",
    sec_about_tag: "Visão Geral Corporativa",
    sec_about_subtitle: "Pioneirismo em inteligência espacial sem fronteiras, escalabilidade nativa na nuvem e impacto mensurável de ESG em territórios globais.",
    card_mission_title: "Visão Global & Missão",
    card_mission_text: "Estamos construindo a principal Plataforma de Inteligência Territorial do mundo. Nossa missão é escalar ecossistemas digitais de IA, IoT e prontos para computação quântica globalmente, capacitando governos, empresas e comunidades em todos os continentes a tomar decisões sustentáveis e baseadas em evidências.",
    card_structure_title: "Arquitetura SaaS Sem Fronteiras",
    card_structure_text: "Projetada para implantação internacional imediata, nossa plataforma nativa em nuvem transforma dados territoriais fragmentados em inteligência padronizada e acionável. Permitimos rápida escalabilidade transfronteiriça sem a necessidade de infraestrutura pesada de hardware local.",
    card_strategy_title: "Impacto Global de Clima & ESG",
    card_strategy_text: "Enfrentando desafios universais em urbanização, agricultura e gestão de recursos. Nossos modelos de IA preditiva ajudam municípios e organizações globais a otimizar a mobilidade, reduzir drasticamente a pegada de carbono e atender aos rigorosos padrões internacionais de ESG.",
    platform_narrative_bridge: "A Territorial Intelligence Platform fornece o ecossistema de inteligência subjacente. O MoviSabio Smart City aplica esse ecossistema à mobilidade urbana, gestão de infraestrutura e tomada de decisões municipais.",
    platform_ecosystem_title: "Plataforma de Inteligência Territorial",
    platform_ecosystem_subtitle: "O ecossistema fundamental de inteligência espacial que capacita a transformação municipal, de mobilidade e regional.",
    platform_core_label: "Ecossistema de Inteligência Subjacente",
    platform_flagship_label: "Aplicação Empresarial Principal",
    platform_cta_smart_city: "Explorar Aplicação Principal: MoviSabio Smart City ↓",
    platform_cta_back: "← Voltar ao Núcleo da Plataforma",
    slider_cat_1: "Infraestrutura de Trânsito Inteligente & Malha IoT",
    slider_cat_2: "Coordenação Semafórica por IA (AITCS)",
    slider_cat_3: "Monitoramento Urbano de Tráfego & Centro de Controle",
    slider_cat_4: "Visão Computacional Edge AI & Classificação de Veículos",
    slider_cat_5: "Sistemas de Transporte Inteligente & Prioridade BRT",
    slider_cat_6: "Gêmeo Digital 3D & Inteligência Espacial Territorial"
  },
  es: {
    nav_company: "Empresa",
    nav_investor: "Inversores",
    sec_about: "Acerca de MoviSabio",
    sec_about_tag: "Resumen Corporativo",
    sec_about_subtitle: "Pioneros en inteligencia espacial sin fronteras, escalabilidad nativa en la nube e impacto mensurable en ESG en territorios globales.",
    card_mission_title: "Visión Global y Misión",
    card_mission_text: "Estamos construyendo la plataforma de inteligencia territorial líder en el mundo. Nuestra misión es escalar ecosistemas digitales de IA, IoT y preparados para la computación cuántica a nivel global, capacitando a gobiernos, empresas y comunidades en todos los continentes para tomar decisiones sostenibles basadas en evidencia.",
    card_structure_title: "Arquitectura SaaS Sin Fronteras",
    card_structure_text: "Diseñada para un despliegue internacional inmediato, nuestra plataforma nativa en la nube transforma datos territoriales fragmentados en inteligencia estandarizada y procesable. Permitimos una rápida escalabilidad transfronteriza sin requerir infraestructura de hardware pesada y localizada.",
    card_strategy_title: "Impacto Global en Clima y ESG",
    card_strategy_text: "Abordando desafíos universales en urbanización, agricultura y gestión de recursos. Nuestros modelos de IA predictiva ayudan a municipios y organizaciones globales a optimizar la movilidad, reducir drásticamente la huella de carbono y cumplir con rigurosos estándares internacionales de ESG.",
    platform_narrative_bridge: "La Territorial Intelligence Platform proporciona el ecosistema de inteligencia subyacente. MoviSabio Smart City aplica este ecosistema a la movilidad urbana, la gestión de infraestructura y la toma de decisiones municipales.",
    platform_ecosystem_title: "Plataforma de Inteligencia Territorial",
    platform_ecosystem_subtitle: "El ecosistema de inteligencia espacial subyacente que impulsa la transformación municipal, de movilidad y regional.",
    platform_core_label: "Ecosistema de Inteligencia Subyacente",
    platform_flagship_label: "Aplicación Empresarial Insignia",
    platform_cta_smart_city: "Explorar Aplicación Insignia: MoviSabio Smart City ↓",
    platform_cta_back: "← Volver al Núcleo de la Plataforma",
    slider_cat_1: "Infraestructura de Tráfico Inteligente y Malla de Sensores IoT",
    slider_cat_2: "Coordinación Semafórica Impulsada por IA (AITCS)",
    slider_cat_3: "Monitoreo del Tráfico Urbano y Centro de Control",
    slider_cat_4: "Visión Computacional Edge AI y Clasificación de Vehículos",
    slider_cat_5: "Sistemas Inteligentes de Transporte y Prioridad de Tránsito",
    slider_cat_6: "Gemelo Digital 3D e Inteligencia Espacial Territorial"
  },
  it: {
    nav_company: "Azienda",
    nav_investor: "Investitori",
    sec_about: "Chi siamo - MoviSabio",
    sec_about_tag: "Panoramica Aziendale",
    sec_about_subtitle: "Pionieri dell'intelligence spaziale senza confini, scalabilità cloud-native e impatto ESG misurabile sui territori globali.",
    card_mission_title: "Visione Globale e Missione",
    card_mission_text: "Stiamo costruendo la piattaforma di intelligence territoriale leader a livello mondiale. La nostra missione è scalare ecosistemi digitali di IA, IoT e pronti per il quantum computing a livello globale, consentendo a governi, imprese e comunità di tutti i continenti di prendere decisioni sostenibili e basate sui dati.",
    card_structure_title: "Architettura SaaS Senza Frontiere",
    card_structure_text: "Progettata per un'implementazione internazionale immediata, la nostra piattaforma cloud-native trasforma i dati territoriali frammentati in intelligence standardizzata e fruibile. Consentiamo una rapida scalabilità transfrontaliera senza richiedere pesanti infrastrutture hardware locali.",
    card_strategy_title: "Impatto Globale sul Clima e ESG",
    card_strategy_text: "Affrontare le sfide universali dell'urbanizzazione, dell'agricoltura e della gestione delle risorse. I nostri modelli di IA predittiva aiutano i comuni e le organizzazioni globali a ottimizzare la mobilità, ridurre drasticamente l'impronta di carbonio e soddisfare rigorosi standard ESG internazionali.",
    platform_narrative_bridge: "La Territorial Intelligence Platform fornisce l'ecosistema di intelligence sottostante. MoviSabio Smart City applica questo ecosistema alla mobilità urbana, alla gestione delle infrastrutture e al processo decisionale municipale.",
    platform_ecosystem_title: "Piattaforma di Intelligence Territoriale",
    platform_ecosystem_subtitle: "L'ecosistema di intelligence spaziale fondamentale per la trasformazione municipale, della mobilità e regionale.",
    platform_core_label: "Ecosistema di Intelligence Sottostante",
    platform_flagship_label: "Applicazione Aziendale Principale",
    platform_cta_smart_city: "Esplora Applicazione Principale: MoviSabio Smart City ↓",
    platform_cta_back: "← Torna al Cuore della Piattaforma",
    slider_cat_1: "Infrastruttura di Traffico Smart City & Rete Sensori IoT",
    slider_cat_2: "Coordinamento Semaforico Potenziato da IA (AITCS)",
    slider_cat_3: "Monitoraggio del Traffico Urbano & Centro di Comando",
    slider_cat_4: "Computer Vision Edge AI & Classificazione Veicoli",
    slider_cat_5: "Sistemi di Trasporto Intelligenti & Priorità Trasporto Pubblico",
    slider_cat_6: "Digital Twin 3D & Intelligence Spaziale Territoriale"
  },
  zh: {
    nav_company: "公司",
    nav_investor: "投资者",
    sec_about: "关于 MoviSabio",
    sec_about_tag: "企业概览",
    sec_about_subtitle: "开创无国界空间智能、云原生高可扩展性，并在全球地域实现可衡量的 ESG 影响力。",
    card_mission_title: "全球愿景与使命",
    card_mission_text: "我们正在打造世界领先的空间地域智能平台。我们的使命是在全球范围内推广人工智能、物联网和量子就绪型数字生态系统，赋能各大洲的政府、企业与社区做出基于证据的可持续决策。",
    card_structure_title: "无国界 SaaS 架构",
    card_structure_text: "专为即时国际化部署而设计，我们的云原生平台将零散的地域数据转化为标准化、可执行的情报。我们支持快速的跨国扩展，无需沉重的本地硬件基础设施。",
    card_strategy_title: "全球气候与 ESG 影响",
    card_strategy_text: "应对城市化、农业和资源管理领域的普遍挑战。我们的预测性人工智能模型帮助全球市政当局和组织优化出行，大幅降低碳足迹，并达到严苛的国际 ESG 标准。",
    platform_narrative_bridge: "Territorial Intelligence Platform 提供底层空间智能生态系统。MoviSabio Smart City 将该生态系统应用于城市交通、基础设施管理和市政决策支持。",
    platform_ecosystem_title: "空间地域智能平台",
    platform_ecosystem_subtitle: "赋能市政、交通与区域数字化转型的底层空间智能生态系统。",
    platform_core_label: "底层智能生态系统",
    platform_flagship_label: "旗舰企业级应用",
    platform_cta_smart_city: "探索旗舰应用：MoviSabio Smart City ↓",
    platform_cta_back: "← 返回核心平台生态",
    slider_cat_1: "智慧城市交通基础设施与物联网传感器网络",
    slider_cat_2: "AI 驱动的自适应交通信号协调 (AITCS)",
    slider_cat_3: "城市交通监控与实时指挥中心",
    slider_cat_4: "边缘 AI 计算机视觉与车辆分类",
    slider_cat_5: "智能交通系统与公交优先通行",
    slider_cat_6: "3D 数字孪生与地理空间地域智能"
  }
};

let content = fs.readFileSync('assets/js/i18n.js', 'utf-8');

// For each language, find its section and insert the keys right after `<lang>: {`
const langs = ['en', 'de', 'pt', 'es', 'it', 'zh'];

langs.forEach(lang => {
  const pattern = new RegExp(`(${lang}:\\s*\\{[\\r\\n]+)`, 'm');
  const match = content.match(pattern);
  if (match) {
    let linesToInsert = '';
    const obj = additions[lang];
    for (const [k, v] of Object.entries(obj)) {
      // Check if key already exists in this lang section
      // We can check if `content` contains `k:` in that block
      const jsonVal = JSON.stringify(v);
      linesToInsert += `            ${k}: ${jsonVal},\n`;
    }
    content = content.replace(match[0], match[0] + linesToInsert);
    console.log(`Added keys to ${lang}`);
  } else {
    console.warn(`Could not find language block for ${lang}`);
  }
});

fs.writeFileSync('assets/js/i18n.js', content, 'utf-8');
console.log('Successfully updated assets/js/i18n.js');
