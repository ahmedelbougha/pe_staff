const { validationResult } = require('express-validator');
const Staff = require('../models/staff');


exports.createStaffMember = async (req, res, next) => {
	// Validating the data before creating a new staff member
	const errors = validationResult(req);
	// If there are errors, return the errors with status code 422 Unprocessable Entity
	if (!errors.isEmpty()) {
		const error = new Error('Validation Failed, entered data is incorrect!');
		error.data = errors.array();
		error.statusCode = 422;
		next(error);
		return;
	}
	// Destructure the data from the request body to get what we need only
	const { name, salary, currency, on_contract, department_id, sub_department_id } = req.body;

	try {
		// Create the staff member
		const staff = await Staff.createStaffMember(name, salary, currency, on_contract, department_id, sub_department_id);
		// Return success message with response 201 Created Success
		res.status(201).json({ message: 'Staff member has been created successfully!', staff });
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
		// Delete the staff member and return the success message with 200 OK
		await Staff.deleteStaffMember(staffId);
		res.status(200).json({ message: 'Staff member has been deleted successfully!' });
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
};

exports.getStaffMembers = async (req, res, next) => {
	let message = '';
	const staffId = req.params.staffId ? req.params.staffId : null;
	try {
		// Get all staff members and return them with status 200 OK
		const staffMembers = await Staff.getStaffMembers(staffId);

		if (staffMembers.length == 0 && !staffId) {
			message = 'No staff members found!';
		} else if (staffMembers.length == 0 && staffId) {
			message = 'No staff members matching your search!';
		} else {
			message = 'Staff members has been fetched successfully!';
		}
		res.status(200).json({ message: message, staff: staffMembers });
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
};