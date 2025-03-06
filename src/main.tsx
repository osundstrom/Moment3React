import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import InfoArticle from "./components/InfoArticle";
import About from "./Pages/About";
import AllArticles from './components/AllArticles.tsx';
import Login from './Pages/Login.tsx';
import Secret from './Pages/Secret.tsx';
import CheckCookie from './components/CheckCookie.tsx';
import SecretEdit from './Pages/SecretEdit.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
            <Route index element={<AllArticles />} />
            <Route path="/articles/:id" element={<InfoArticle />} />
            <Route path="/om" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route 
                  path="/secret" element={
                    <CheckCookie>
                      <Secret />
                    </CheckCookie>
                  } 
                />

            <Route 
                  path="/secret/redigera/:id" element={
                    <CheckCookie>
                      <SecretEdit />
                    </CheckCookie>
                  } 
                />
               </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
