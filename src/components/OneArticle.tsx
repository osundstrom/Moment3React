import { useNavigate } from "react-router-dom";

const OneArticle = ({ article }: { article: any,}) => {
    
    

    const navigate = useNavigate();

    //Skicka till sida för den artikeln
    const openArticle = () => {
        navigate(`/articles/${article._id}`);
    }

    //-------------------------------------RETURN----------------------------------------------------//
    return (
        <div className="card" onClick={openArticle}>
            <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <img src={article.image} className="card-img-bottom" alt="..." />
                <p className="card-text"><small className="text-body-secondary">Publicerat: {new Date(article.post_created).toLocaleDateString()} Av: {article.author}</small></p>
            </div>
        </div>
        

    )
}

export default OneArticle