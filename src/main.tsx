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
    <BrowserRouter> {/*routing i webb*/}
        <Routes> {/*alla rutter*/}
            <Route path="/" element={<App />}> {/*route för startsida*/}
            <Route index element={<AllArticles />} /> {/*vid "/" standard, så ladda komponent AllArticles */}
            <Route path="/articles/:id" element={<InfoArticle />} /> {/*route för specifik artikel baserat på id*/}
            <Route path="/om" element={<About />} /> {/*route för om sidan*/}
            <Route path="/login" element={<Login />} /> {/*route för inlogg*/}
            <Route  
                  path="/secret" element={ //skyddad route för secret sidan, krävs att det finns en cookie med token
                    <CheckCookie> {/*kollar om de finns en cookie med token/jwt*/}
                      <Secret />
                    </CheckCookie>
                  } 
                />

            <Route 
                  path="/secret/redigera/:id" element={ // skyddad route för redigera artikel, krävs att det finns en cookie med token
                    <CheckCookie>  {/*kollar om de finns en cookie med token/jwt*/}
                      <SecretEdit />
                    </CheckCookie>
                  } 
                />
               </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
