export const recommendations = {
  "Atención y Enfoque": {
      basic: [
          {
              title: "Fundamentos de la Atención",
              description: "Ejercicios básicos para mejorar tu capacidad de atención",
              steps: [
                  "Practica la técnica pomodoro: 25 minutos de concentración, 5 de descanso",
                  "Elimina distracciones del entorno antes de cada conversación",
                  "Mantén contacto visual moderado durante las conversaciones",
                  "Toma notas breves durante conversaciones importantes"
              ]
          },
          {
              title: "Control de Distracciones",
              description: "Técnicas para manejar elementos que dispersan la atención",
              steps: [
                  "Silencia notificaciones durante conversaciones importantes",
                  "Encuentra un espacio tranquilo para conversaciones significativas",
                  "Practica ejercicios de respiración cuando te sientas disperso",
                  "Establece momentos específicos para revisar mensajes y correos"
              ]
          }
      ],
      advanced: [
          {
              title: "Atención Plena Avanzada",
              description: "Técnicas avanzadas de mindfulness y concentración",
              steps: [
                  "Practica meditación mindfulness por 20 minutos diarios",
                  "Realiza ejercicios de visualización guiada",
                  "Implementa técnicas de anclaje atencional",
                  "Desarrolla un ritual personal de preparación mental"
              ]
          }
      ]
  },
  "Comprensión y Procesamiento": {
      basic: [
          {
              title: "Comprensión Básica",
              description: "Mejora tu capacidad de entender mensajes",
              steps: [
                  "Practica el parafraseo de mensajes simples",
                  "Identifica las ideas principales de cada conversación",
                  "Formula preguntas aclaratorias básicas",
                  "Desarrolla un vocabulario más amplio"
              ]
          },
          {
              title: "Procesamiento Inicial",
              description: "Desarrolla habilidades básicas de procesamiento",
              steps: [
                  "Toma notas estructuradas durante conversaciones",
                  "Organiza la información en categorías simples",
                  "Practica la síntesis de información básica",
                  "Identifica patrones en la comunicación"
              ]
          }
      ],
      advanced: [
          {
              title: "Análisis Profundo",
              description: "Técnicas avanzadas de procesamiento de información",
              steps: [
                  "Crea mapas mentales de conversaciones complejas",
                  "Analiza patrones de comunicación recurrentes",
                  "Desarrolla modelos mentales de comprensión",
                  "Practica la identificación de subtextos"
              ]
          }
      ]
  },
  "Retroalimentación": {
      basic: [
          {
              title: "Feedback Básico",
              description: "Aprende los fundamentos de la retroalimentación",
              steps: [
                  "Practica la técnica del sándwich de feedback",
                  "Usa frases en primera persona para expresar opiniones",
                  "Aprende a recibir críticas constructivas",
                  "Desarrolla un vocabulario de feedback positivo"
              ]
          },
          {
              title: "Comunicación Asertiva",
              description: "Mejora tu capacidad de dar y recibir feedback",
              steps: [
                  "Practica la escucha sin juzgar",
                  "Aprende a dar feedback específico y constructivo",
                  "Desarrolla habilidades de empatía básica",
                  "Implementa técnicas de comunicación no violenta"
              ]
          }
      ],
      advanced: [
          {
              title: "Retroalimentación Avanzada",
              description: "Técnicas sofisticadas de feedback",
              steps: [
                  "Implementa sistemas de retroalimentación 360°",
                  "Desarrolla habilidades de coaching",
                  "Practica la facilitación de diálogos difíciles",
                  "Crea planes de desarrollo basados en feedback"
              ]
          }
      ]
  },
  "Preparación y Planificación": {
      basic: [
          {
              title: "Planificación Básica",
              description: "Fundamentos de preparación para la comunicación",
              steps: [
                  "Establece objetivos claros antes de cada conversación",
                  "Prepara puntos clave a discutir",
                  "Organiza tus ideas en una estructura simple",
                  "Anticipa preguntas básicas"
              ]
          },
          {
              title: "Organización Comunicativa",
              description: "Mejora tu preparación para conversaciones",
              steps: [
                  "Crea listas de verificación pre-conversación",
                  "Establece un ambiente propicio para el diálogo",
                  "Prepara recursos de apoyo básicos",
                  "Define tiempos y momentos adecuados"
              ]
          }
      ],
      advanced: [
          {
              title: "Estrategias Avanzadas",
              description: "Técnicas sofisticadas de preparación",
              steps: [
                  "Desarrolla planes de contingencia comunicativa",
                  "Implementa análisis de stakeholders",
                  "Crea mapas de influencia y poder",
                  "Diseña estrategias de comunicación multinivel"
              ]
          }
      ]
  },
  "Comportamiento en la Comunicación": {
      basic: [
          {
              title: "Conductas Básicas",
              description: "Mejora tus comportamientos comunicativos esenciales",
              steps: [
                  "Practica el mantenimiento de contacto visual apropiado",
                  "Desarrolla una postura corporal abierta",
                  "Aprende a modular el tono de voz",
                  "Mantén una expresión facial receptiva"
              ]
          },
          {
              title: "Gestión Emocional",
              description: "Control básico de emociones en la comunicación",
              steps: [
                  "Identifica tus triggers emocionales",
                  "Practica técnicas de respiración para la calma",
                  "Desarrolla respuestas pausadas",
                  "Aprende a manejar la frustración básica"
              ]
          }
      ],
      advanced: [
          {
              title: "Comportamiento Avanzado",
              description: "Dominio de la comunicación interpersonal",
              steps: [
                  "Implementa técnicas de calibración avanzada",
                  "Desarrolla presencia ejecutiva",
                  "Practica la influencia positiva",
                  "Maneja dinámicas de grupo complejas"
              ]
          }
      ]
  }
};

export const getRecommendationsForLevel = (category, score) => {
  const categoryData = recommendations[category];
  const percentageScore = score / 100;

  if (percentageScore < 0.5) {
      return {
          level: "basic",
          recommendations: categoryData.basic
      };
  } else {
      return {
          level: "advanced",
          recommendations: [...categoryData.basic, ...categoryData.advanced]
      };
  }
};