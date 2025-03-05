
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface oneArticle {
    _id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    post_created: Date;
    image: string;
  }
  

const InfoArticle = () => {
    
    //----------------------------------States------------------------------------------//
    const {id} = useParams(); //id
    const [article, setArticle] = useState<oneArticle | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null); 
    
    
    useEffect(() => {
    fetchArticle();
    }, [id]);

    console.log(id)
    
    
      //--------------------------------Hämta artiklar-----------------------------------------//
    
      const fetchArticle = async () => {
        //Fetch data från backend
        try {
          setLoading(true); //startar laddning/texten för laddning visas.
    
          const response = await fetch(`http://localhost:3000/article/${id}`);
          const data = await response.json();
    
          //Om reposne ej är ok
          if (!response.ok) {
            throw new Error("fel:" + response.status);
          }
    
          //uppdaterar state med datan
          setArticle(data);
    
        } catch (error) {
          //vid fel
          setError("Fel vid hämtning av artiklar");
        }
        finally { //stoppar laddning, texten för visa att de laddas
          setLoading(false);
        }
      }

    //-------------------------------------RETURN----------------------------------------------------//
    
    if (loading) return <p>Laddar nyheter...</p>;
    if (error) return <p>{error}</p>;
    if (!article) return <p>Finns inga nyheter.</p>;
    
    
    return (
        <div className="container">
            <img src={article.image} className="" alt="..." />
            <hr />
            {error && <p>{error}</p>}
            <h1>{article.title}</h1>
                <p className="">{article.content}</p>
                <p className="">Publicerat: {new Date(article.post_created).toLocaleDateString()} Av: {article.author}</p>
            </div>
            
       

    )
}

export default InfoArticle