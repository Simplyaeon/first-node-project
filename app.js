const express=require('express')
const app = express()

app.use(express.json())

const PORT = 3000

// Created TODOS
let todos =[
    {id:1,task: "Learn Express", complete: false},
    {id: 2, task : "Build API", complete:false}
]

// GET request for root page. 
app.get('/', (req,res)=> {
    console.log('Here')
    res.send('Hello World')
})

// GET request to todo route. 
app.get("/todos", (req,res)=>{
    res.json(todos)
})

// GET request to select a task
app.get("/todos/:id", (req,res)=>{
    const id =req.params.id;
    const todo = todos.find(todo=>todo.id === parseInt(id)) 
    if(!todo) return res.status(404).json("No todo found");
    res.json(todo)
})

// POST method to input new task
app.post("/todos", (req,res)=>{
    const newTodo = {
         id :todos.length + 1,
        task:req.body.task,
        complete: req.body.complete|| false
    }

    todos.push(newTodo)
    res.status(201).json(newTodo)
})

// PUT request for updating task
app.put("/todos/:id",(req,res)=>{
    const {id} = req.params.id;
    const {task,complete} =req.body;
    const todo = todos.find(t=>t.id ===parseInt(id))
    if(!todo) return res.status(404).json("Todo not found");
    todo.task = task || req.todo.task;
    todo.complete = complete!== undefined ? complete : todo.complete;
    res.json(todo)
})

// DELETE todo from array
app.delete('/todos/:id',(req,res)=>{
    const paramsFromId = req.params.id;
    const index = todos.findIndex(t=>t.id ===parseInt(paramsFromId))

    if(index === -1) return res.status(404).json("Todo not found");
    const deletedTodo = todos.splice(index,1);
    res.json(deletedTodo)
    
})
// listening for connections
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})