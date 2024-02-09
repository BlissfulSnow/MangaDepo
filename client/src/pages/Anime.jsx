import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Anime = () => {

  const [animes, setAnime] = useState([]);

  useEffect(() => {
    const fetchAll = async ()=> {
        try{
            const res = await axios.get("http://localhost:8080/anime");
            setAnime(res.data);
        }catch(err) {
            console.log(err);
        }
    }
    fetchAll();
  }, []);



    return <div>
      <h1 className='title'>Animes</h1>
      <div className='animes'>
        {animes.map((anime, index) => (
          index % 4 === 0 && (
            <div className="row" key={`row_${index / 4}`}>
                {animes.slice(index, index + 4).map(anime => (
                    <div className="anime" key={anime.animeID}>
                        {anime.animeCover && <img src={anime.animeCover} alt="" />}
                        <h2>{anime.animeTitle}</h2>
                        <p>{anime.animeDesc}</p>
                    </div>
                ))}
            </div>
        )
        ))}
      </div>
    
    
    </div>
    
}

export default Anime