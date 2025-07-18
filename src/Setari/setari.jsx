
import { ThemeProvider } from './themeContext';
import ThemeSelector from './themeSelector';


function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-b3 text-text">
       
        <div className="p-8">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Selectează tema
          </h1>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <ThemeSelector />
          </div>
          
      
         
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;