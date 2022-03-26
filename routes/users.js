import express from "express";
import { v4 as uuidv4 } from 'uuid';

 
const router = express.Router();

// const users = [];

let users = [];

router.get('/', (req,res) => {
    // console.log(users)

    res.send(users);  
});

router.post('/', (req,res) => {
    // console.log("Post Route Reched");

    // console.log(req.body);   // when you post the request from postman the json data show your vs code terminal
    const user = req.body;      // Create a new variable to get request

    // users.push(user)     Without user id to post the requiest 
    
    // const userId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    // const userWithId = {...user, id: userId}
    // users.push(userWithId)           // Shown on console the post from postman request

    // const userWithID = {...user, id: uuidv4()}   This is another way to add user id to every json data
    // users.push(userWithID);

    users.push({...user, id: uuidv4()});

    res.send(`User with the name ${user.firstName} add to the databases!`);
});

// /users/2 => req.prems { id : 2 }
router.get('/:id', (req, res) => {
    // console.log(req.params);
    // res.send(req.params) This is show id aswell when you push users before /data
    
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id)
    res.send(foundUser)
});

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id != id)
    res.send(`User with the id ${id} delete from the database`)
});

router.patch('/:id', (req,res) => {
    const { id } = req.params;
    const { FirstName, MiddleName, LastName, Age,} = req.body;
    const user = users.find((user) => user.id == id)

    if(FirstName) user.FirstName = FirstName;
    if(MiddleName) user.MiddleName = MiddleName;
    if(LastName) user.LastName = LastName;
    if(Age) user.Age = Age;

    res.send(`User with the id ${id} has been updated`)
})

export default router;