import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkCodeHome from './components/DarkCodeHome'
import AboutPage from './components/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DarkCodeHome />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
