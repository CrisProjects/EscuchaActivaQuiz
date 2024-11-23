import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, XCircle, BookOpen, Target, Brain, HeartHandshake, Users } from 'lucide-react';

// Mapeo de nombres cortos a nombres completos de categorías
const categoryNames = {
  "Atención y Enfoque": "Capacidad de Atención y Enfoque",
  "Comprensión y Procesamiento": "Comprensión y Procesamiento de Información",
  "Retroalimentación": "Capacidad de Retroalimentación",
  "Preparación y Planificación": "Preparación y Planificación de la Comunicación",
  "Comportamiento en la Comunicación": "Comportamiento durante la Comunicación"
};

// Iconos por categoría
const categoryIcons = {
  "Atención y Enfoque": Brain,
  "Comprensión y Procesamiento": BookOpen,
  "Retroalimentación": HeartHandshake,
  "Preparación y Planificación": Target,
  "Comportamiento en la Comunicación": Users
};

// Interpretaciones generales basadas en el puntaje total
const getGeneralInterpretation = (totalScore) => {
  if (totalScore >= 105) {
    return {
      level: "Óptimo",
      description: "Has demostrado excelentes habilidades de escucha activa. Tu capacidad para atender, comprender y responder efectivamente te convierte en un comunicador destacado.",
      recommendation: "Continúa practicando y compartiendo tus habilidades con otros. Podrías considerar mentorear a otros en el desarrollo de estas capacidades.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    };
  }
  if (totalScore >= 89) {
    return {
      level: "Bueno",
      description: "Tienes una sólida base en escucha activa. Demuestras buenas habilidades en la mayoría de las áreas de comunicación.",
      recommendation: "Enfócate en perfeccionar las áreas específicas donde aún hay espacio para mejora para alcanzar un nivel óptimo.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    };
  }
  if (totalScore >= 73) {
    return {
      level: "Regular",
      description: "Muestras un nivel básico de escucha activa. Hay áreas específicas que requieren atención y desarrollo.",
      recommendation: "Practica conscientemente las habilidades de escucha en tus interacciones diarias, prestando especial atención a las áreas que necesitan mejora.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    };
  }
  if (totalScore >= 57) {
    return {
      level: "Básico",
      description: "Tu escucha activa necesita desarrollo. Hay oportunidades significativas para mejorar en varias áreas.",
      recommendation: "Considera tomar un curso o taller específico sobre escucha activa y comienza a practicar las habilidades básicas de manera consciente.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    };
  }
  return {
    level: "Necesita Mejorar",
    description: "Tus habilidades de escucha activa requieren atención inmediata y desarrollo sistemático.",
    recommendation: "Comienza por trabajar en las habilidades fundamentales de escucha y busca orientación profesional si es posible.",
    color: "text-red-600",
    bgColor: "bg-red-50"
  };
};

// Componente para el resumen general
const GeneralOverview = ({ totalScore, categoryScores }) => {
  const interpretation = getGeneralInterpretation(totalScore);
  const maxPossibleScore = 120;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  return (
    <div className="space-y-6">
      <Card className={`${interpretation.bgColor} border-l-4 border-l-${interpretation.color.replace('text-', '')}`}>
        <CardContent className="pt-6">
          <h3 className={`text-2xl font-bold mb-2 ${interpretation.color}`}>
            Nivel: {interpretation.level}
          </h3>
          <p className="text-gray-700 mb-2">{interpretation.description}</p>
          <div className="my-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Puntaje Total</span>
              <span className={`font-bold ${interpretation.color}`}>
                {totalScore} / {maxPossibleScore} ({percentage}%)
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg">
            <h4 className="font-medium mb-2">Recomendación General:</h4>
            <p className="text-gray-600">{interpretation.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Resultados por Categoría</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryScores} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <XAxis 
                  dataKey="name" 
                  interval={0}
                  angle={-45} 
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 shadow-md rounded border">
                          <p className="font-medium">{categoryNames[data.name]}</p>
                          <p className="text-sm text-gray-600">
                            Puntaje: {data.score} / {data.maxScore}
                          </p>
                          <p className="text-sm text-gray-600">
                            ({Math.round((data.score / data.maxScore) * 100)}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente para el detalle por categoría
const CategoryDetail = ({ category, score, maxScore }) => {
  const Icon = categoryIcons[category] || Brain;
  const percentage = Math.round((score / maxScore) * 100);
  let status, statusColor, statusIcon;

  if (percentage >= 75) {
    status = "Dominado";
    statusColor = "text-green-600";
    statusIcon = <CheckCircle2 className="h-5 w-5 text-green-600" />;
  } else if (percentage >= 50) {
    status = "En Desarrollo";
    statusColor = "text-yellow-600";
    statusIcon = <AlertCircle className="h-5 w-5 text-yellow-600" />;
  } else {
    status = "Necesita Atención";
    statusColor = "text-red-600";
    statusIcon = <XCircle className="h-5 w-5 text-red-600" />;
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{categoryNames[category]}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Esta categoría evalúa tu capacidad de {category.toLowerCase()}
                </p>
              </div>
              <span className={`font-medium ${statusColor}`}>
                {score} / {maxScore}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progreso</span>
                <span>{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>

            <div className="flex items-center gap-2 mt-4">
              {statusIcon}
              <span className={`text-sm ${statusColor}`}>{status}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente principal
export const DetailedResults = ({ categoryScores, totalScore }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="details">Detalles</TabsTrigger>
        <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <GeneralOverview 
          totalScore={totalScore}
          categoryScores={categoryScores}
        />
      </TabsContent>

      <TabsContent value="details" className="mt-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Análisis Detallado por Categoría</h2>
          {categoryScores.map(({ name, score, maxScore }) => (
            <CategoryDetail
              key={name}
              category={name}
              score={score}
              maxScore={maxScore}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="recommendations" className="mt-6">
        <div className="space-y-6">
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Plan de Mejora Personalizado</h3>
              <div className="space-y-4">
                {categoryScores
                  .filter(({ score, maxScore }) => (score / maxScore) * 100 < 75)
                  .map(({ name, score, maxScore }) => {
                    const percentage = Math.round((score / maxScore) * 100);
                    return (
                      <div key={name} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium flex items-center gap-2">
                          {categoryIcons[name] && React.createElement(categoryIcons[name], { className: "h-4 w-4" })}
                          {categoryNames[name]}
                          <span className="text-sm text-gray-500">({percentage}%)</span>
                        </h4>
                        <ul className="mt-2 space-y-2">
                          {/* Aquí puedes agregar recomendaciones específicas */}
                          <li className="text-sm text-gray-600">• Practica ejercicios específicos de {name.toLowerCase()}</li>
                          <li className="text-sm text-gray-600">• Establece metas semanales para mejorar en esta área</li>
                          <li className="text-sm text-gray-600">• Busca oportunidades para aplicar estas habilidades en tu día a día</li>
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};