import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AddArticle from "../components/AddArticle";
import { Link, useNavigate } from "react-router-dom";
import "../secret.css";

//-----------------Interface--------------------------------------------------------//

interface OneArticle {
    _id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    post_created: Date;
    image: string;
  }


//-----------------Secret--------------------------------------------------//

const Secret = () => {

//----------------------------------States------------------------------------------//
const [articles, setArticles] = useState<OneArticle[] | []>([]);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null); 
const navigate = useNavigate();

useEffect(() => {
  const token = Cookies.get("token"); //token/jwt från coockies

  console.log( token); 
  if (!token) { //om ogilitg token
    navigate("/Login");
  } 
  
  fetchArticles();//hämtar artiklar
  
  
}, [navigate]);//om navigate ändras kör om

//----------------------------------Fetch------------------------------------------//

const fetchArticles = async () => {
    try {
      setLoading(true); //start loading

      const response = await fetch("https://moment3backend.onrender.com/article");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("kunde ej hämta artiklar");
      }

      setArticles(data); //uppdatera state med data
    } catch (error) {
        console.log(error);
        setError("Kan ej hämta artiklar") //vid fel
    } finally {
      setLoading(false); //sluta laddnings text
    }
  };


//----------------------Return----------------------------------------------------//
    return (
        <div className="container overflow-hidden text-center">
  <div className="row gx-5">
    <div className="col-12 col-md-6">
     <div className="p-3">
        <h5>Alla artiklar</h5>
        <hr />
        {/*loading och error meddelanden*/}
        {loading && <p>Läser in nyheter...</p>}
        {error && <p>{error}</p>}
        <div className="row g-1 m-1">
              {articles.length > 0 ? ( //Om artiklar finns
                articles.map((article) => ( //Lista alla artiklar
                  <div key={article._id} className="col-12">
                    <Link className="aArticles" to={`/secret/redigera/${article._id}`}>&#9998;{article.title}</Link>
                    <p className="pArticles">{new Date(article.post_created).toLocaleDateString() + " - " + article.author}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Inga artiklar tillgängliga.</p>
              )}
            </div>
     </div>
    </div>
    <div className="col">
      <div className="p-3">{/*Formulär för att lägga till artiklar*/}
        <h5>Lägg till</h5>
        <AddArticle onAdded={fetchArticles}/> {/*lägg till komonent, skickar med fetchArticels till secret.)*/}
      </div>
    </div>
  </div>
</div>
    );
};

export default Secret;
