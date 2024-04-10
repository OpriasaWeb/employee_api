const conn = require('../database/index')

const EmployeeController = {
  addAdmin: (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const salary = req.body.salary;
    const sql = "INSERT INTO employee_management.employee (name, email, address, salary) VALUES (?, ?, ?, ?)"
    conn.query(sql, [name, email, address, salary],
      (err, results) => {
        if(results) res.send(results)
        else res.send({message: "Enter correct details!"})
      }
    )
  },
  getAllEmployee: (req, res) => {
    const sql = "SELECT * FROM employee_management.employee"
    conn.query(sql, (err, results) => {
        if(err) return res.json({error: "Get ALL employee error in sql."})
        return res.json({status: "Success", result: results})
      }
    )
  },
  getOneEmployee: (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM employee_management.employee WHERE employee_id = ?"
    conn.query(sql, [id], (err, results) => {
      if(err) return res.json({error: "Get employee error in sql."})
      return res.json({status: "Success", result: results})
    })
  },
  updateAdmin: (req, res) => {
    const id = req.params.id
    const values = [
      req.body.name,
      req.body.email,
      req.body.address,
      req.body.salary,
    ]
    const sql = "UPDATE employee_management.employee SET name = ?, email = ?, address = ?, salary = ? WHERE employee_id = ?"
    conn.query(sql, [...values, id], (err, results) => {
      if(err) return res.send(err)
      return res.json(results)
    })
  },
  deleteAdmin: (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM employee_management.employee WHERE employee_id = ?"
    conn.query(sql, [id], (err, results) => {
      if(err) return res.json({error: "Delete employee error in sql."})
      return res.json({status: "Success"})
    })
  },
  employeeCount: (req, res) => {
    const sql = "SELECT COUNT(employee_id) AS employee FROM employee_management.employee"
    conn.query(sql, (err, results) => {
        if(err) return res.json({error: "Get COUNT of employee error in sql."})
        return res.json({status: "Success", result: results})
      }
    )
  },
  sumOfSalary: (req, res) => {
    const sql = "SELECT SUM(salary) AS salary FROM employee_management.employee"
    conn.query(sql, (err, results) => {
        if(err) return res.json({error: "Get SUM of salaries error in sql."})
        return res.json({status: "Success", result: results})
      }
    )
  },

  
}

module.exports = EmployeeController