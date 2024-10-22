import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        isbn: "",
        price: "",
        cover: "",
    });

    const navigate = useNavigate();
    const location = useLocation()
    const bookId =location.pathname.split("/")[2] 
    
    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!book.title || !book.isbn || !book.price || !book.cover) {
            alert("Please fill in all fields");
            return;
        }
        try {
            await axios.put("http://localhost:8000/books/"+bookId, book);
            navigate("/"); // Adjust the path based on your routing
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Update Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title" />
            <input type="text" placeholder='isbn' onChange={handleChange} name="isbn" />
            <input type="text" placeholder='price' onChange={handleChange} name="price" />
            <input type="text" placeholder='cover' onChange={handleChange} name="cover" />
            <button onClick={handleClick} className='formButton'>Update</button>
        </div>
    );
};

export default Update;
