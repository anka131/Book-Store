import express from 'express';
import {Book} from "../models/bookModel.js";


const router = express.Router();
// Routes

// Route for save new book
router.post("/", async(req,res) =>{
    try{
     if(!req.body.title || !req.body.author || !req.body.publishYear){
        return res.status(400).send({msg: "Please fill all fields"});
    } 
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
    
}catch(error){
        console.log(error.message);
        res.status(500).send({msg: error.message})
        
    }
  }
);

// Route for get all books
router.get("/", async (req, res) => {
    try{
        // gets all the books from the database and save it in the variable books
        const books = await Book.find();
        return res.status(200).json({
            count: books.length,
            data: books,
        });

    }catch(error){
        console.log(error.message);
        res.status(500).send({msg: error.message})
    }
})

// Route for get book by id
router.get("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        // finds the book with the id and save it in the variable book
        const books = await Book.findById(id);
        return res.status(200).json(books);

    }catch(error){
        console.log(error.message);
        res.status(500).send({msg: error.message})
    }
});

// Update book
router.put("/:id", async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({msg: "Please fill all fields"});
        };
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result) return res.status(404).send({msg: "Book not found"});
        return res.status(200).send({msg: "Book updated succesfully"});
    }catch(error){
        console.log(error.message);
        res.status(500).send({msg: error.message});
    }
});

// Delete book
router.delete("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) return res.status(404).send({msg: "Book not found"});
        return res.status(200).send({msg: "Book deleted succesfully"});
    }catch(error){
        console.log(error.message);
        res.status(500).send({msg: error.message});
    }
});

export default router;