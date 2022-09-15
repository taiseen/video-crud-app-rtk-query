import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AddVideo, EditVideo, Footer, Navigation } from "./components";
import SingleVideoOpen from './pages/SingleVideoOpen';
import Home from './pages/Home';


function App() {
    return (
        <Router>

            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/videos/:videoId" element={<SingleVideoOpen />} />
                <Route path="/videos/add" element={<AddVideo />} />
                <Route path="/videos/edit/:videoId" element={<EditVideo />} />
            </Routes>

            <Footer />

        </Router>
    );
}

export default App;
