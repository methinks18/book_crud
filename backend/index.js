import express from "express"
import mysql from "mysql"
import cors from "cors"



const app=express()


const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"book_test"
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
     res.json("Hello this is a message")
})

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`,`isbn`,`cover`,`price`) VALUES (?)"
    const values=[
        req.body.title, 
        req.body.isbn,
        req.body.cover,
        req.body.price
    ] 
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books SET `title`=?, id =?"
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully");
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` =?, `isbn` =?,`price`=?,`cover`=? WHERE id=?";
    const values=[
        req.body.title,
        req.body.isbn,
        req.body.price,
        req.body.cover,
    ]
    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book Updated Successfully");
    })
})

app.listen(8000, ()=>{
    console.log("Connect to backend")
})