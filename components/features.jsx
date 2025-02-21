import { BookOpen, MessageSquare, Users, Award, Video, Calendar } from "lucide-react"

export function Features({ language }) {
  const content = {
    en: {
      title: "Everything you need to grow your startup",
      description: "Access all the tools, resources, and connections needed to take your startup to the next level",
      features: [
        {
          icon: <BookOpen className="h-10 w-10 text-secondary" />,
          title: "Complete Startup Guide",
          description: "Structured modules covering all essential aspects of entrepreneurship.",
        },
        {
          icon: <MessageSquare className="h-10 w-10 text-secondary" />,
          title: "24/7 Mentorship",
          description: "Direct access to expert mentors whenever you need help.",
        },
        {
          icon: <Video className="h-10 w-10 text-secondary" />,
          title: "Interactive Courses",
          description: "Video content, practical exercises, and assessments to validate your learning.",
        },
        {
          icon: <Users className="h-10 w-10 text-secondary" />,
          title: "Active Community",
          description: "Connect with other founders and expand your network in the ecosystem.",
        },
        {
          icon: <Calendar className="h-10 w-10 text-secondary" />,
          title: "Events and DemoDays",
          description: "Participate in exclusive events and present your startup to investors.",
        },
        {
          icon: <Award className="h-10 w-10 text-secondary" />,
          title: "LinkUp Certification",
          description: "Obtain recognition that validates your knowledge and expertise.",
        },
      ],
    },
    es: {
      title: "Todo lo que necesitas para hacer crecer tu startup",
      description:
        "Accede a todas las herramientas, recursos y conexiones necesarias para llevar tu startup al siguiente nivel",
      features: [
        {
          icon: <BookOpen className="h-10 w-10 text-secondary" />,
          title: "Guía Completa de Startups",
          description: "Módulos estructurados que cubren todos los aspectos esenciales del emprendimiento.",
        },
        {
          icon: <MessageSquare className="h-10 w-10 text-secondary" />,
          title: "Mentoría 24/7",
          description: "Acceso directo a mentores expertos en cualquier momento que necesites ayuda.",
        },
        {
          icon: <Video className="h-10 w-10 text-secondary" />,
          title: "Cursos Interactivos",
          description: "Contenido en video, ejercicios prácticos y evaluaciones para validar tu aprendizaje.",
        },
        {
          icon: <Users className="h-10 w-10 text-secondary" />,
          title: "Comunidad Activa",
          description: "Conecta con otros fundadores y expande tu red de contactos en el ecosistema.",
        },
        {
          icon: <Calendar className="h-10 w-10 text-secondary" />,
          title: "Eventos y DemoDays",
          description: "Participa en eventos exclusivos y presenta tu startup ante inversores.",
        },
        {
          icon: <Award className="h-10 w-10 text-secondary" />,
          title: "Certificación LinkUp",
          description: "Obtén el reconocimiento que valida tus conocimientos y expertise.",
        },
      ],
    },
  }

  const t = content[language]

  return (
<section className="py-24 bg-white">
        <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.description}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

