const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/employee.controller")

router.post("/create", EmployeeController.addAdmin)
router.get("/getEmployee", EmployeeController.getAllEmployee)
router.get("/get/:id", EmployeeController.getOneEmployee)
router.put("/update/:id", EmployeeController.updateAdmin)
router.delete("/delete/:id", EmployeeController.deleteAdmin)
router.get("/countemployee", EmployeeController.employeeCount)
router.get("/sumsalary", EmployeeController.sumOfSalary)


module.exports = router