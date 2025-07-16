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
                <Route path="/random" element={<RandomColor />} />
                <Route path="/palettes" element={<ColorPalettes />} />
                <Route path="/gradients" element={<Gradients />} />
                <Route path="/accessibility" element={<Accessibility />} />
            </Routes>
        </Router>
    );
};

export default App;