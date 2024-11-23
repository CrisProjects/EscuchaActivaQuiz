import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  Clock, 
  HeartHandshake,
  Lightbulb,
  Target,
  Workflow
} from 'lucide-react';

const RecommendationCard = ({ title, description, steps, icon: Icon }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-base mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="h-5 w-5 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm flex-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const categoryIcons = {
  "Atención y Enfoque": Lightbulb,
  "Comprensión y Procesamiento": BookOpen,
  "Retroalimentación": HeartHandshake,
  "Preparación y Planificación": Target,
  "Comportamiento en la Comunicación": Workflow
};

export const DetailedRecommendations = ({ 
  categoryScores, 
  onPracticeStart 
}) => {
  const needsImprovement = categoryScores.filter(
    cat => (cat.score / cat.maxScore) * 100 < 75
  );

  if (needsImprovement.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-medium">
              ¡Excelente! Has demostrado un buen dominio en todas las áreas.
            </p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Continúa practicando para mantener tus habilidades.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {needsImprovement.map(({ name, score, maxScore }) => {
          const percentage = Math.round((score / maxScore) * 100);
          const Icon = categoryIcons[name] || Lightbulb;
          
          const recommendations = {
            "Atención y Enfoque": {
              title: "Mejora tu Concentración",
              description: "Ejercicios prácticos para desarrollar tu atención",
              steps: [
                "Practica meditación mindfulness 10 minutos diarios",
                "Establece un espacio libre de distracciones",
                "Usa técnicas de respiración consciente",
                "Implementa la regla de los 5 segundos"
              ]
            },
            "Comprensión y Procesamiento": {
              title: "Mejora tu Comprensión",
              description: "Estrategias para mejorar tu procesamiento de información",
              steps: [
                "Lee resúmenes de libros",
                "Practica ejercicios de memoria",
                "Usa mapas mentales para organizar ideas",
                "Realiza ejercicios de lectura rápida"
              ]
            },
            "Retroalimentación": {
              title: "Mejora tu Feedback",
              description: "Estrategias para dar y recibir retroalimentación efectiva",
              steps: [
                "Aplica la técnica del sándwich",
                "Usa frases en primera persona",
                "Practica la escucha activa",
                "Valida emociones antes de responder"
              ]
            },
            "Preparación y Planificación": {
              title: "Optimiza tu Preparación",
              description: "Métodos para planificar mejor tus comunicaciones",
              steps: [
                "Crea checklist pre-conversación",
                "Establece objetivos SMART",
                "Prepara preguntas clave",
                "Anticipa posibles escenarios"
              ]
            },
            "Comportamiento en la Comunicación": {
              title: "Mejora tu Comportamiento",
              description: "Pautas para una comunicación más efectiva",
              steps: [
                "Practica el control de impulsos",
                "Desarrolla consciencia corporal",
                "Implementa pausas estratégicas",
                "Cultiva la empatía activa"
              ]
            }
          };

          return (
            <RecommendationCard
              key={name}
              icon={Icon}
              title={recommendations[name].title}
              description={`${name}: ${percentage}% de dominio`}
              steps={recommendations[name].steps}
            />
          );
        })}
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-base mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Plan de Práctica Sugerido
          </h3>
          <div className="space-y-2 mb-4">
            <p className="text-sm text-muted-foreground">
              Dedica 15-20 minutos diarios a practicar estas habilidades.
              Comienza con el área de menor puntaje y progresa gradualmente.
            </p>
          </div>
          <Button 
            className="w-full" 
            onClick={onPracticeStart}
          >
            Comenzar Plan de Práctica
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};