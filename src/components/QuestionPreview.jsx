import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const QuestionPreview = ({ 
  questions, 
  currentQuestion, 
  onQuestionClick, 
  answers 
}) => {
  const getAnswerText = (value) => {
    const options = {
      4: 'La mayoría de las veces',
      3: 'Frecuentemente',
      2: 'Ocasionalmente',
      1: 'Casi nunca'
    };
    return options[value] || '';
  };

  return (
    <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card 
            key={question.id}
            className={cn(
              "p-4 cursor-pointer hover:bg-accent/50 transition-colors",
              currentQuestion === index && "border-2 border-primary"
            )}
            onClick={() => onQuestionClick(index)}
          >
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm">
                    Pregunta {index + 1}
                  </span>
                  {answers[question.id] && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {getAnswerText(answers[question.id])}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {question.text}
                </p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {question.category}
                  </span>
                  {question.isReverse && (
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                      Inversa
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};