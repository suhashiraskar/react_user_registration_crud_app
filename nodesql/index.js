//C:\nodeproject> node index.js 
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); 
   
//const port = 3000
   
app.use(cors());
app.use(express.json());
 
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root123",
  database: "userdata",
});
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
 
app.post("/create", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const phonenumber = req.body.phonenumber;
    const occupation = req.body.occupation;
     
    db.query(
      "INSERT INTO users (firstname, lastname, age, phonenumber, occupation) VALUES (?,?,?,?,?)",
      [firstname, lastname, age, phonenumber, occupation],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("You have registered successfully!");
        }
      }
    );
}); 
 
app.get("/userdetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
 
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM users WHERE id = ? ";
 
  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
 
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET `firstname`= ?, `lastname`= ?, `age`= ?, `phonenumber`= ?, `occupation`= ? WHERE id = ?";
 
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.age,
    req.body.phonenumber,
    req.body.occupation,
  ];
 
  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
 
//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})
 
app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});