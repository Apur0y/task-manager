require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json());





const uri = "mongodb+srv://tasks:g5QYNPin17dCcCYQ@thelaststand.sh6jy.mongodb.net/?retryWrites=true&w=majority&appName=thelaststand";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

// Real-time WebSocket connection
// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });

// Routes

const tasksCollection = client.db("TaskManager").collection("tasks")
app.post('/tasks', async (req, res) => {


  try {
    const task = req.body;

    const result = await tasksCollection.insertOne(task);
    // io.emit("taskUpdated", task);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const category = req.query.category;

    const tasks = category
    ? await tasksCollection.find({category}).toArray() 
    : await tasksCollection.find().toArray();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Put id here",id);
    const editedTask = req.body;
    console.log("edit", editedTask);

    const { title, description, category } = editedTask;
console.log("title",title);
    await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: { title, description, category } });
    // io.emit("taskUpdated", { id, title, description, category });
    res.json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await tasksCollection.deleteOne({ _id: new ObjectId(id)  });
    // io.emit("taskDeleted", id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.put("/tasks/reorder", async (req, res) => {
  const { tasks } = req.body;
  try {
    // Update the order of tasks in the database
    await tasksCollection.updateMany({}, tasks); // This is just an example, adjust according to your DB schema
    res.status(200).send("Tasks reordered successfully");
  } catch (error) {
    res.status(500).send("Failed to reorder tasks");
  }
});


    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
  res.send("Task is running")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//tasks  g5QYNPin17dCcCYQ