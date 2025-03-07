import { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import OneArticle from "./OneArticle";


//-----------------Interface--------------------------------------------------------//

interface oneArticle {
    _id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    post_created: Date;
    image: string;
  }
  


  const AllArticles = () => {

//----------------------------------States------------------------------------------//
const [articles, setArticles] = useState<oneArticle[] | []>([]); 
const [loading, setLoading] = useState<boolean>(false); 
const [error, setError] = useState<string | null>(null); 


useEffect(() => {
fetchArticles();
}, []);


  //--------------------------------Hämta artiklar-----------------------------------------//

  const fetchArticles = async () => {
    //Fetch data från backend
    try {
      setLoading(true); //startar laddning/texten för laddning visas.

      const response = await fetch("http://localhost:3000/article");
      const data = await response.json();

      //Om reposne ej är ok
      if (!response.ok) {
        throw new Error("fel:" + response.status);
      }

      //uppdaterar state med datan
      setArticles(data);

    } catch (error) {
      //vid fel
      setError("Fel vid hämtning av artiklar");
    }
    finally { //stoppar laddning, texten för visa att de laddas
      setLoading(false);
    }
  }

//--------------------------------------------------------------------------------//

  
return (
    <>
      
      <main className="container text-center mainFull">
        <br />
        <h1 style={{ textAlign: "left", marginLeft: "2%" }}>Nyheter</h1>
        <hr />

        {loading && <p>Läser in nyheter...</p>}
        {error && <p>{error}</p>}

        <div className="row g-4 m-3">
        {articles.map(article => (
            <OneArticle key={article._id} article={article} />
        ))}
      </div>

      </main>
    </>
  )
}
export default AllArticles
