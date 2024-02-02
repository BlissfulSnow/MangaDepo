import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAll = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/books")
                setBooks(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAll()
    }, [])

  return (
    <div>
        <h1>Manga Titles</h1>
        <div className="books">
            {books.map(book => (
                <div className="book" key={book.mangaID}>
                    {book.mangaCover && <img src={book.mangaCover} alt="" />}
                    <h2>{book.mangaTitle}</h2>
                    <p>{book.mangaDesc}</p>
                </div>
            ))}
        </div>

        <button>
            <Link to="/add">Add New Manga</Link>
        </button>
    </div>
  )
}

export default Books