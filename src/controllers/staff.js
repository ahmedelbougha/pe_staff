const { validationResult } = require("express-validator");
const Staff = require("../models/staff");


exports.createStaffMember = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed, entered data is incorrect!");
        error.data = errors.array();
        error.statusCode = 422;
        next(error);
        return;
    }

    const { name, salary, currency, department_id, sub_department_id } = req.body;

    try {
        const staff = await Staff.createStaffMember(name, salary, currency, department_id, sub_department_id);
        res.status(201).json({ message: "Staff member has been created successfully!", staff });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteStaffMember = async (req, res, next) => {
    const staffId = req.params.staffId;
    try {
        await Staff.deleteStaffMember(staffId);
        res.status(200).json({ message: "Staff member has been deleted successfully!" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getStaffMembers = async (req, res, next) => {
    try {
        const staffMembers = await Staff.getStaffMembers();
        res.status(200).json({ message: "Staff members has been fetched successfully!", staff: staffMembers });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};