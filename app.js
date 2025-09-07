const express=require('express')
const app = express()

app.use(express.json())

const PORT = 3000


let todos =[
    {id:1,task: "Learn Express", complete: false},
    {id: 2, task : "Build API", complete:false}
]

// HomePage
app.get('/', (req,res)=> {
    console.log('Here')
    res.send('Hello World')
})

// todos page 
app.get("/todos", (req,res)=>{
    res.json(todos)
})

app.get("/todos/:id", (req,res)=>{
    const id =req.params.id;
    const todo = todos.find(todo=>todo.id === parseInt(id)) 
    if(!todo) return res.status(404).json("No todo found");
    res.json(todo)
})

// listening for connections
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})