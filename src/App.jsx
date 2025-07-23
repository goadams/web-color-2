import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accessibility from './pages/Accessibility';
import ColorPalettes from './pages/ColorPalettes';
import Gradients from './pages/Gradients';
import RandomColor from './pages/RandomColor';
import Home from './pages/Home';
import { ThemeProvider } from "./context/ThemeContext.jsx";


const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/web-color-2/" element={<Home />} />
                    <Route path="/web-color-2/random-color" element={<RandomColor />} />
                    <Route path="/web-color-2/color-palettes" element={<ColorPalettes />} />
                    <Route path="/web-color-2/gradient-creator" element={<Gradients />} />
                    <Route path="/web-color-2/contrast-checker" element={<Accessibility />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;