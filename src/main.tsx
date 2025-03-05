import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import InfoArticle from "./components/InfoArticle";
import About from "./Pages/About";
import AllArticles from './components/AllArticles.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
            <Route index element={<AllArticles />} />
            <Route path="/articles/:id" element={<InfoArticle />} />
            <Route path="om" element={<About />} />
            </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
