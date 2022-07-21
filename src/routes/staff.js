const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// isAuthMiddleware
const isAuthMiddleware = require("../middleware/is-auth");
// staff controller
const staffController = require("../controllers/staff");


router.get("/",
    isAuthMiddleware, staffController.getStaffMembers);
router.post("/",
    [
        check("name").trim().isLength({ min: 7 }).withMessage("invalid name parameter"),
        check("salary").trim().isNumeric().isLength({ min: 1 }).withMessage("invalid salary parameter"),
        check("currency").trim().isLength({ max: 5 }).withMessage("invalid currency parameter"),
        check("department_id").trim().isNumeric().isLength({ min: 1 }).withMessage("invalid department parameter"),
        check("sub_department_id").trim().isNumeric().isLength({ min: 1 }).withMessage("invalid sub_department_id"),
    ],
    isAuthMiddleware, staffController.createStaffMember);
router.delete("/:staffId",
    isAuthMiddleware, staffController.deleteStaffMember);

module.exports = router;
