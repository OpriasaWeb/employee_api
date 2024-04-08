const conn = require("../database/index")
const bcrypt  = require('bcrypt')
const jwt     = require('jsonwebtoken')

const UsersController = {
  register: (req, res) => {
    const sql = "INSERT INTO employee_management.users (name, email, password) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if(err) return res.json({error: "Error in hashing the password."})
      const values = [
        req.body.name,
        req.body.email,
        hash // hashed password
      ]
      conn.query(sql, [values], (err, results) => {
        if(err) return res.json({error: "Register error sql"})
        return res.json({status: "Success"})
      })
    })
  },
  hash: (req, res) => {
    bcrypt.hash("12345678910", 10, (err, hash) => {
      if(err) return res.json({error: "Error in hashing the password"})
      const values = [
        hash
      ]
      return res.json({result: hash})
    })
  },
  login: (req, res) => {
    const sql = "SELECT * FROM employee_management.users WHERE email = ?"
    conn.query(sql, [req.body.email], (err, results) => {
      if(err) return res.json({status: "Error", error: "Error in running query."})
      if(results.length > 0){
        bcrypt.compare(req.body.password.toString(), results[0].password, (err, response) => {
          if(err) return res.json({error: "Wrong input of password."})
          if(response){
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'})
            return res.json({status: "Success", token: token})
          }
          return res.json({status: "Error", error: "Wrong email or password. Please try again."})
        })
      }
      else{
        return res.json({status: "Error", error: "Wrong email or password. Please try again."})
      }
    })
  }
}

module.exports = UsersController