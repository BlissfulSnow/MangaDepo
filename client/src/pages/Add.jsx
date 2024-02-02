import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book, setBook] = useState({
    mangaTitle: "",
    mangaDesc : "",
    mangaCover : "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook((prev) => ({...prev, [e.target.name] : e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.post("http://localhost:8080/books", book)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  console.log(book);
  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder='Manga Title' onChange={handleChange} name='mangaTitle'/>
      <input type="text" placeholder='Description' onChange={handleChange} name='mangaDesc'/>
      <input type="text" placeholder='Cover' onChange={handleChange} name='mangaCover'/>

      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add