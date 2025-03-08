import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


//lägg till artikel
const AddArticle = ({ onAdded }: { onAdded: () => void }) => {

  //states
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  //Hook navigering
  const navigate = useNavigate();


  //------------------------Bild hanterare/filereader---------------------------------------------------------//

  const imageReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; //, hämta vald fil.

    const maxSize = 500 * 1024; //storlek på bild, max 500kb
    if (file) {
      if (file.size > maxSize) { //om bild är för stor
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

      try {
        //Läs in bild
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          if (reader.result) {
            setImage(reader.result as string); //sätter bilden state
          }
        }
      } catch (error: any) {
        setError(error.message || "Error vid läsning av fil")
      }
    }
  }
  //----------------------------------------POST-------------------------------------//

  //Funktion för posta artikel
  const postAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    //kollar så att alla fällt är fyllda
    if (!title || !description || !content || !image || !author) {
      setError("Alla fält måste vara ifyllda");
      return;
    }

    try {
      //Objekt för artikel
      const oneArticle = { 
        title,
        description,
        content,
        author,
        image,
      };

      const token = Cookies.get("token"); //jwt från cookie
      console.log(token)
      if (!token) {
        setError("Ingen token");
        return;
      }
      //Post förfrågan med token
      const response = await fetch("https://moment3backend.onrender.com/article", {
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

      //tömmer fält
      setTitle("");
      setDescription("");
      setContent("");
      setAuthor("");
      setImage("");

      onAdded(); //uppdatera om listan direkt.

      navigate("/secret"); //navigering



    } catch (error: any) {
      setError(error.message || "Error vid föfrågan")
      console.log(error)
    }

    //------------------------------------------Return------------------------------//

  };
  return (
    <div className="container">
      <hr />
      {/* Formulär, kör postAddArticle vid submit*/}
      <form className="" onSubmit={postAddArticle} style={{ textAlign: "left" }}>
        <div className="mb-3">
          <label className="form-label" htmlFor="title">Rubrik:</label>
          <input
            className="form-control"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} //updatera state med nya
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="description">Beskrivning:</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}//updatera state med nya värdet
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="content">Innehåll:</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)} //updatera state med nya värdet
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="author">Författare:</label>
          <input
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} //updatera state med nya värdet
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="image">Bild:</label>
          <input className="form-control" id="image" type="file" accept="image/*" onChange={imageReader} /> 
        </div>



        {/*felmeddelanden */}
        {error && <p className="error">{error}</p>}

        <button className="btn btn-success" type="submit">
          &#128190; Spara
        </button>
      </form>
    </div>
  );
};

export default AddArticle;