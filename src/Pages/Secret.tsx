import { useState, useEffect } from "react";


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


useEffect(() => {
  fetchArticles();
}, []);


const fetchArticles = async () => {
    try {
      setLoading(true); 

      const response = await fetch("http://localhost:3000/article");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("kunde ej hämta artiklar");
      }

      setArticles(data);
    } catch (error) {
        console.log(error);
        setError("Kan ej hämta artiklar")
    } finally {
      setLoading(false);
    }
  };







//----------------------Return----------------------------------------------------//
    return (
        <div className="container overflow-hidden text-center">
  <div className="row gx-5">
    <div className="col">
     <div className="p-3">{/*Lista alla artiklar*/}
        <h5>Alla artiklar</h5>
        {loading && <p>Läser in nyheter...</p>}
        {error && <p>{error}</p>}
        <div className="row g-4 m-3">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <div key={article._id} className="col-md-4">
                    <p>{article.title}</p>
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

      </div>
    </div>
  </div>
</div>
    );
};

export default Secret;
