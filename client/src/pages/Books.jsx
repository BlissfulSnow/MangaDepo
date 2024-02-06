import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAll = async ()=> {
            try{
                const res = await axios.get("http://localhost:8080/books");
                setBooks(res.data);
            }catch(err) {
                console.log(err);
            }
        }
        fetchAll();
    }, []);

    const handleDelete = async (mangaID) => {
        try{
            await axios.delete("http://localhost:8080/books/" + mangaID)
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    const toggleDescription = (mangaID) => {
        setBooks(books.map(book => {
            if (book.mangaID === mangaID) {
                return { ...book, expanded: !book.expanded };
            }
            return book;
        }));
    };

  return (
    <div>
        <h1 className='title'>Manga Titles</h1>
        <div className="books">
            {books.map((book, index) => (
                // Create a new row for every 4th book
                index % 4 === 0 && (
                    <div className="row" key={`row_${index / 4}`}>
                        {books.slice(index, index + 4).map(book => (
                            <div className="book" key={book.mangaID}>
                                {book.mangaCover && <img src={book.mangaCover} alt="" />}
                                <h2>{book.mangaTitle}</h2>
                                
                                <p>{book.expanded ? book.mangaDesc : `${book.mangaDesc.slice(0, 100)}...`}</p>
                                {book.mangaDesc.length > 100 && (
                                <button onClick={() => toggleDescription(book.mangaID)} className='readmorebutton'>
                                    {book.expanded ? "Show less" : "Read more"}
                                </button>
                                )}
                                <div className='deletebutton'>
                                    <button className='delete' onClick={()=>handleDelete(book.mangaID)}>Delete</button>
                                </div>
                                <div className='updatebutton'>
                                    <button className='update'>Update</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ))}
        </div>
        
        <div className='addnewmanga'>
            <button className='button1'>
                <Link to="/add" className='addtext'>Add New Manga</Link>
            </button>
        </div>
    </div>
)

}

export default Books