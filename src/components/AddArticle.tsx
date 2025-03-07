import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const AddArticle = ({onAdded}: {onAdded: () => void}) => {
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


    const navigate = useNavigate();


//------------------------Bild hanterare/filereader---------------------------------------------------------//

const imageReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; //? null

    const maxSize = 500*1024;
    if(file) {
    if(file.size > maxSize) { //om bild är för stor
        setError("Fil är för stor, max 500kb");
        setImage("");
        e.target.value = "";
        return;
    }

    if (!file.type.startsWith("image/")) { //om det ej är en bild
        setError("Endast bildfiler tillåtna");
        setImage("");
        e.target.value = "";
        return;
     }

     try{
        const reader = new FileReader();
        reader.readAsDataURL(file); 

        reader.onload = () => {
        if (reader.result) {
            setImage(reader.result as string); 
        }
    }
    }catch(error: any) {
        setError(error.message || "Error vid läsning av fil")
    }
}   
}
//-----------------------------------------------------------------------------//

    const postAddArticle = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !content  || !image || !author ) {
            setError("Alla fält måste vara ifyllda");
            return;
          }

       try {

        const oneArticle = {
            title,
            description,
            content,
            author,
            image,
          };
      
        const token = Cookies.get("token");
          console.log(token)
        if (!token) {
            setError("Ingen token");
            return;
        }

        const response = await fetch("http://localhost:3000/article", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 

            },
            body: JSON.stringify(oneArticle),
          })
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error);
          }

          setTitle("");
          setDescription("");
          setContent("");
          setAuthor("");
          setImage("");

          onAdded();

          navigate("/secret");
         
          

       }catch(error: any) {
        setError(error.message || "Error vid föfrågan")
        console.log(error)
       }

//------------------------------------------------------------------------//

};
    return (
        <div className="container">
            <hr />
          <form className="" onSubmit={postAddArticle} style={{ textAlign: "left" }}>
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Rubrik:</label>
              <input
                className="form-control"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
    
            <div className="mb-3">
              <label className="form-label" htmlFor="description">Beskrivning:</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
    
            <div className="mb-3">
              <label className="form-label" htmlFor="content">Innehåll:</label>
              <textarea
                className="form-control"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="author">Författare:</label>
              <input
                className="form-control"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="image">Bild:</label>
                <input className="form-control" id="image" type="file" accept="image/*" onChange={imageReader} />
            </div>



    
            {error && <p className="error">{error}</p>}
    
            <button className="btn btn-success" type="submit">
            &#128190; Spara
            </button>
          </form>
        </div>
      );
};
    
export default AddArticle;