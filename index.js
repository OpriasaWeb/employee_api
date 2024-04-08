const express = require('express')
const cors    = require('cors') 
const app     = express()

const UsersRouter = require("./routers/users.router")
const EmployeeRouter = require("./routers/employee.router")

require('dotenv').config()
app.use(cors())
app.use((express.json()))
app.use(express.urlencoded({ extended:false }))

app.use("/users", UsersRouter)
app.use("/employee", EmployeeRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})

