import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accessibility from './pages/Accessibility';
import ColorPalettes from './pages/ColorPalettes';
import Gradients from './pages/Gradients';
import RandomColor from './pages/RandomColor';
import Home from './pages/Home';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random-color" element={<RandomColor />} />
                <Route path="/color-palettes" element={<ColorPalettes />} />
                <Route path="/gradient-creator" element={<Gradients />} />
                <Route path="/contrast-checker" element={<Accessibility />} />
            </Routes>
        </Router>
    );
};

export default App;