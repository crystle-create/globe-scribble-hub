import { useLanguage } from "@/contexts/LanguageContext";
import { Cloud, CloudSun } from "lucide-react";
import { languages } from "@/contexts/LanguageContext";
import { LanguageBadge } from "@/components/LanguageBadge";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    about: {
      en: "About CloudiBlog",
      es: "Sobre CloudiBlog",
      fr: "À propos de CloudiBlog",
      de: "Über CloudiBlog",
      zh: "关于 CloudiBlog",
      ja: "CloudiBlog について",
      ar: "حول CloudiBlog"
    },
    mission: {
      title: {
        en: "Our Mission",
        es: "Nuestra Misión",
        fr: "Notre Mission",
        de: "Unsere Mission",
        zh: "我们的使命",
        ja: "私たちのミッション",
        ar: "مهمتنا"
      },
      content: {
        en: "CloudiBlog is dedicated to sharing diverse perspectives and stories from around the globe. We believe in the power of international voices to broaden horizons, foster understanding, and build connections across cultures.",
        es: "CloudiBlog está dedicado a compartir perspectivas y historias diversas de todo el mundo. Creemos en el poder de las voces internacionales para ampliar horizontes, fomentar la comprensión y construir conexiones entre culturas.",
        fr: "CloudiBlog se consacre au partage de perspectives et d'histoires diverses du monde entier. Nous croyons au pouvoir des voix internationales pour élargir les horizons, favoriser la compréhension et créer des liens entre les cultures.",
        de: "CloudiBlog widmet sich dem Austausch vielfältiger Perspektiven und Geschichten aus der ganzen Welt. Wir glauben an die Kraft internationaler Stimmen, Horizonte zu erweitern, Verständnis zu fördern und Verbindungen zwischen Kulturen zu schaffen.",
        zh: "CloudiBlog 致力于分享来自世界各地的多元视角和故事。我们相信国际声音的力量，可以拓宽视野，促进理解，建立跨文化联系。",
        ja: "CloudiBlogは、世界中の多様な視点やストーリーを共有することに専念しています。私たちは、視野を広げ、理解を深め、文化を超えたつながりを構築する国際的な声の力を信じています。",
        ar: "يكرس CloudiBlog نفسه لمشاركة وجهات النظر والقصص المتنوعة من جميع أنحاء العالم. نؤمن بقوة الأصوات الدولية في توسيع الآفاق وتعزيز التفاهم وبناء روابط عبر الثقافات."
      }
    },
    languages: {
      title: {
        en: "Languages We Support",
        es: "Idiomas que Soportamos",
        fr: "Langues Prises en Charge",
        de: "Unterstützte Sprachen",
        zh: "我们支持的语言",
        ja: "サポートしている言語",
        ar: "اللغات التي ندعمها"
      },
      content: {
        en: "CloudiBlog currently supports content in seven languages, with plans to expand our linguistic offerings in the future. Our goal is to make quality content accessible to readers in their preferred language.",
        es: "CloudiBlog actualmente admite contenido en siete idiomas, con planes para ampliar nuestras ofertas lingüísticas en el futuro. Nuestro objetivo es hacer que el contenido de calidad sea accesible a los lectores en el idioma de su preferencia.",
        fr: "CloudiBlog prend actuellement en charge le contenu dans sept langues, avec des plans pour étendre nos offres linguistiques à l'avenir. Notre objectif est de rendre le contenu de qualité accessible aux lecteurs dans leur langue préférée.",
        de: "CloudiBlog unterstützt derzeit Inhalte in sieben Sprachen, mit Plänen, unser Sprachangebot in Zukunft zu erweitern. Unser Ziel ist es, qualitativ hochwertige Inhalte für Leser in ihrer bevorzugten Sprache zugänglich zu machen.",
        zh: "CloudiBlog 目前支持七种语言的内容，未来计划扩展我们的语言服务。我们的目标是让读者能够以他们喜欢的语言获取优质内容。",
        ja: "CloudiBlogは現在、7つの言語でコンテンツをサポートしており、将来的に言語提供を拡大する計画があります。私たちの目標は、読者が好みの言語で質の高いコンテンツにアクセスできるようにすることです。",
        ar: "يدعم CloudiBlog حاليًا المحتوى بسبع لغات، مع خطط لتوسيع عروضنا اللغوية في المستقبل. هدفنا هو جعل المحتوى عالي الجودة متاحًا للقراء بلغتهم المفضلة."
      }
    },
    team: {
      title: {
        en: "Our Team",
        es: "Nuestro Equipo",
        fr: "Notre Équipe",
        de: "Unser Team",
        zh: "我们的团队",
        ja: "私たちのチーム",
        ar: "فريقنا"
      },
      content: {
        en: "We are a diverse team of writers, editors, and translators from around the world, united by our passion for sharing stories across linguistic and cultural boundaries.",
        es: "Somos un equipo diverso de escritores, editores y traductores de todo el mundo, unidos por nuestra pasión por compartir historias a través de fronteras lingüísticas y culturales.",
        fr: "Nous sommes une équipe diversifiée d'écrivains, d'éditeurs et de traducteurs du monde entier, unis par notre passion pour partager des histoires au-delà des frontières linguistiques et culturelles.",
        de: "Wir sind ein vielfältiges Team von Autoren, Redakteuren und Übersetzern aus der ganzen Welt, vereint durch unsere Leidenschaft, Geschichten über sprachliche und kulturelle Grenzen hinweg zu teilen.",
        zh: "我们是来自世界各地的作家、编辑和翻译组成的多元化团队，我们因分享跨越语言和文化界限的故事的热情而团结在一起。",
        ja: "私たちは、言語や文化の垣根を越えてストーリーを共有するという情熱によって結ばれた、世界中の作家、編集者、翻訳者からなる多様なチームです。",
        ar: "نحن فريق متنوع من الكتاب والمحررين والمترجمين من جميع أنحاء العالم، يجمعنا شغفنا بمشاركة القصص عبر الحدود اللغوية والثقافية."
      }
    },
    contact: {
      title: {
        en: "Contact Us",
        es: "Contáctanos",
        fr: "Contactez-nous",
        de: "Kontaktieren Sie uns",
        zh: "联系我们",
        ja: "お問い合わせ",
        ar: "اتصل بنا"
      },
      content: {
        en: "Have a question, suggestion, or want to contribute? We'd love to hear from you. Reach out to our team at contact@worldblog.com or follow us on social media.",
        es: "¿Tienes alguna pregunta, sugerencia o quieres contribuir? Nos encantaría saber de ti. Ponte en contacto con nuestro equipo en contact@worldblog.com o síguenos en las redes sociales.",
        fr: "Vous avez une question, une suggestion ou vous souhaitez contribuer ? Nous aimerions avoir de vos nouvelles. Contactez notre équipe à contact@worldblog.com ou suivez-nous sur les réseaux sociaux.",
        de: "Haben Sie eine Frage, einen Vorschlag oder möchten Sie einen Beitrag leisten? Wir würden gerne von Ihnen hören. Kontaktieren Sie unser Team unter contact@worldblog.com oder folgen Sie uns in den sozialen Medien.",
        zh: "有问题、建议或想要投稿？我们很乐意收到您的来信。请通过 contact@worldblog.com 联系我们的团队，或在社交媒体上关注我们。",
        ja: "質問、提案、または投稿したいですか？ぜひお聞かせください。contact@worldblog.com ��私たちのチームに連絡するか、ソーシャルメディアでフォローしてください。",
        ar: "هل لديك سؤال أو اقتراح أو ترغب في المساهمة؟ نود أن نسمع منك. تواصل مع فريقنا على contact@worldblog.com أو تابعنا على وسائل التواصل الاجتماعي."
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-playfair mb-8">
          {translations.about[currentLanguage.code as keyof typeof translations.about] || translations.about.en}
        </h1>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-playfair mb-4">
            {translations.mission.title[currentLanguage.code as keyof typeof translations.mission.title] || translations.mission.title.en}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {translations.mission.content[currentLanguage.code as keyof typeof translations.mission.content] || translations.mission.content.en}
          </p>
          
          <div className="flex items-center justify-center my-12">
            <div className="relative">
              <Cloud className="h-32 w-32 text-blog-indigo" />
              <CloudSun className="h-12 w-12 text-blog-amber absolute -top-4 -right-2" />
              <div className="absolute inset-0 flex items-center justify-center pt-2">
                <span className="text-3xl font-playfair font-bold text-white">CloudiBlog</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-playfair mb-4">
            {translations.languages.title[currentLanguage.code as keyof typeof translations.languages.title] || translations.languages.title.en}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {translations.languages.content[currentLanguage.code as keyof typeof translations.languages.content] || translations.languages.content.en}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {languages.map(language => (
              <Card key={language.code}>
                <CardContent className="flex items-center justify-center p-4 text-center">
                  <div>
                    <div className="text-4xl mb-2">{language.flag}</div>
                    <div className="font-medium">{language.name}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-playfair mb-4">
            {translations.team.title[currentLanguage.code as keyof typeof translations.team.title] || translations.team.title.en}
          </h2>
          <p className="text-lg text-gray-700">
            {translations.team.content[currentLanguage.code as keyof typeof translations.team.content] || translations.team.content.en}
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold font-playfair mb-4">
            {translations.contact.title[currentLanguage.code as keyof typeof translations.contact.title] || translations.contact.title.en}
          </h2>
          <p className="text-lg text-gray-700">
            {translations.contact.content[currentLanguage.code as keyof typeof translations.contact.content] || translations.contact.content.en}
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
