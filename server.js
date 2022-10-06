const express = require('express')
const { Pool } = require('pg')
const app = express();
const PORT = 8002;
const cors = require('cors')// relax security in a api, and put up more security


const pool = new Pool({
    user: 'mekajames',
    database: 'tododb',
    port: 5432,
    password: '',
    host: 'localhost'
})
app.use(express.json())
// app.use(express.static('public'))
app.use(cors())


// GET ALL
app.get('/todos', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM todos;');
        res.send(data.rows).status(200)
    } catch (error) {
        console.error(error.message);
    }
})
// GET 1
app.get('/todos/:id', async (req, res) => {
    try {
        let { id } = req.params; // equal the value of the id on line 23, 
        let { rows } = await pool.query('SELECT * FROM todos WHERE id = $1;', [id]);// [] what ever we pass inside the array is the value we need. 
        res.send(rows).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(400);
    }
})
// CREATE 1
app.post('/todos', async (req, res) => {

    try {
        const { task } = req.body;// res.body - is a empty object{}
        let {rows} = await pool.query('INSERT INTO todos (task) VALUES($1) RETURNING *;', [task]);
        res.send(rows).status(200);
        // let test = req.body; // go to the body on postman like order off amazon app
        // res.send(test); // tell amazon thank you; like postman.
        // console.log(test)

    } catch (error) {
        console.error(error.message);
        res.status(400);
    }
})
//DElETE 1
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('DELETE FROM todos WHERE id = $1;', [id]);
        res.json(rows)
    } catch (error) {
        console.error(error.message);
        res.status(400);
    }
})
// UPDATE 1 put/patch adding a condition 
app.patch('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;
        await pool.query('Update todos SET task = $1 WHERE id = $2;', [task,id]);
        
        const { rows } = await pool.query('SELECT * FROM todos;');
        res.send(rows);
    } catch (error) {
        console.error(error.message);
        res.status(400);
    }
});



app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

module.exports = app;