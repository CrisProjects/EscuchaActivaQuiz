import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/ThemeToggle";
import { EscuchaActivaQuiz } from './components/EscuchaActivaQuiz';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="escucha-activa-theme">
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Test de Escucha Activa</h1>
            <ThemeToggle />
          </div>
          <EscuchaActivaQuiz />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;