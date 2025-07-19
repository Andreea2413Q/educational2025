import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/header";
import Home from "./Home/home";
import Palete from "./Palete/Palete";

import Teorie from "./Teorie/teorie";
import TeorieFundamentale from "./Teorie/fundamentale";
import Psihologie from "./Teorie/psihologie";
import Armonie from "./Teorie/armonie";
import Design from "./Teorie/design";
import Simboluri from "./Teorie/simboluri";
import Perceptia from "./Teorie/perceptie";
import Temperatura from "./Teorie/temperatura";
import Natura from "./Teorie/natura";
import Accesibilitate from "./Teorie/accesibilitate";
import Contrast from "./Teorie/contrast";

import Quiz from "./Quiz/quiz";

import Cont from "./Cont/cont";
import Note from "./Note/note";

import Joc from "./Joc/joc";
import Wolearn from "./Joc/wolearn";
import Rgb from "./Joc/rgb";
import ColorCircle from "./Joc/color-circle";
import MemoryGame from "./Joc/memori-game";


import Contact from "./Contact/Contact";

import { AuthProvider } from "./Cont/authContext";

import Ai from './AI/ai'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/palete" element={<Palete />} />

          <Route path="/teorie" element={<Teorie />} />
          <Route path="/teorie/fundamentale" element={<TeorieFundamentale />} />
          <Route path="/teorie/psihologie" element={<Psihologie />} />
          <Route path="/teorie/armonie" element={<Armonie />} />
          <Route path="/teorie/design" element={<Design />} />
          <Route path="/teorie/simboluri" element={<Simboluri />} />
          <Route path="/teorie/perceptia" element={<Perceptia />} />
          <Route path="/teorie/temperatura" element={<Temperatura />} />
          <Route path="/teorie/natura" element={<Natura />} />
          <Route path="/teorie/accesibilitate" element={<Accesibilitate />} />
          <Route path="/teorie/contrast" element={<Contrast />} />

          <Route path="/quiz" element={<Quiz />} />

          <Route path="/joc" element={<Joc />} />
          <Route path="/joc/wolearn" element={<Wolearn />} />
          <Route path="joc/rgb" element={<Rgb />} />
          <Route path="/joc/color-circle" element={<ColorCircle />} />
          <Route path="/joc/memory-game" element={<MemoryGame />} />

          <Route path="/note" element={<Note />} />
          <Route path="/cont" element={<Cont />} />
          <Route path="/contact" element={<Contact />} />
           <Route path="/ai" element={<Ai />} />


        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
