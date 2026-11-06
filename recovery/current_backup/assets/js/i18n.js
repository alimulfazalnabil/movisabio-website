/**
 * MoviSabio Enterprise Translation & i18n Engine
 * Supported Languages: English (en), German (de), Portuguese (pt), Spanish (es), Italian (it), Chinese (zh)
 * Fully accessible, persistent, and reactive across all pages.
 */

(function () {
    'use strict';

    const SUPPORTED_LANGS = ['en', 'de', 'pt', 'es', 'it', 'zh'];
    const DEFAULT_LANG = 'en';
    const STORAGE_KEY = 'movisabio_lang';

    const dictionaries = {
        en: {
            // Navigation
            nav_platform: "Platform",
            nav_solutions: "Solutions",
            nav_architecture: "Technology",
            nav_about: "About",
            nav_research: "Research & ESG",
            nav_map: "Global Map",
            nav_leadership: "Leadership",
            nav_submit_idea: "Partners & Pitch",
            nav_contact: "Contact",
            nav_cta: "Partner With Us",
            skip_to_content: "Skip to main content",

            // Footer
            footer_desc: "AI & Quantum-Ready Territorial Intelligence Platform. Unifying adaptive signal timing, computer vision, digital twins, and climate analytics for urban and regional territories.",
            footer_rights: "All rights reserved.",
            footer_spatial_intel: "Enterprise Spatial Intelligence",
            footer_gdpr: "GDPR & LGPD Privacy Compliant",
            footer_ethics: "Simulation Benchmarks & Scientific Verification",
            footer_quick_links: "Platform Links",
            footer_domains: "Operational Domains",
            footer_governance: "Governance & Ethics",
            footer_privacy_note: "All algorithmic traffic control and sensory computer vision modules strictly adhere to European GDPR and Brazilian LGPD standards. Edge processing discards raw camera feeds immediately after vector extraction.",

            // Homepage Hero & Sections
            hero_badge: "Enterprise Territorial Intelligence Platform",
            hero_title: "AI & Quantum-Ready Territorial Intelligence Platform",
            hero_subtitle: "Transforming fragmented municipal, mobility, and environmental telemetry into actionable spatial intelligence. We integrate multi-agent AI, IoT sensor meshes, digital twins, and predictive analytics into an integrated operating ecosystem.",
            hero_cta_platform: "Explore Platform",
            hero_cta_solutions: "View 15 Solutions",
            hero_cta_partner: "Institutional Inquiries",
            stat_delay: "Up to 45%",
            stat_delay_label: "Simulation Delay Reduction",
            stat_co2: "Target 15–30%",
            stat_co2_label: "Vehicle Idle Emissions Cut",
            stat_response: "<500ms",
            stat_response_label: "Edge Decision Latency",
            stat_verified: "100%",
            stat_verified_label: "Open-Source & Transparent",

            sec_flagship_title: "MoviSabio Enterprise Smart City",
            sec_flagship_subtitle: "The central nervous system for municipal corridors, regional mobility, and territorial resilience.",
            sec_solutions_title: "Modular Territorial Solutions",
            sec_solutions_subtitle: "15 specialized intelligence modules engineered for municipal scalability and regulatory safety.",
            sec_architecture_title: "4-Layer Enterprise Architecture",
            sec_architecture_subtitle: "Cloud-native, edge-resilient computing stack with hardware fail-safe bounds.",
            sec_map_title: "Global Presence & Digital Twins",
            sec_map_subtitle: "Active simulation pilot corridors, open-data benchmarks, and international grant pipelines.",
            sec_videos_title: "Engineering Media & Demonstrations",
            sec_videos_subtitle: "Microscopic traffic simulations, edge computer vision testing, and platform overviews.",
            sec_leadership_title: "Executive Leadership",
            sec_leadership_subtitle: "Specialized engineering and public-sector expertise driving territorial innovation.",
            sec_cta_title: "Pioneer Intelligent Infrastructure With MoviSabio",
            sec_cta_subtitle: "We partner with forward-thinking municipalities, research institutions, technology integrators, and infrastructure investors.",

            // Platform Page
            platform_hero_title: "MoviSabio Enterprise Smart City",
            platform_hero_subtitle: "An enterprise-grade, cloud-native territorial intelligence platform designed as the central operating system for urban and regional mobility networks.",
            platform_pillar_1: "Adaptive Signal Control (AITCS)",
            platform_pillar_2: "Edge Computer Vision & Sensing",
            platform_pillar_3: "Multi-Agent Deep Reinforcement Learning",
            platform_pillar_4: "Emergency & Green-Wave Preemption",
            platform_pillar_5: "Emissions & Micro-Climate Intelligence",
            platform_pillar_6: "Territorial Digital Twins (SUMO)",
            platform_rollout_title: "4-Phase Municipal Rollout Framework",

            // Solutions Page
            solutions_hero_title: "15 Modular Solutions",
            solutions_hero_subtitle: "Specialized territorial intelligence modules designed for phased integration into existing municipal infrastructure, smart corridors, and regional transport networks.",
            filter_all: "All Solutions (15)",
            filter_traffic: "Traffic & Signals",
            filter_transit: "Fleet & Transit",
            filter_safety: "Safety & Environment",
            filter_spatial: "Spatial Digital Twin",
            badge_implemented: "Implemented Simulation Benchmark",
            badge_development: "In Active Development",
            badge_planned: "Planned Research Module",
            badge_concept: "Strategic Conceptual Framework",
            label_problem: "Problem",
            label_approach: "Proposed Approach",
            label_architecture: "Architecture",
            label_technologies: "Technologies",
            label_use_cases: "Use Cases",
            label_limitations: "Safety & Regulatory Limitations",
            label_maturity: "Development Status",

            // Technology Page
            tech_hero_title: "Technology & Architecture",
            tech_hero_subtitle: "Transparent technical disclosure of our engineering stack, microscopic simulation wrappers, reinforcement learning algorithms, and privacy guarantees.",
            tech_verified_title: "Engineering Stack & Verification Status",
            tech_safety_title: "Safety Bounds & Interlock Guarantees",

            // About Page
            about_hero_title: "About MoviSabio",
            about_hero_subtitle: "Developing sovereign, verifiable territorial intelligence for resilient communities worldwide.",
            about_mission_title: "Our Mission",
            about_vision_title: "Our Long-Term Vision",
            about_principles_title: "Architectural Principles",
            about_roadmap_title: "Strategic Roadmap 2026–2030",

            // Research & ESG Page
            research_hero_title: "Research & Innovation",
            research_hero_subtitle: "Rigorous scientific benchmarks, open-source microscopic simulation models, and international grant consortia.",
            research_transparency_title: "Simulation vs. Field Actuation Disclosure",
            research_benchmarks_title: "Microscopic Simulation Benchmarks",
            research_grants_title: "International Research Consortia",

            // Global Page
            global_hero_title: "Global Presence & Regional Corridors",
            global_hero_subtitle: "Active simulation benchmarks, pilot proposals, and academic target corridors across Latin America and Europe.",
            global_btn_all: "Show All",
            global_btn_brazil: "Brazil (Campinas)",
            global_btn_uruguay: "Uruguay (Montevideo)",
            global_btn_germany: "Germany (Munich/Berlin)",
            global_btn_italy: "Italy (Milan)",

            // Leadership Page
            leadership_hero_title: "Executive Leadership",
            leadership_hero_subtitle: "Engineering depth, institutional governance, and global partnership stewardship.",
            modal_bio_title: "Executive Biography",
            modal_close: "Close",

            // Partners & Pitch Page
            partners_hero_title: "Institutional Partnerships & Open Innovation",
            partners_hero_subtitle: "Transparent collaboration tracks for municipal authorities, academic researchers, hardware integrators, and climate innovators.",
            pitch_title: "Submit an Open Innovation Pitch",
            pitch_desc: "Propose an urban mobility pilot, academic research experiment, or territorial dataset for collaborative development.",

            // Contact Page
            contact_hero_title: "Institutional Inquiries & Contact",
            contact_hero_subtitle: "Connect directly with MoviSabio engineering, research, and public-sector relations teams.",
            form_name: "Full Name & Official Title",
            form_email: "Institutional Email",
            form_org: "Organization / Municipality / Institution",
            form_category: "Inquiry Category",
            cat_municipal: "Municipal Partnership & Pilot Proposal",
            cat_research: "Academic Research & Grant Collaboration",
            cat_investor: "Institutional Investor & Infrastructure Fund",
            cat_technology: "Technology & Hardware Integration",
            cat_enterprise: "Enterprise Territorial Solution",
            form_message: "Detailed Project Scope or Inquiry",
            form_privacy_consent: "I agree to the processing of institutional contact data under GDPR/LGPD regulations. No personal data will be sold or transferred to third parties.",
            form_btn_submit: "Submit Institutional Inquiry",
            form_submitting: "Transmitting Securely...",
            form_success_title: "Inquiry Received Successfully",
            form_success_desc: "Thank you for contacting MoviSabio. Your institutional request has been logged and assigned reference:",
            form_success_note: "Our executive engineering and relations team will review your project parameters within 2 business days.",
            form_error_required: "Please fill in all required fields.",
            form_error_email: "Please provide a valid institutional email address.",
            form_error_consent: "You must accept the privacy consent to submit.",
            form_error_spam: "Submission flagged by anti-spam verification.",
            form_mailto_fallback: "Direct Institutional Transmission:",

            // Modals
            modal_video_title: "Engineering Media & Simulation View",
            modal_video_close: "Close Video",
            modal_leader_title: "Executive Profile",
            btn_view_details: "View Technical Specification →",
            btn_explore_architecture: "Explore Architecture →"
        },

        de: {
            // Navigation
            nav_platform: "Plattform",
            nav_solutions: "Lösungen",
            nav_architecture: "Technologie",
            nav_about: "Über uns",
            nav_research: "Forschung & ESG",
            nav_map: "Globale Karte",
            nav_leadership: "Führungsteam",
            nav_submit_idea: "Partner & Pitch",
            nav_contact: "Kontakt",
            nav_cta: "Partnern Sie mit uns",
            skip_to_content: "Zum Hauptinhalt springen",

            // Footer
            footer_desc: "KI- und quantenbereite Plattform für territoriale Intelligenz. Vereint adaptive Signalsteuerung, Computer Vision, digitale Zwillinge und Klimaanalytik für städtische und regionale Gebiete.",
            footer_rights: "Alle Rechte vorbehalten.",
            footer_spatial_intel: "Räumliche Unternehmensintelligenz",
            footer_gdpr: "DSGVO- & LGPD-Datenschutzkonform",
            footer_ethics: "Simulations-Benchmarks & Wissenschaftliche Verifikation",
            footer_quick_links: "Plattform-Links",
            footer_domains: "Betriebsbereiche",
            footer_governance: "Unternehmensführung & Ethik",
            footer_privacy_note: "Alle algorithmischen Verkehrssteuerungs- und Bildverarbeitungsmodule entsprechen streng den europäischen DSGVO-Standards. Rohvideodaten werden sofort nach der Vektorextraktion gelöscht.",

            // Homepage Hero & Sections
            hero_badge: "Plattform für Territoriale Intelligenz",
            hero_title: "KI- & quantenbereite Plattform für territoriale Intelligenz",
            hero_subtitle: "Transformation fragmentierter kommunaler, Verkehrs- und Umweltdaten in handlungsrelevante räumliche Intelligenz. Wir vereinen Multi-Agenten-KI, IoT-Sensornetze, digitale Zwillinge und prädiktive Analytik in einem ganzheitlichen Betriebssystem.",
            hero_cta_platform: "Plattform erkunden",
            hero_cta_solutions: "15 Lösungen ansehen",
            hero_cta_partner: "Institutionelle Anfragen",
            stat_delay: "Bis zu 45%",
            stat_delay_label: "Verzögerungsreduktion in Simulation",
            stat_co2: "Ziel 15–30%",
            stat_co2_label: "Reduktion der Leerlaufemissionen",
            stat_response: "<500ms",
            stat_response_label: "Edge-Entscheidungslatenz",
            stat_verified: "100%",
            stat_verified_label: "Open-Source & Transparent",

            sec_flagship_title: "MoviSabio Enterprise Smart City",
            sec_flagship_subtitle: "Das zentrale Nervensystem für kommunale Korridore, regionale Mobilität und territoriale Resilienz.",
            sec_solutions_title: "Modulare Territoriale Lösungen",
            sec_solutions_subtitle: "15 spezialisierte Intelligenzmodule, entwickelt für kommunale Skalierbarkeit und regulatorische Sicherheit.",
            sec_architecture_title: "4-Schichten-Unternehmensarchitektur",
            sec_architecture_subtitle: "Cloud-nativer, ausfallsicherer Edge-Computing-Stack mit Hardware-Sicherheitsgrenzen.",
            sec_map_title: "Globale Präsenz & Digitale Zwillinge",
            sec_map_subtitle: "Aktive Simulationskorridore, Open-Data-Benchmarks und internationale Förderprogramme.",
            sec_videos_title: "Ingenieurmedien & Demonstrationen",
            sec_videos_subtitle: "Mikroskopische Verkehrssimulationen, Edge-Computer-Vision-Tests und Plattformübersichten.",
            sec_leadership_title: "Unternehmensführung",
            sec_leadership_subtitle: "Spezialisierte Expertise in Ingenieurwesen und öffentlichem Sektor für territoriale Innovation.",
            sec_cta_title: "Pionierarbeit für Intelligente Infrastruktur mit MoviSabio",
            sec_cta_subtitle: "Wir arbeiten mit zukunftsorientierten Kommunen, Forschungsinstituten, Technologieintegratoren und Infrastrukturinvestoren zusammen.",

            // Platform Page
            platform_hero_title: "MoviSabio Enterprise Smart City",
            platform_hero_subtitle: "Eine cloud-native territoriale Intelligenzplattform auf Enterprise-Niveau als zentrales Betriebssystem für städtische und regionale Verkehrsnetze.",
            platform_pillar_1: "Adaptive Signalsteuerung (AITCS)",
            platform_pillar_2: "Edge-Computer-Vision & Sensorik",
            platform_pillar_3: "Multi-Agenten Deep Reinforcement Learning",
            platform_pillar_4: "Notfall- & Grüne-Welle-Priorisierung",
            platform_pillar_5: "Emissions- & Mikroklima-Intelligenz",
            platform_pillar_6: "Territoriale Digitale Zwillinge (SUMO)",
            platform_rollout_title: "4-Phasen-Rollout-Rahmenplan für Kommunen",

            // Solutions Page
            solutions_hero_title: "15 Modulare Lösungen",
            solutions_hero_subtitle: "Spezialisierte Module für territoriale Intelligenz zur stufenweisen Integration in bestehende kommunale Infrastruktur und regionale Verkehrsnetze.",
            filter_all: "Alle Lösungen (15)",
            filter_traffic: "Verkehr & Signalanlagen",
            filter_transit: "ÖPNV & Flotten",
            filter_safety: "Sicherheit & Umwelt",
            filter_spatial: "Räumlicher Digitaler Zwilling",
            badge_implemented: "Implementierter Simulations-Benchmark",
            badge_development: "In Aktiver Entwicklung",
            badge_planned: "Geplantes Forschungsmodul",
            badge_concept: "Strategisches Rahmenkonzept",
            label_problem: "Problemstellung",
            label_approach: "Lösungsansatz",
            label_architecture: "Architektur",
            label_technologies: "Technologien",
            label_use_cases: "Anwendungsfälle",
            label_limitations: "Sicherheits- & Regulatorische Grenzen",
            label_maturity: "Entwicklungsstatus",

            // Technology Page
            tech_hero_title: "Technologie & Architektur",
            tech_hero_subtitle: "Transparente technische Offenlegung unseres Software-Stacks, mikroskopischer Simulations-Wrapper, Reinforcement-Learning-Algorithmen und Datenschutzgarantien.",
            tech_verified_title: "Technologie-Stack & Verifikationsstatus",
            tech_safety_title: "Sicherheitsgrenzen & Verriegelungsgarantien",

            // About Page
            about_hero_title: "Über MoviSabio",
            about_hero_subtitle: "Entwicklung souveräner, verifizierbarer territorialer Intelligenz für zukunftsfähige Gemeinschaften weltweit.",
            about_mission_title: "Unsere Mission",
            about_vision_title: "Unsere Langzeitvision",
            about_principles_title: "Architekturprinzipien",
            about_roadmap_title: "Strategische Roadmap 2026–2030",

            // Research & ESG Page
            research_hero_title: "Forschung & Innovation",
            research_hero_subtitle: "Präzise wissenschaftliche Benchmarks, quelloffene mikroskopische Simulationsmodelle und internationale Forschungskonsortien.",
            research_transparency_title: "Offenlegung: Simulation vs. Feldansteuerung",
            research_benchmarks_title: "Mikroskopische Simulations-Benchmarks",
            research_grants_title: "Internationale Forschungskonsortien",

            // Global Page
            global_hero_title: "Globale Präsenz & Regionale Korridore",
            global_hero_subtitle: "Aktive Simulations-Benchmarks, Pilotprojekte und akademische Zielkorridore in Lateinamerika und Europa.",
            global_btn_all: "Alle anzeigen",
            global_btn_brazil: "Brasilien (Campinas)",
            global_btn_uruguay: "Uruguay (Montevideo)",
            global_btn_germany: "Deutschland (München/Berlin)",
            global_btn_italy: "Italien (Mailand)",

            // Leadership Page
            leadership_hero_title: "Unternehmensführung",
            leadership_hero_subtitle: "Ingenieurtechnische Tiefe, institutionelle Führung und globale Partnerschaftsverantwortung.",
            modal_bio_title: "Führungsprofil",
            modal_close: "Schließen",

            // Partners & Pitch Page
            partners_hero_title: "Institutionelle Partnerschaften & Open Innovation",
            partners_hero_subtitle: "Transparente Kooperationspfade für Kommunen, Hochschulforscher, Hardware-Integratoren und Klimainnovatoren.",
            pitch_title: "Reichen Sie Ihren Open-Innovation-Pitch ein",
            pitch_desc: "Schlagen Sie ein Pilotprojekt zur urbanen Mobilität, ein Forschungsexperiment oder einen Datensatz zur gemeinsamen Entwicklung vor.",

            // Contact Page
            contact_hero_title: "Institutionelle Anfragen & Kontakt",
            contact_hero_subtitle: "Direkter Kontakt mit dem MoviSabio-Team für Technik, Forschung und öffentliche Partnerschaften.",
            form_name: "Vollständiger Name & Titel",
            form_email: "Dienstliche E-Mail-Adresse",
            form_org: "Organisation / Kommune / Institut",
            form_category: "Kategorie der Anfrage",
            cat_municipal: "Kommunale Partnerschaft & Pilotprojekt",
            cat_research: "Akademische Forschung & Förderanträge",
            cat_investor: "Institutioneller Investor & Infrastrukturfonds",
            cat_technology: "Technologie- & Hardwareintegration",
            cat_enterprise: "Territoriale Unternehmenslösung",
            form_message: "Detaillierte Projektbeschreibung oder Anfrage",
            form_privacy_consent: "Ich stimme der Verarbeitung von Kontaktdaten gemäß DSGVO zu. Keine Daten werden an Dritte weitergegeben.",
            form_btn_submit: "Institutionelle Anfrage Absenden",
            form_submitting: "Sichere Übertragung...",
            form_success_title: "Anfrage Erfolgreich Übermittelt",
            form_success_desc: "Vielen Dank für Ihre Kontaktaufnahme. Ihre Anfrage wurde erfasst unter der Referenznummer:",
            form_success_note: "Unser Führungsteam wird Ihre Projektparameter innerhalb von zwei Werktagen prüfen.",
            form_error_required: "Bitte füllen Sie alle erforderlichen Felder aus.",
            form_error_email: "Bitte geben Sie eine gültige institutionelle E-Mail-Adresse an.",
            form_error_consent: "Sie müssen der Datenschutzerklärung zustimmen.",
            form_error_spam: "Übermittlung durch Spamschutz abgefangen.",
            form_mailto_fallback: "Direkte E-Mail-Übermittlung:",

            // Modals
            modal_video_title: "Ingenieur- & Simulationsvideo",
            modal_video_close: "Video schließen",
            modal_leader_title: "Führungsprofil",
            btn_view_details: "Technische Spezifikation →",
            btn_explore_architecture: "Architektur Erkunden →"
        },

        pt: {
            // Navigation
            nav_platform: "Plataforma",
            nav_solutions: "Soluções",
            nav_architecture: "Tecnologia",
            nav_about: "Sobre nós",
            nav_research: "Pesquisa & ESG",
            nav_map: "Mapa Global",
            nav_leadership: "Liderança",
            nav_submit_idea: "Parceiros & Pitch",
            nav_contact: "Contato",
            nav_cta: "Seja Nosso Parceiro",
            skip_to_content: "Pular para o conteúdo principal",

            // Footer
            footer_desc: "Plataforma de inteligência territorial preparada para IA e quântica. Unificando temporização semafórica adaptativa, visão computacional, gêmeos digitais e análise climática para territórios urbanos e regionais.",
            footer_rights: "Todos os direitos reservados.",
            footer_spatial_intel: "Inteligência Espacial Corporativa",
            footer_gdpr: "Em Conformidade com LGPD e GDPR",
            footer_ethics: "Benchmarks de Simulação e Validação Científica",
            footer_quick_links: "Links da Plataforma",
            footer_domains: "Domínios Operacionais",
            footer_governance: "Governança & Ética",
            footer_privacy_note: "Todos os módulos de controle semafórico algorítmico e visão computacional cumprem rigorosamente a LGPD brasileira e o GDPR europeu. As transmissões de câmeras são descartadas imediatamente após a extração de dados.",

            // Homepage Hero & Sections
            hero_badge: "Plataforma Corporativa de Inteligência Territorial",
            hero_title: "Plataforma de inteligência territorial preparada para IA e quântica",
            hero_subtitle: "Transformando telemetria municipal, de mobilidade e ambiental em inteligência espacial acionável. Integramos IA multiagente, malhas de sensores IoT, gêmeos digitais e análise preditiva em um sistema operacional integrado.",
            hero_cta_platform: "Explorar Plataforma",
            hero_cta_solutions: "Ver 15 Soluções",
            hero_cta_partner: "Consultas Institucionais",
            stat_delay: "Até 45%",
            stat_delay_label: "Redução de Atrasos em Simulação",
            stat_co2: "Meta 15–30%",
            stat_co2_label: "Corte de Emissões em Espera",
            stat_response: "<500ms",
            stat_response_label: "Latência de Decisão no Edge",
            stat_verified: "100%",
            stat_verified_label: "Código Aberto e Transparente",

            sec_flagship_title: "MoviSabio Enterprise Smart City",
            sec_flagship_subtitle: "O sistema nervoso central para corredores municipais, mobilidade regional e resiliência territorial.",
            sec_solutions_title: "Soluções Territoriais Modulares",
            sec_solutions_subtitle: "15 módulos de inteligência especializados projetados para escalabilidade municipal e segurança regulatória.",
            sec_architecture_title: "Arquitetura Corporativa em 4 Camadas",
            sec_architecture_subtitle: "Stack nativo em nuvem e resiliente no edge com limites rigorosos de segurança em hardware.",
            sec_map_title: "Presença Global e Gêmeos Digitais",
            sec_map_subtitle: "Corredores piloto em simulação ativa, benchmarks de dados abertos e editais internacionais de fomento.",
            sec_videos_title: "Mídia Técnica e Demonstrações",
            sec_videos_subtitle: "Simulações microscópicas de tráfego, testes de visão computacional em borda e visão geral da plataforma.",
            sec_leadership_title: "Liderança Executiva",
            sec_leadership_subtitle: "Especialistas em engenharia avançada e setor público impulsionando inovação territorial.",
            sec_cta_title: "Inove em Infraestrutura Inteligente com a MoviSabio",
            sec_cta_subtitle: "Trabalhamos com prefeituras inovadoras, instituições de pesquisa, integradores de tecnologia e investidores de infraestrutura.",

            // Platform Page
            platform_hero_title: "MoviSabio Enterprise Smart City",
            platform_hero_subtitle: "Uma plataforma corporativa em nuvem projetada como o sistema operacional central para redes de mobilidade urbana e regional.",
            platform_pillar_1: "Controle Semafórico Adaptativo (AITCS)",
            platform_pillar_2: "Visão Computacional e Sensores de Borda",
            platform_pillar_3: "Aprendizado por Reforço Profundo Multiagente",
            platform_pillar_4: "Prioridade para Veículos de Emergência",
            platform_pillar_5: "Inteligência de Emissões e Microclima",
            platform_pillar_6: "Gêmeos Digitais Territoriais (SUMO)",
            platform_rollout_title: "Estrutura de Implementação Municipal em 4 Fases",

            // Solutions Page
            solutions_hero_title: "15 Soluções Modulares",
            solutions_hero_subtitle: "Módulos de inteligência territorial projetados para integração gradual na infraestrutura municipal existente e malhas de transporte regionais.",
            filter_all: "Todas as Soluções (15)",
            filter_traffic: "Tráfego e Semáforos",
            filter_transit: "Frotas e Transporte Público",
            filter_safety: "Segurança e Meio Ambiente",
            filter_spatial: "Gêmeo Digital Espacial",
            badge_implemented: "Benchmark de Simulação Implementado",
            badge_development: "Em Desenvolvimento Ativo",
            badge_planned: "Módulo de Pesquisa Planejado",
            badge_concept: "Estrutura Conceitual Estratégica",
            label_problem: "Problema",
            label_approach: "Abordagem Proposta",
            label_architecture: "Arquitetura",
            label_technologies: "Tecnologias",
            label_use_cases: "Casos de Uso",
            label_limitations: "Limitações Regulatórias e de Segurança",
            label_maturity: "Status de Desenvolvimento",

            // Technology Page
            tech_hero_title: "Tecnologia & Arquitetura",
            tech_hero_subtitle: "Divulgação técnica transparente de nossa pilha de engenharia, motores de simulação microscópica, algoritmos de IA e conformidade de privacidade.",
            tech_verified_title: "Pilha Tecnológica e Status de Verificação",
            tech_safety_title: "Garantias de Intertravamento e Segurança",

            // About Page
            about_hero_title: "Sobre a MoviSabio",
            about_hero_subtitle: "Desenvolvendo inteligência territorial soberana e verificável para comunidades resilientes no mundo todo.",
            about_mission_title: "Nossa Missão",
            about_vision_title: "Nossa Visão de Longo Prazo",
            about_principles_title: "Princípios Arquiteturais",
            about_roadmap_title: "Roteiro Estratégico 2026–2030",

            // Research & ESG Page
            research_hero_title: "Pesquisa & Inovação",
            research_hero_subtitle: "Benchmarks científicos rigorosos, modelos de simulação microscópica de código aberto e consórcios internacionais de fomento.",
            research_transparency_title: "Transparência: Simulação vs. Atuação em Campo",
            research_benchmarks_title: "Benchmarks de Simulação Microscópica",
            research_grants_title: "Consórcios Internacionais de Pesquisa",

            // Global Page
            global_hero_title: "Presença Global e Corredores Regionais",
            global_hero_subtitle: "Benchmarks ativos de simulação, propostas piloto e corredores acadêmicos na América Latina e Europa.",
            global_btn_all: "Ver Todos",
            global_btn_brazil: "Brasil (Campinas)",
            global_btn_uruguay: "Uruguai (Montevidéu)",
            global_btn_germany: "Alemanha (Munique/Berlim)",
            global_btn_italy: "Itália (Milão)",

            // Leadership Page
            leadership_hero_title: "Liderança Executiva",
            leadership_hero_subtitle: "Profundidade em engenharia, governança pública e gestão de parcerias internacionais.",
            modal_bio_title: "Biografia Executiva",
            modal_close: "Fechar",

            // Partners & Pitch Page
            partners_hero_title: "Parcerias Institucionais e Inovação Aberta",
            partners_hero_subtitle: "Vias claras de colaboração para prefeituras, pesquisadores acadêmicos, integradores de sistemas e fundos climáticos.",
            pitch_title: "Envie sua Proposta de Inovação Aberta",
            pitch_desc: "Proponha um projeto piloto de mobilidade urbana, experimento acadêmico ou conjunto de dados territoriais para codesenvolvimento.",

            // Contact Page
            contact_hero_title: "Consultas Institucionais & Contato",
            contact_hero_subtitle: "Conecte-se diretamente com as equipes de engenharia, pesquisa e relações com o setor público da MoviSabio.",
            form_name: "Nome Completo & Cargo Oficial",
            form_email: "E-mail Institucional",
            form_org: "Organização / Prefeitura / Instituição",
            form_category: "Categoria da Consulta",
            cat_municipal: "Parceria Municipal & Proposta de Piloto",
            cat_research: "Pesquisa Acadêmica & Consórcios de Fomento",
            cat_investor: "Investidor Institucional & Fundo de Infraestrutura",
            cat_technology: "Integração de Tecnologia & Hardware",
            cat_enterprise: "Solução Territorial Corporativa",
            form_message: "Escopo Detalhado do Projeto ou Consulta",
            form_privacy_consent: "Concordo com o processamento dos dados de contato de acordo com a LGPD e GDPR. Nenhum dado será repassado a terceiros.",
            form_btn_submit: "Enviar Consulta Institucional",
            form_submitting: "Transmitindo com Segurança...",
            form_success_title: "Consulta Recebida com Sucesso",
            form_success_desc: "Agradecemos pelo contato com a MoviSabio. Sua solicitação foi registrada sob o número de referência:",
            form_success_note: "Nossa equipe executiva e técnica avaliará os parâmetros do projeto em até 2 dias úteis.",
            form_error_required: "Por favor, preencha todos os campos obrigatórios.",
            form_error_email: "Por favor, insira um e-mail institucional válido.",
            form_error_consent: "Você deve aceitar o consentimento de privacidade para enviar.",
            form_error_spam: "Envio bloqueado pelo sistema antispam.",
            form_mailto_fallback: "Transmissão Direta via E-mail:",

            // Modals
            modal_video_title: "Vídeo Técnico e de Simulação",
            modal_video_close: "Fechar Vídeo",
            modal_leader_title: "Perfil Executivo",
            btn_view_details: "Ver Especificação Técnica →",
            btn_explore_architecture: "Explorar Arquitetura →"
        },

        es: {
            // Navigation
            nav_platform: "Plataforma",
            nav_solutions: "Soluciones",
            nav_architecture: "Tecnología",
            nav_about: "Sobre nosotros",
            nav_research: "Investigación & ESG",
            nav_map: "Mapa Global",
            nav_leadership: "Liderazgo",
            nav_submit_idea: "Socios & Propuestas",
            nav_contact: "Contacto",
            nav_cta: "Colabora con Nosotros",
            skip_to_content: "Saltar al contenido principal",

            // Footer
            footer_desc: "Plataforma de inteligencia territorial preparada para IA y cuántica. Unificando temporización semafórica adaptativa, visión artificial, gemelos digitales y analítica climática para territorios urbanos y regionales.",
            footer_rights: "Todos los derechos reservados.",
            footer_spatial_intel: "Inteligencia Espacial Empresarial",
            footer_gdpr: "Cumplimiento de Privacidad GDPR y LGPD",
            footer_ethics: "Benchmarks de Simulación y Verificación Científica",
            footer_quick_links: "Enlaces de la Plataforma",
            footer_domains: "Dominios Operativos",
            footer_governance: "Gobernanza y Ética",
            footer_privacy_note: "Todos los módulos de control semafórico algorítmico y visión artificial cumplen estrictamente con las normativas GDPR y LGPD. Las transmisiones de vídeo se descartan inmediatamente tras extraer los vectores numéricos.",

            // Homepage Hero & Sections
            hero_badge: "Plataforma Empresarial de Inteligencia Territorial",
            hero_title: "Plataforma de inteligencia territorial preparada para IA y cuántica",
            hero_subtitle: "Transformamos telemetría municipal, de movilidad y medioambiental fragmentada en inteligencia espacial accionable. Integramos IA multiagente, mallas IoT, gemelos digitales y analítica predictiva en un sistema unificado.",
            hero_cta_platform: "Explorar Plataforma",
            hero_cta_solutions: "Ver 15 Soluciones",
            hero_cta_partner: "Consultas Institucionales",
            stat_delay: "Hasta 45%",
            stat_delay_label: "Reducción de Retrasos en Simulación",
            stat_co2: "Meta 15–30%",
            stat_co2_label: "Corte de Emisiones en Ralentí",
            stat_response: "<500ms",
            stat_response_label: "Latencia de Decisión en Edge",
            stat_verified: "100%",
            stat_verified_label: "Código Abierto y Transparente",

            sec_flagship_title: "MoviSabio Enterprise Smart City",
            sec_flagship_subtitle: "El sistema nervioso central para corredores municipales, movilidad regional y resiliencia territorial.",
            sec_solutions_title: "Soluciones Territoriales Modulares",
            sec_solutions_subtitle: "15 módulos de inteligencia especializados diseñados para escalabilidad municipal y seguridad regulatoria.",
            sec_architecture_title: "Arquitectura Empresarial en 4 Capas",
            sec_architecture_subtitle: "Stack nativo en la nube y resiliente en el borde con límites de seguridad en hardware.",
            sec_map_title: "Presencia Global y Gemelos Digitales",
            sec_map_subtitle: "Corredores piloto en simulación activa, benchmarks de datos abiertos y convocatorias internacionales.",
            sec_videos_title: "Medios Técnicos y Demostraciones",
            sec_videos_subtitle: "Simulaciones microscópicas de tráfico, pruebas de visión artificial en el borde y presentación de plataforma.",
            sec_leadership_title: "Liderazgo Ejecutivo",
            sec_leadership_subtitle: "Ingeniería de vanguardia y experiencia en sector público impulsando la innovación territorial.",
            sec_cta_title: "Innova en Infraestructura Inteligente con MoviSabio",
            sec_cta_subtitle: "Colaboramos con municipios con visión de futuro, centros de investigación, integradores tecnológicos e inversores de infraestructura.",

            // Platform Page
            platform_hero_title: "MoviSabio Enterprise Smart City",
            platform_hero_subtitle: "Una plataforma empresarial en la nube diseñada como sistema operativo central para redes de movilidad urbana y regional.",
            platform_pillar_1: "Control Semafórico Adaptativo (AITCS)",
            platform_pillar_2: "Visión Artificial y Sensores en el Borde",
            platform_pillar_3: "Aprendizaje por Refuerzo Profundo Multiagente",
            platform_pillar_4: "Prioridad para Emergencias y Onda Verde",
            platform_pillar_5: "Inteligencia de Emisiones y Microclima",
            platform_pillar_6: "Gemelos Digitales Territoriales (SUMO)",
            platform_rollout_title: "Marco de Implementación Municipal en 4 Fases",

            // Solutions Page
            solutions_hero_title: "15 Soluciones Modulares",
            solutions_hero_subtitle: "Módulos de inteligencia territorial diseñados para su integración progresiva en la infraestructura municipal existente y redes de transporte regional.",
            filter_all: "Todas las Soluciones (15)",
            filter_traffic: "Tráfico y Semáforos",
            filter_transit: "Flotas y Transporte",
            filter_safety: "Seguridad y Medio Ambiente",
            filter_spatial: "Gemelo Digital Espacial",
            badge_implemented: "Benchmark de Simulación Implementado",
            badge_development: "En Desarrollo Activo",
            badge_planned: "Módulo de Investigación Planificado",
            badge_concept: "Marco Conceptual Estratégico",
            label_problem: "Problema",
            label_approach: "Enfoque Propuesto",
            label_architecture: "Arquitectura",
            label_technologies: "Tecnologías",
            label_use_cases: "Casos de Uso",
            label_limitations: "Limitaciones Regulatorias y de Seguridad",
            label_maturity: "Estado de Desarrollo",

            // Technology Page
            tech_hero_title: "Tecnología & Arquitectura",
            tech_hero_subtitle: "Divulgación técnica transparente de nuestro stack de ingeniería, motores de simulación microscópica, algoritmos de IA y garantías de privacidad.",
            tech_verified_title: "Stack Tecnológico y Estado de Verificación",
            tech_safety_title: "Límites de Seguridad y Enclavamientos",

            // About Page
            about_hero_title: "Sobre MoviSabio",
            about_hero_subtitle: "Desarrollando inteligencia territorial soberana y verificable para comunidades resilientes en todo el mundo.",
            about_mission_title: "Nuestra Misión",
            about_vision_title: "Nuestra Visión a Largo Plazo",
            about_principles_title: "Principios Arquitectónicos",
            about_roadmap_title: "Hoja de Ruta Estratégica 2026–2030",

            // Research & ESG Page
            research_hero_title: "Investigación & Innovación",
            research_hero_subtitle: "Benchmarks científicos rigurosos, modelos de simulación microscópica de código abierto y consorcios internacionales de investigación.",
            research_transparency_title: "Transparencia: Simulación frente a Actuación en Campo",
            research_benchmarks_title: "Benchmarks de Simulación Microscópica",
            research_grants_title: "Consorcios Internacionales de Investigación",

            // Global Page
            global_hero_title: "Presencia Global y Corredores Regionales",
            global_hero_subtitle: "Benchmarks activos de simulación, propuestas piloto y corredores académicos en América Latina y Europa.",
            global_btn_all: "Ver Todos",
            global_btn_brazil: "Brasil (Campinas)",
            global_btn_uruguay: "Uruguay (Montevideo)",
            global_btn_germany: "Alemania (Múnich/Berlín)",
            global_btn_italy: "Italia (Milán)",

            // Leadership Page
            leadership_hero_title: "Liderazgo Ejecutivo",
            leadership_hero_subtitle: "Profundidad técnica, gobernanza pública y gestión de alianzas estratégicas internacionales.",
            modal_bio_title: "Biografía Ejecutiva",
            modal_close: "Cerrar",

            // Partners & Pitch Page
            partners_hero_title: "Alianzas Institucionales e Innovación Abierta",
            partners_hero_subtitle: "Canales transparentes de colaboración para municipios, investigadores, integradores de sistemas y fondos climáticos.",
            pitch_title: "Envía tu Propuesta de Innovación Abierta",
            pitch_desc: "Propón un proyecto piloto de movilidad urbana, experimento académico o conjunto de datos territoriales para codesarrollo.",

            // Contact Page
            contact_hero_title: "Consultas Institucionales & Contacto",
            contact_hero_subtitle: "Conéctate directamente con los equipos de ingeniería, investigación y sector público de MoviSabio.",
            form_name: "Nombre Completo y Cargo Oficial",
            form_email: "Correo Electrónico Institucional",
            form_org: "Organización / Municipio / Institución",
            form_category: "Categoría de Consulta",
            cat_municipal: "Alianza Municipal y Propuesta de Piloto",
            cat_research: "Investigación Académica y Consorcios de Subvención",
            cat_investor: "Inversor Institucional y Fondos de Infraestructura",
            cat_technology: "Integración Tecnológica y de Hardware",
            cat_enterprise: "Solución Territorial Empresarial",
            form_message: "Alcance Detallado del Proyecto o Consulta",
            form_privacy_consent: "Acepto el tratamiento de mis datos de contacto conforme a la normativa GDPR y LGPD. Ningún dato será vendido a terceros.",
            form_btn_submit: "Enviar Consulta Institucional",
            form_submitting: "Transmitiendo de Forma Segura...",
            form_success_title: "Consulta Recibida con Éxito",
            form_success_desc: "Gracias por contactar con MoviSabio. Su solicitud ha sido registrada bajo la referencia:",
            form_success_note: "Nuestro equipo ejecutivo y técnico revisará los parámetros de su propuesta en un plazo de 2 días laborables.",
            form_error_required: "Por favor, complete todos los campos obligatorios.",
            form_error_email: "Por favor, introduzca un correo electrónico institucional válido.",
            form_error_consent: "Debe aceptar el consentimiento de privacidad para enviar.",
            form_error_spam: "Envío interceptado por verificación antispam.",
            form_mailto_fallback: "Transmisión Directa por Correo:",

            // Modals
            modal_video_title: "Vídeo de Ingeniería y Simulación",
            modal_video_close: "Cerrar Vídeo",
            modal_leader_title: "Perfil Ejecutivo",
            btn_view_details: "Ver Especificación Técnica →",
            btn_explore_architecture: "Explorar Arquitectura →"
        },

        it: {
            // Navigation
            nav_platform: "Piattaforma",
            nav_solutions: "Soluzioni",
            nav_architecture: "Tecnologia",
            nav_about: "Chi siamo",
            nav_research: "Ricerca & ESG",
            nav_map: "Mappa Globale",
            nav_leadership: "Leadership",
            nav_submit_idea: "Partner & Pitch",
            nav_contact: "Contatti",
            nav_cta: "Collabora con Noi",
            skip_to_content: "Salta al contenuto principale",

            // Footer
            footer_desc: "Piattaforma di intelligenza territoriale pronta per IA e quantistica. Sincronizzazione semaforica adattativa, visione artificiale, gemelli digitali e analisi climatica per territori urbani e regionali.",
            footer_rights: "Tutti i diritti riservati.",
            footer_spatial_intel: "Intelligenza Spaziale Aziendale",
            footer_gdpr: "Conforme a GDPR e Normative sulla Privacy",
            footer_ethics: "Benchmark di Simulazione e Verifica Scientifica",
            footer_quick_links: "Link della Piattaforma",
            footer_domains: "Ambiti Operativi",
            footer_governance: "Governance ed Etica",
            footer_privacy_note: "Tutti i moduli algoritmici di controllo del traffico e visione computazionale rispettano rigorosamente gli standard europei GDPR. I flussi video vengono eliminati immediatamente dopo l'estrazione dei vettori.",

            // Homepage Hero & Sections
            hero_badge: "Piattaforma Aziendale di Intelligenza Territoriale",
            hero_title: "Piattaforma di intelligenza territoriale pronta per IA e quantistica",
            hero_subtitle: "Trasformiamo dati frammentati municipali, di mobilità e ambientali in intelligence spaziale operativa. Integriamo IA multi-agente, reti di sensori IoT, gemelli digitali e analisi predittiva in un sistema operativo integrato.",
            hero_cta_platform: "Esplora Piattaforma",
            hero_cta_solutions: "Visualizza 15 Soluzioni",
            hero_cta_partner: "Richieste Istituzionali",
            stat_delay: "Fino al 45%",
            stat_delay_label: "Riduzione Ritardi in Simulazione",
            stat_co2: "Target 15–30%",
            stat_co2_label: "Taglio Emissioni a Motore Acceso",
            stat_response: "<500ms",
            stat_response_label: "Latenza Decisionale Edge",
            stat_verified: "100%",
            stat_verified_label: "Open Source e Trasparente",

            sec_flagship_title: "MoviSabio Enterprise Smart City",
            sec_flagship_subtitle: "Il sistema nervoso centrale per corridoi municipali, mobilità regionale e resilienza territoriale.",
            sec_solutions_title: "Soluzioni Territoriali Modulari",
            sec_solutions_subtitle: "15 moduli di intelligence specializzati progettati per scalabilità municipale e conformità normativa.",
            sec_architecture_title: "Architettura Aziendale a 4 Livelli",
            sec_architecture_subtitle: "Stack cloud-native e resiliente all'edge con vincoli rigorosi di sicurezza hardware.",
            sec_map_title: "Presenza Globale e Gemelli Digitali",
            sec_map_subtitle: "Corridoi pilota in simulazione attiva, benchmark su dati aperti e bandi di ricerca europei.",
            sec_videos_title: "Media Tecnici e Dimostrazioni",
            sec_videos_subtitle: "Simulazioni microscopiche di traffico, test di visione artificiale edge e panoramica della piattaforma.",
            sec_leadership_title: "Leadership Esecutiva",
            sec_leadership_subtitle: "Competenze ingegneristiche e di pubblica amministrazione per l'innovazione territoriale.",
            sec_cta_title: "Costruisci Infrastrutture Intelligenti con MoviSabio",
            sec_cta_subtitle: "Collaboriamo con comuni innovativi, istituti di ricerca, integratori tecnologici e investitori infrastrutturali.",

            // Platform Page
            platform_hero_title: "MoviSabio Enterprise Smart City",
            platform_hero_subtitle: "Piattaforma aziendale cloud-native progettata come sistema operativo centrale per le reti di mobilità urbana e regionale.",
            platform_pillar_1: "Controllo Semaforico Adattativo (AITCS)",
            platform_pillar_2: "Visione Computazionale e Sensori Edge",
            platform_pillar_3: "Deep Reinforcement Learning Multi-Agente",
            platform_pillar_4: "Priorità Veicoli di Emergenza e Onda Verde",
            platform_pillar_5: "Intelligence Emissioni e Microclima",
            platform_pillar_6: "Gemelli Digitali Territoriali (SUMO)",
            platform_rollout_title: "Quadro di Rollout Municipale in 4 Fasi",

            // Solutions Page
            solutions_hero_title: "15 Soluzioni Modulari",
            solutions_hero_subtitle: "Moduli specializzati di intelligence territoriale per l'integrazione graduale nell'infrastruttura municipale e nei sistemi di trasporto.",
            filter_all: "Tutte le Soluzioni (15)",
            filter_traffic: "Traffico e Semafori",
            filter_transit: "Flotte e Trasporto Pubblico",
            filter_safety: "Sicurezza e Ambiente",
            filter_spatial: "Gemello Digitale Spaziale",
            badge_implemented: "Benchmark di Simulazione Implementato",
            badge_development: "In Sviluppo Attivo",
            badge_planned: "Modulo di Ricerca Pianificato",
            badge_concept: "Quadro Concettuale Strategico",
            label_problem: "Problema",
            label_approach: "Approccio Proposto",
            label_architecture: "Architettura",
            label_technologies: "Tecnologie",
            label_use_cases: "Casi d'Uso",
            label_limitations: "Limitazioni Normative e di Sicurezza",
            label_maturity: "Stato di Sviluppo",

            // Technology Page
            tech_hero_title: "Tecnologia & Architettura",
            tech_hero_subtitle: "Divulgazione tecnica trasparente del nostro stack, motori di simulazione microscopica, algoritmi di apprendimento e tutele della privacy.",
            tech_verified_title: "Stack Tecnologico e Stato di Verifica",
            tech_safety_title: "Limiti di Sicurezza e Interblocchi",

            // About Page
            about_hero_title: "Chi è MoviSabio",
            about_hero_subtitle: "Sviluppiamo intelligence territoriale sovrana e verificabile per comunità resilienti in tutto il mondo.",
            about_mission_title: "La Nostra Missione",
            about_vision_title: "La Nostra Visione a Lungo Termine",
            about_principles_title: "Principi Architetturali",
            about_roadmap_title: "Tabella di Marcia Strategica 2026–2030",

            // Research & ESG Page
            research_hero_title: "Ricerca & Innovazione",
            research_hero_subtitle: "Rigorosi benchmark scientifici, modelli di simulazione microscopica open-source e consorzi di finanziamento internazionali.",
            research_transparency_title: "Trasparenza: Simulazione vs Attuazione sul Campo",
            research_benchmarks_title: "Benchmark di Simulazione Microscopica",
            research_grants_title: "Consorzi di Ricerca Internazionali",

            // Global Page
            global_hero_title: "Presenza Globale e Corridoi Regionali",
            global_hero_subtitle: "Benchmark attivi, proposte pilota e corridoi accademici in America Latina ed Europa.",
            global_btn_all: "Mostra Tutti",
            global_btn_brazil: "Brasile (Campinas)",
            global_btn_uruguay: "Uruguay (Montevideo)",
            global_btn_germany: "Germania (Monaco/Berlino)",
            global_btn_italy: "Italia (Milano)",

            // Leadership Page
            leadership_hero_title: "Leadership Esecutiva",
            leadership_hero_subtitle: "Competenza ingegneristica, governance istituzionale e gestione di partenariati globali.",
            modal_bio_title: "Profilo Esecutivo",
            modal_close: "Chiudi",

            // Partners & Pitch Page
            partners_hero_title: "Partenariati Istituzionali e Open Innovation",
            partners_hero_subtitle: "Percorsi di collaborazione chiari per municipalità, ricercatori universitari, integratori di sistemi e fondi climatici.",
            pitch_title: "Invia una Proposta di Open Innovation",
            pitch_desc: "Proponi un progetto pilota per la mobilità urbana, un esperimento accademico o un dataset per lo sviluppo congiunto.",

            // Contact Page
            contact_hero_title: "Richieste Istituzionali & Contatti",
            contact_hero_subtitle: "Contatta direttamente i team di ingegneria, ricerca e relazioni istituzionali di MoviSabio.",
            form_name: "Nome Completo & Titolo Ufficiale",
            form_email: "Email Istituzionale",
            form_org: "Organizzazione / Comune / Istituto",
            form_category: "Categoria di Richiesta",
            cat_municipal: "Partenariato Municipale & Proposta Pilota",
            cat_research: "Ricerca Accademica & Bandi Europei",
            cat_investor: "Investitore Istituzionale & Fondi Infrastrutturali",
            cat_technology: "Integrazione Tecnologica & Hardware",
            cat_enterprise: "Soluzione Territoriale Aziendale",
            form_message: "Ambito Dettagliato del Progetto o Richiesta",
            form_privacy_consent: "Accetto il trattamento dei dati di contatto ai sensi del GDPR. Nessun dato sarà ceduto a terzi.",
            form_btn_submit: "Invia Richiesta Istituzionale",
            form_submitting: "Trasmissione Sicura in Corso...",
            form_success_title: "Richiesta Ricevuta con Successo",
            form_success_desc: "Grazie per aver contattato MoviSabio. La sua richiesta è stata registrata con il codice di riferimento:",
            form_success_note: "Il nostro team esecutivo esaminerà i parametri del progetto entro 2 giorni lavorativi.",
            form_error_required: "Si prega di compilare tutti i campi obbligatori.",
            form_error_email: "Si prega di inserire un indirizzo email istituzionale valido.",
            form_error_consent: "È necessario accettare l'informativa sulla privacy per procedere.",
            form_error_spam: "Invio bloccato dalla protezione antispam.",
            form_mailto_fallback: "Invio Diretto via Email:",

            // Modals
            modal_video_title: "Video Tecnico e di Simulazione",
            modal_video_close: "Chiudi Video",
            modal_leader_title: "Profilo Esecutivo",
            btn_view_details: "Vedi Specifica Tecnica →",
            btn_explore_architecture: "Esplora Architettura →"
        },

        zh: {
            // Navigation
            nav_platform: "平台架构",
            nav_solutions: "解决方案",
            nav_architecture: "技术架构",
            nav_about: "关于我们",
            nav_research: "研发与ESG",
            nav_map: "全球地图",
            nav_leadership: "领导团队",
            nav_submit_idea: "合作伙伴与提案",
            nav_contact: "联系我们",
            nav_cta: "洽谈合作",
            skip_to_content: "跳至主要内容",

            // Footer
            footer_desc: "面向人工智能与量子计算的地域智能平台。深度融合自适应交通信号协同、计算机视觉、数字孪生与气候分析，赋能城市与区域生态。",
            footer_rights: "版权所有。",
            footer_spatial_intel: "企业级空间智能系统",
            footer_gdpr: "符合欧盟GDPR与巴西LGPD数据合规标准",
            footer_ethics: "微观仿真基准与科学验证",
            footer_quick_links: "平台导航",
            footer_domains: "业务领域",
            footer_governance: "企业治理与伦理",
            footer_privacy_note: "所有算法信号控制与边缘计算机视觉模块严格遵循国际隐私法规。原始摄像头视频流在特征提取后立即销毁，不存储个人生物特征。",

            // Homepage Hero & Sections
            hero_badge: "企业级地域智能平台",
            hero_title: "面向人工智能与量子计算的地域智能平台",
            hero_subtitle: "将零散的市政、出行与环境遥测数据转化为可执行的空间智能。深度融合多智能体AI、IoT传感网、数字孪生与预测分析，构建统一的城市运行系统。",
            hero_cta_platform: "探索企业级平台",
            hero_cta_solutions: "查看 15 项解决方案",
            hero_cta_partner: "机构合作洽谈",
            stat_delay: "最高 45%",
            stat_delay_label: "仿真通行延误缩减率",
            stat_co2: "目标 15–30%",
            stat_co2_label: "车辆怠速碳排放减少",
            stat_response: "<500ms",
            stat_response_label: "边缘决策响应延迟",
            stat_verified: "100%",
            stat_verified_label: "开源可验证与技术透明",

            sec_flagship_title: "MoviSabio 企业级智慧城市平台",
            sec_flagship_subtitle: "服务于市政主干道走廊、区域交通与地域韧性的核心中枢神经系统。",
            sec_solutions_title: "模块化地域解决方案",
            sec_solutions_subtitle: "15个专业化智能模块，专为城市级横向扩展与合规安全性设计。",
            sec_architecture_title: "四层企业级系统架构",
            sec_architecture_subtitle: "具备硬件级物理安全互锁边界的云原生与边缘韧性计算堆栈。",
            sec_map_title: "全球布局与数字孪生基准",
            sec_map_subtitle: "活跃的微观仿真试点廊道、开放数据基准与国际研发基金对接通道。",
            sec_videos_title: "工程实测演示与视频",
            sec_videos_subtitle: "微观交通流仿真、边缘计算机视觉实时检测与平台架构深度解析。",
            sec_leadership_title: "管理团队",
            sec_leadership_subtitle: "深厚的技术研发实力与公共部门合作经验，引领空间智能前沿发展。",
            sec_cta_title: "与 MoviSabio 携手共建下一代智能基础设施",
            sec_cta_subtitle: "我们与前瞻性的市政当局、科研院所、软硬件集成商及基础设施投资机构深度合作。",

            // Platform Page
            platform_hero_title: "MoviSabio 企业级智慧城市平台",
            platform_hero_subtitle: "云原生企业级地域智能平台，作为城市与区域多模态交通网络的核心中枢运行系统。",
            platform_pillar_1: "自适应交通信号协同控制 (AITCS)",
            platform_pillar_2: "边缘计算机视觉与全息感知",
            platform_pillar_3: "多智能体深度强化学习网络",
            platform_pillar_4: "特种紧急车辆绿波通行预检",
            platform_pillar_5: "碳排放感知与微气候环境智能",
            platform_pillar_6: "城市级微观数字孪生体 (SUMO)",
            platform_rollout_title: "四阶段市政部署落地框架",

            // Solutions Page
            solutions_hero_title: "15 项模块化解决方案",
            solutions_hero_subtitle: "专为现有市政基础设施与区域交通网络渐进式升级而设计的空间智能模块体系。",
            filter_all: "全部解决方案 (15)",
            filter_traffic: "交通流与信号协同",
            filter_transit: "公交调度与车队运营",
            filter_safety: "道路安全与绿色环境",
            filter_spatial: "空间数字孪生",
            badge_implemented: "微观仿真基准已实现",
            badge_development: "正在进行工程开发",
            badge_planned: "科研规划阶段模块",
            badge_concept: "战略远景概念框架",
            label_problem: "痛点问题",
            label_approach: "技术方案",
            label_architecture: "系统架构",
            label_technologies: "技术栈",
            label_use_cases: "典型应用场景",
            label_limitations: "安全互锁与法规限制说明",
            label_maturity: "成熟度状态",

            // Technology Page
            tech_hero_title: "技术体系与架构披露",
            tech_hero_subtitle: "透明披露工程技术栈、微观仿真封装器、强化学习算法以及严格的数据隐私安全机制。",
            tech_verified_title: "工程技术栈及验证状态",
            tech_safety_title: "硬件级安全边界与故障互锁",

            // About Page
            about_hero_title: "关于 MoviSabio",
            about_hero_subtitle: "为全球可持续与高韧性城市打造自主可控、真实可信的地域智能生态。",
            about_mission_title: "我们的使命",
            about_vision_title: "远景目标",
            about_principles_title: "核心架构原则",
            about_roadmap_title: "2026–2030 战略发展路线图",

            // Research & ESG Page
            research_hero_title: "科学研发与创新",
            research_hero_subtitle: "严谨的学术仿真基准、开源微观仿真模型与国际科研基金联合体。",
            research_transparency_title: "技术透明声明：仿真建模与实际路面控制的区别",
            research_benchmarks_title: "微观交通仿真基准测试",
            research_grants_title: "国际产学研合作项目",

            // Global Page
            global_hero_title: "全球布局与国际走廊",
            global_hero_subtitle: "分布在拉美与欧洲的微观仿真基准、技术试点方案与学术联合研发走廊。",
            global_btn_all: "查看全部",
            global_btn_brazil: "巴西 (坎皮纳斯走廊)",
            global_btn_uruguay: "乌拉圭 (蒙得维的亚数字孪生)",
            global_btn_germany: "德国 (慕尼黑/柏林通道)",
            global_btn_italy: "意大利 (米兰走廊)",

            // Leadership Page
            leadership_hero_title: "管理团队",
            leadership_hero_subtitle: "坚实的工程技术底蕴、公共部门管理经验与全球商业合作视野。",
            modal_bio_title: "高管简介",
            modal_close: "关闭",

            // Partners & Pitch Page
            partners_hero_title: "机构合作与开放创新提案",
            partners_hero_subtitle: "面向市政管理机构、高校科研人员、硬件集成商和气候基金的开放合作框架。",
            pitch_title: "提交开放创新提案 (Open Innovation)",
            pitch_desc: "提出智慧交通试点提案、学术联合科研计划或提供地域数据集以开展联合研发。",

            // Contact Page
            contact_hero_title: "机构业务洽谈与联络",
            contact_hero_subtitle: "直接与 MoviSabio 核心工程团队、科研专家及公共关系代表取得联系。",
            form_name: "联系人全名与职务",
            form_email: "机构官方工作邮箱",
            form_org: "所属机构 / 市政部门 / 企业名称",
            form_category: "洽谈类别",
            cat_municipal: "市政示范试点与合作意向 (LOI)",
            cat_research: "高校科研合作与国际科研基金申报",
            cat_investor: "战略投资人与基础设施气候基金",
            cat_technology: "硬件设备接入与技术系统集成",
            cat_enterprise: "企业级空间智能平台采购",
            form_message: "项目需求细节或合作构想",
            form_privacy_consent: "本人同意根据 GDPR/LGPD 隐私合规条例处理上述机构联系信息。MoviSabio 承诺绝不向第三方泄露数据。",
            form_btn_submit: "提交机构洽谈信息",
            form_submitting: "正在建立安全加密传输...",
            form_success_title: "洽谈信息已成功接收",
            form_success_desc: "感谢您联系 MoviSabio。您的机构需求已建档，业务追踪参考编号为：",
            form_success_note: "我们的核心工程团队与业务代表将在 2 个工作日内评估项目参数并与您联络。",
            form_error_required: "请填写所有必填字段。",
            form_error_email: "请输入有效的机构官方电子邮箱。",
            form_error_consent: "您必须勾选隐私条款方可提交。",
            form_error_spam: "反垃圾验证未通过，请刷新后重试。",
            form_mailto_fallback: "通过官方邮件直连发送：",

            // Modals
            modal_video_title: "工程视频与微观仿真展示",
            modal_video_close: "关闭视频",
            modal_leader_title: "高管履历详情",
            btn_view_details: "查看完整技术规范 →",
            btn_explore_architecture: "探索系统架构 →"
        }
    };

    let currentLang = DEFAULT_LANG;

    function getInitialLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const queryLang = urlParams.get('lang');
        if (queryLang && SUPPORTED_LANGS.includes(queryLang.toLowerCase())) {
            return queryLang.toLowerCase();
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED_LANGS.includes(stored)) {
                return stored;
            }
        } catch (e) {
            console.warn('localStorage access denied for language:', e);
        }

        const navLang = (navigator.language || navigator.userLanguage || '').substring(0, 2).toLowerCase();
        if (SUPPORTED_LANGS.includes(navLang)) {
            return navLang;
        }

        return DEFAULT_LANG;
    }

    function translateText(key, lang) {
        const activeDict = dictionaries[lang] || dictionaries[DEFAULT_LANG];
        if (activeDict && Object.prototype.hasOwnProperty.call(activeDict, key)) {
            return activeDict[key];
        }
        if (dictionaries[DEFAULT_LANG] && Object.prototype.hasOwnProperty.call(dictionaries[DEFAULT_LANG], key)) {
            return dictionaries[DEFAULT_LANG][key];
        }
        return null;
    }

    function setLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            lang = DEFAULT_LANG;
        }
        currentLang = lang;

        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            // ignore localStorage quota/access issues
        }

        document.documentElement.lang = lang;
        document.documentElement.dir = 'ltr';

        // Update all select dropdowns with id or class
        document.querySelectorAll('#lang-select, .lang-dropdown-enterprise').forEach(sel => {
            sel.value = lang;
        });

        // Update text/html elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = translateText(key, lang);
            if (translation !== null) {
                // If element has no children or is purely text, update text/html
                el.innerHTML = translation;
            }
        });

        // Update placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = translateText(key, lang);
            if (translation !== null) {
                el.placeholder = translation;
            }
        });

        // Update aria-label attributes
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            const translation = translateText(key, lang);
            if (translation !== null) {
                el.setAttribute('aria-label', translation);
            }
        });

        // Update title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const translation = translateText(key, lang);
            if (translation !== null) {
                el.setAttribute('title', translation);
            }
        });

        // Dispatch language change event for custom components
        window.dispatchEvent(new CustomEvent('movisabio:langchange', {
            detail: { lang: lang }
        }));
    }

    // Initialize as soon as DOM is interactive
    function init() {
        const initial = getInitialLanguage();
        setLanguage(initial);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose Global API
    window.MoviSabioI18n = {
        supportedLangs: SUPPORTED_LANGS,
        defaultLang: DEFAULT_LANG,
        currentLang: () => currentLang,
        setLanguage: setLanguage,
        t: (key, fallback = '') => {
            const res = translateText(key, currentLang);
            return res !== null ? res : fallback;
        },
        getDictionaries: () => dictionaries
    };

    // Global backwards-compatible shim
    window.setLanguage = setLanguage;

})();
