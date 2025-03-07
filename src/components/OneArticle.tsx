import { useNavigate } from "react-router-dom";
import "../OneArticle.css";

const OneArticle = ({ article }: { article: any,}) => {
    
    

    const navigate = useNavigate();

    //Skicka till sida för den artikeln
    const openArticle = () => {
        navigate(`/articles/${article._id}`);
    }

    //-------------------------------------RETURN----------------------------------------------------//
    return (
        <div id="divOneArt" style={{cursor: 'pointer'}} className="" onClick={openArticle}>
            <div className="card-body">
                <img src={article.image} className="card-img-bottom" alt="..." />
                <h2 className="card-title">{article.title}</h2>
                <p className="card-text">{article.description}</p>
                <p className="card-text"><small className="text-body-secondary">Publicerat: {new Date(article.post_created).toLocaleDateString()} Av: {article.author}</small></p>
            </div>
            
        </div>
        

    )
}

export default OneArticle