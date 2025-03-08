import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";


//rediger artikel
const EditArticle = () => {

  //------------------------------------STates-------------------------------------------------//
    const { id } = useParams(); 
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();//navigering

//-------------------------------------useEffect------------------------------------------------//
useEffect(() => {
    const fetchArticle = async () => { //fetcha artikel
        try {
          const response = await fetch(`https://moment3backend.onrender.com/article/${id}`);
          const data = await response.json();
  
          if (response.ok) { //om response ok, sätter state
            setTitle(data.title);
            setDescription(data.description);
            setContent(data.content);
            setAuthor(data.author);
            setImage(data.image);
          } else {
            throw new Error(data.error || "Kunde ej hämta"); //vid error
          }
        } catch (error: any) {
          setError(error.message || "Kunde ej hämta"); //vid error
        }
      };
      fetchArticle(); //kör fetchArticle
    }, [id]); //om id ändras kör om


//------------------------Bild hanterare/filereader---------------------------------------------------------//

const imageReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; //? null

    const maxSize = 500*1024; //storlek på bild, max 500kb
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
        //Läs in bild
        const reader = new FileReader();
        reader.readAsDataURL(file); 

        reader.onload = () => {
        if (reader.result) {
            setImage(reader.result as string); //sätter bilden i state
        }
    }
    }catch(error: any) {
        setError(error.message || "Error vid läsning av fil")
    }
}   
}
//----------------------------------------PUT-------------------------------------//

  const postEditArticle = async (e: React.FormEvent) => {
    e.preventDefault(); //förhindra default
    
    //om något fält är tomt
    if (!title || !description || !content || !image || !author) {
      setError("Alla fält måste vara ifyllda");
      return;
    }
    
    try {
      //Objekt för artikel
      const updatedArticle = {
        title,
        description,
        content,
        author,
        image,
      };
  
      const token = Cookies.get("token"); //Token från cookie
      console.log(token);
      
      //Om ingen token
      if (!token) {
        setError("Ingen token");
        navigate("/login");
        return;
      }
      
      //PUT
      const response = await fetch(`https://moment3backend.onrender.com/article/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(updatedArticle),
      });
  
      const data = await response.json();
      
      //Om response ej ok
      if (!response.ok) {
        throw new Error(data.error || "Error vid uppdatering av artikel");
      }
  
      navigate("/secret");
  
    } catch (error: any) { //vid error
      setError(error.message || "Error vid förfrågan");
      console.log(error);
    }};

//---------------------------------------delete--------------------------------------//
const deleteArticle = async () => {

      const token = Cookies.get("token"); //Token från cookie
  
      if (!token) { //om ingen token
        setError("Ingen token"); //status error
        navigate("/login"); //navigering
        return;
      }
       try {
      //DELETE
      const response = await fetch(`https://moment3backend.onrender.com/article/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //token
        },
        });

      const data = await response.json();
      
      //Om response ej ok
      if (!response.ok) {
        throw new Error(data.error || "Kunde ej radera");
      }
  
      navigate("/secret") //navigering
  
    } catch (error: any) { //vid error
      setError(error.message || "Error vid radering");
      console.log(error);
    }};





  //-----------------------------------------------------------------------------//

  return (
    <div className="container">
      <h2>Redigera Artikel </h2>
      
    {/*Error meddelanden*/}
    {error && <p className="text-danger">{error}</p>}

      {/*formulär för edit*/}
      <form className="" onSubmit={postEditArticle} style={{ textAlign: "left" }}>
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Rubrik:</label>
              <input
                className="form-control"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} //uppdatera state med nya värdet
                required
              />
            </div>
    
            <div className="mb-3">
              <label className="form-label" htmlFor="description">Beskrivning:</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} //uppdateras state
                required
              />
            </div>
    
            <div className="mb-3">
              <label className="form-label" htmlFor="content">Innehåll:</label>
              <textarea
                className="form-control"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)} //uppdatera state
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="author">Författare:</label>
              <input
                className="form-control"
                id="author"
                value={author +" " + "(Låst)"} //låst, kan ej ändra författare
                disabled
              />
            </div>

            <div className="mb-3">
                {/*Ladda upp bild, visa vilken bild som är vald */}
                {image && <img src={image} alt="Current" width="100" />}
                <input className="form-control"  id="image" type="file" accept="image/*" onChange={imageReader} />
            </div>
    
            {error && <p className="error">{error}</p>}
    
            <button className="btn btn-success" type="submit">
            &#128190; Spara
            </button >
          </form>
          <hr />
          <div className="container" style={{ textAlign: "center" }}>
          <h6>Radera artikeln helt, detta går inte att ångra!</h6>
          {/*deleteArticle vid klick*/}
      <button onClick={deleteArticle} className="btn btn-danger mt-3">
      &#128465; Ta bort
      </button>
      </div>
      <hr />
    </div>
  );
};

export default EditArticle;