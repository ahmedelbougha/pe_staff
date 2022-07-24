const Statistics = require('../models/statistics');

exports.getStaffStatistics = async (req, res, next) => {
	try {
		let staffStatistics;
		if (req.query.contract && req.query.contract === '1') {
			// Get the statistics for contracted staff members (on_contract = 1)
			staffStatistics = await Statistics.getStaffStatistics(true);
		} else {
			// Get the statistics for all staff members
			staffStatistics = await Statistics.getStaffStatistics();
		}
		// Return the data with success message
		res.status(200).json({ message: 'Staff members statistics has been fetched successfully!', staff: staffStatistics });
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
};

exports.getDepartmentStatistics = async (req, res, next) => {
	try {
		// Get the statistics aggregated by department
		const departmentStatistics = await Statistics.getDepartmentStatistics();
		res.status(200).json({ message: 'Departments statistics has been fetched successfully!', departments: departmentStatistics });
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
};

exports.getSubDepartmentStatistics = async (req, res, next) => {
	try {
		// Get the statistics aggregated by department and sub-department as second level
		const subDepartmentStatistics = await Statistics.getSubDepartmentStatistics();
		res.status(200).json({ message: 'Sub-departments statistics has been fetched successfully!', departments: subDepartmentStatistics });
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
};

