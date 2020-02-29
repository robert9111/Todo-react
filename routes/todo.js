const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// @route    GET todo
// @desc     Get all Todos
// @access   public
router.get('/', async (req, res, next) => {
    try {
        // Query DB and get all Todos
        const todoList = await Todo.find();
        // return array of Todo objects
        res.json(todoList);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error getting todos');
    }
});

// @route    POST todo
// @desc     Create a new Todo Item
// @access   public
router.post('/', async (req, res, next) => {
    const { title, description } = req.body;

    try {
        const newTodo = new Todo({
            title,
            description
        });

        const todo = await newTodo.save();
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT todo/:id
// @desc     Update a todo item
// @access   public
router.put('/:id', async (req, res, next) => {
    const { title, description } = req.body;

    const todoFields = {};
    if(title) todoFields.title = title;
    if(description) todoFields.description = description;

    try {
        // Query the DB to see if we can find todo
        let todo = await Todo.findById(req.params.id);
        // if not found, return 404
        if(!todo) return res.status(404).json({msg:"Todo not found"});
        // if found, update
        todo = await Todo.findByIdAndUpdate(req.params.id,
            { $set: todoFields },
            { new: true });
        
        res.send(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE todo/:id
// @desc     Delete a specific todo
// @access   public
router.delete('/:id', async (req, res, next) => {
    try {
        // Look for todo
        let todo = await Todo.findById(req.params.id);
        // If not found, 404
        if(!todo) return res.status(404).json({ msg:"Todo not found" });
        // If exists, delete
        todo = await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: "Todo Deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;