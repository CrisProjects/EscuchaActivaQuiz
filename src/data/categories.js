export const categories = {
    "Atención y Enfoque": {
      questionIds: [1, 2, 6, 10, 14, 27],
      description: "Capacidad para mantener el foco y la concentración durante la comunicación",
      maxScore: 24, // 6 preguntas * 4 puntos máximos
      levels: {
        excellent: {
          range: [20, 24],
          description: "Excelente capacidad para mantener la atención y evitar distracciones"
        },
        good: {
          range: [16, 19],
          description: "Buena capacidad de atención con ocasionales pérdidas de foco"
        },
        needsWork: {
          range: [0, 15],
          description: "Área que requiere desarrollo para mejorar la concentración"
        }
      }
    },
    "Comprensión y Procesamiento": {
      questionIds: [3, 7, 12, 13, 15],
      description: "Habilidad para entender y procesar la información recibida",
      maxScore: 20, // 5 preguntas * 4 puntos máximos
      levels: {
        excellent: {
          range: [17, 20],
          description: "Excelente capacidad de comprensión y análisis"
        },
        good: {
          range: [14, 16],
          description: "Buena capacidad de procesamiento con áreas de mejora"
        },
        needsWork: {
          range: [0, 13],
          description: "Necesita desarrollar habilidades de comprensión"
        }
      }
    },
    "Retroalimentación": {
      questionIds: [4, 28, 29, 30],
      description: "Capacidad para proporcionar y recibir feedback efectivo",
      maxScore: 16, // 4 preguntas * 4 puntos máximos
      levels: {
        excellent: {
          range: [14, 16],
          description: "Excelente manejo de la retroalimentación"
        },
        good: {
          range: [11, 13],
          description: "Buen manejo del feedback con espacio para mejora"
        },
        needsWork: {
          range: [0, 10],
          description: "Área que requiere desarrollo significativo"
        }
      }
    },
    "Preparación y Planificación": {
      questionIds: [17, 18, 19, 20, 21],
      description: "Capacidad para prepararse y organizar la comunicación",
      maxScore: 20, // 5 preguntas * 4 puntos máximos
      levels: {
        excellent: {
          range: [17, 20],
          description: "Excelente preparación y planificación comunicativa"
        },
        good: {
          range: [14, 16],
          description: "Buena planificación con aspectos a mejorar"
        },
        needsWork: {
          range: [0, 13],
          description: "Necesita desarrollar habilidades de planificación"
        }
      }
    },
    "Comportamiento en la Comunicación": {
      questionIds: [5, 8, 9, 22, 23, 24, 25, 26],
      description: "Conductas y actitudes durante el proceso comunicativo",
      maxScore: 32, // 8 preguntas * 4 puntos máximos
      levels: {
        excellent: {
          range: [27, 32],
          description: "Comportamiento comunicativo excelente"
        },
        good: {
          range: [22, 26],
          description: "Buen comportamiento comunicativo con áreas de mejora"
        },
        needsWork: {
          range: [0, 21],
          description: "Necesita mejorar patrones de comportamiento"
        }
      }
    }
  };
  
  // Función auxiliar para obtener el nivel de una categoría
  export const getCategoryLevel = (categoryName, score) => {
    const category = categories[categoryName];
    const { levels } = category;
  
    for (const [level, { range }] of Object.entries(levels)) {
      if (score >= range[0] && score <= range[1]) {
        return {
          level,
          description: levels[level].description
        };
      }
    }
  };
  
  // Función para calcular el porcentaje de progreso en una categoría
  export const getCategoryProgress = (categoryName, score) => {
    const category = categories[categoryName];
    return (score / category.maxScore) * 100;
  };
  
  // Obtener el total máximo posible
  export const getTotalMaxScore = () => {
    return Object.values(categories).reduce((total, category) => total + category.maxScore, 0);
  };
  
  // Función para determinar si una categoría necesita mejora
  export const needsImprovement = (categoryName, score) => {
    const category = categories[categoryName];
    const percentage = (score / category.maxScore) * 100;
    return percentage < 75;
  };