import  express  from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Myhopeis1",
    database:"mangaschema"
});


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello this is backend.");
});


app.get("/books", (req, res) => {
    const q = "SELECT * FROM mangatable";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/anime", (req, res) => {
    const q = "SELECT * FROM animetable";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});


app.post("/books", (req, res) => {
    const q = "INSERT INTO mangatable (`mangaTitle`, `mangaDesc`, `mangaCover`) VALUES (?)";
    const values = [
         req.body.mangaTitle,
         req.body.mangaDesc,
         req.body.mangaCover,
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book Has Been Created");
    });
});


app.delete("/books/:mangaID", (req, res) => {
    const bookID = req.params.mangaID;
    const q = "DELETE FROM mangatable WHERE mangaID = ?"

    db.query(q, [bookID], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book Has Been Deleted!");
    });
});


app.listen(8080, () =>{
    console.log("Connected!");
});