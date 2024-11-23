import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailedResults } from './DetailedResults';

import { questions } from '../data/questions';
import { categories, getCategoryLevel } from '../data/categories';
import { recommendations } from '../data/recommendations';

// QuestionView Component (mantener el mismo código)
const QuestionView = ({ question, onAnswer, currentAnswer }) => {
  const options = [
    'La mayoría de las veces',
    'Frecuentemente',
    'Ocasionalmente',
    'Casi nunca'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-accent/20 p-4 rounded-lg">
        <p className="text-lg">{question.text}</p>
        <div className="mt-2">
          <span className="text-xs bg-accent px-2 py-1 rounded">
            {question.category}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button
            key={option}
            onClick={() => onAnswer(4 - index)}
            variant={currentAnswer === (4 - index) ? "default" : "outline"}
            className="w-full h-auto py-4 px-6 text-sm"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

// QuestionPreview Component (mantener el mismo código)
const QuestionPreview = ({ questions, currentQuestion, onQuestionClick, answers }) => {
  const getAnswerText = (value) => {
    const options = {
      4: 'La mayoría de las veces',
      3: 'Frecuentemente',
      2: 'Ocasionalmente',
      1: 'Casi nunca'
    };
    return options[value];
  };

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-4 p-4">
        {questions.map((question, index) => (
          <Card
            key={question.id}
            className={`
              cursor-pointer transition-all hover:shadow-md
              ${currentQuestion === index ? 'border-2 border-primary' : ''}
            `}
            onClick={() => onQuestionClick(index)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Pregunta {index + 1}</span>
                    {question.isReverse && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                        Inversa
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{question.text}</p>
                  <div className="mt-2">
                    <span className="text-xs bg-accent/30 px-2 py-1 rounded">
                      {question.category}
                    </span>
                  </div>
                </div>
                {answers[question.id] && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap">
                    {getAnswerText(answers[question.id])}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

// Componente principal actualizado
export const EscuchaActivaQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion + 1]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateCategoryScore = (category) => {
    let total = 0;
    categories[category].questionIds.forEach(questionId => {
      const answer = answers[questionId];
      if (answer) {
        const question = questions.find(q => q.id === questionId);
        if (question) {
          total += question.isReverse ? (5 - answer) : answer;
        }
      }
    });
    return total;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setShowPreview(false);
  };

  if (showResults) {
    const categoryScores = Object.keys(categories).map(categoryName => {
      const maxScore = categories[categoryName].maxScore;
      const score = calculateCategoryScore(categoryName);
      return {
        name: categoryName,
        score,
        maxScore,
        recommendations: recommendations[categoryName] || []
      };
    });

    const totalScore = categoryScores.reduce((acc, curr) => acc + curr.score, 0);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Resultados de tu Evaluación</CardTitle>
          </CardHeader>
          <CardContent>
            <DetailedResults 
              categoryScores={categoryScores}
              totalScore={totalScore}
            />
            <Button 
              onClick={resetQuiz} 
              className="w-full mt-6"
            >
              Realizar el test nuevamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            Pregunta {currentQuestion + 1} de {questions.length}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </CardHeader>
        <CardContent>
          <Progress
            value={(currentQuestion / questions.length) * 100}
            className="mb-6"
          />
          <AnimatePresence mode="wait">
            {showPreview ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <QuestionPreview
                  questions={questions}
                  currentQuestion={currentQuestion}
                  onQuestionClick={setCurrentQuestion}
                  answers={answers}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <QuestionView
                  question={questions[currentQuestion]}
                  onAnswer={handleAnswer}
                  currentAnswer={answers[currentQuestion + 1]}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(curr => curr - 1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <Button
          variant="outline"
          disabled={currentQuestion === questions.length - 1}
          onClick={() => setCurrentQuestion(curr => curr + 1)}
        >
          Siguiente
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};