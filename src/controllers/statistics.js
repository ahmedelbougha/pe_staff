const Statistics = require("../models/statistics");

exports.getStaffStatistics = async (req, res, next) => {
    try {
        // Get the statistics for all staff members
        const staffStatistics = await Statistics.getStaffStatistics();
        // Return the data with success message
        res.status(200).json({ message: "Staff members statistics has been fetched successfully!", staff: staffStatistics });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getContractedStatistics = async (req, res, next) => {
    try {
        // Get the statistics for contracted staff members
        const staffStatistics = await Statistics.getStaffStatistics(true);
        // Return the data with success message
        res.status(200).json({ message: "Contracted staff members statistics has been fetched successfully!", staff: staffStatistics });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getDepartmentStatistics = async (req, res, next) => {
    try {
        // Get the statistics aggregated by department
        const departmentStatistics = await Statistics.getDepartmentStatistics();
        res.status(200).json({ message: "Departments statistics has been fetched successfully!", departments: departmentStatistics });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getSubDepartmentStatistics = async (req, res, next) => {
    try {
        // Get the statistics aggregated by department and sub-department as second level
        const subDepartmentStatistics = await Statistics.getSubDepartmentStatistics();
        res.status(200).json({ message: "Sub-departments statistics has been fetched successfully!", departments: subDepartmentStatistics });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

