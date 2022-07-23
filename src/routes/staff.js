const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// isAuthMiddleware
const isAuthMiddleware = require("../middleware/is-auth");
// staff controller
const staffController = require("../controllers/staff");
// department model
const departmentModel = require("../models/department");


// validating the sub_department_id but actually it's for both department and sub_department
const isValidDepartment = async (value, { req }) => {
    try {
        const department = await departmentModel.getDepartment(value, req.body.department_id);
        if (department.length == 0) {
            throw new Error('Incorrect department or sub-department');
        }
        return true;
    } catch (error) {
        throw new Error('An issue occurred while validating department');
    }

}

// routes (all started with /staff but it shows only the sub-routes here)
router.get("/",
    isAuthMiddleware, staffController.getStaffMembers);
router.post("/",
    [
        check("name").trim().isLength({ min: 3 }).withMessage("invalid name parameter"),
        check("salary").trim().isNumeric().isLength({ min: 1 }).withMessage("invalid salary parameter"),
        check("currency").trim().isLength({ max: 5 }).withMessage("invalid currency parameter"),
        check("on_contract").optional().trim().isBoolean().withMessage("invalid on_contract parameter"),
        check("department_id").trim().isNumeric().isLength({ min: 1 }).withMessage("invalid department parameter"),
        check("sub_department_id").trim().isNumeric().custom(isValidDepartment).isLength({ min: 1 }).withMessage("invalid sub_department_id"),
    ],
    isAuthMiddleware, staffController.createStaffMember);
router.delete("/:staffId",
    isAuthMiddleware, staffController.deleteStaffMember);

module.exports = router;
