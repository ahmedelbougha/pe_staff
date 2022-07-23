const database = require('../../database/file-database');


exports.getStaffStatistics = async (onContact = false) => {
    // get all staff min, max and average salary
    let sql = `SELECT
                    ROUND(AVG(staff.salary),2) AS mean_salary,
                    MIN(staff.salary) AS min_salary,
                    MAX(staff.salary) AS max_salary
                FROM staff`;
    if (onContact) {
        sql += ` WHERE staff.on_contract = 1`;
    }

    try {
        const result = await database.query(sql);
        return result;
    } catch (error) {
        throw error;
    }
}

exports.getDepartmentStatistics = async () => {
    // get all staff min, max and average salary grouped by department
    let sql = `SELECT
                    department.name AS department,
                    ROUND(AVG(staff.salary),2) AS mean_salary,
                    MIN(staff.salary) AS min_salary,
                    MAX(staff.salary) AS max_salary
                FROM staff
                INNER JOIN department ON staff.department_id = department.id
                GROUP BY department.id`;

    try {
        const result = await database.query(sql);
        return result;
    } catch (error) {
        throw error;
    }
}


exports.getSubDepartmentStatistics = async () => {
    // get all staff min, max and average salary grouped by department and sub-department
    let sql = `SELECT
                    department.id AS department_id,
                    sub_department.id AS sub_department_id,
                    department.name AS department,
                    sub_department.name AS sub_department,
                    ROUND(AVG(staff.salary),2) AS mean_salary,
                    MIN(staff.salary) AS min_salary,
                    MAX(staff.salary) AS max_salary
                FROM staff
                INNER JOIN department AS department ON staff.department_id = department.id
                INNER JOIN department AS sub_department ON sub_department.id = staff.sub_department_id
                GROUP BY staff.sub_department_id
                ORDER BY department.name, sub_department.name`;

    try {
        const result = await database.query(sql);
        //rebuilding the results to be support nested levels
        //the final results should be like this:
        // [
        //     {
        //         department: "department1",
        //         sub_departments: [
        //             {
        //                 name: "sub_department1",
        //                 mean_salary: 1000,
        //                 min_salary: 500,
        //                 max_salary: 3000
        //             }
        //         ]
        //     },
        //     {
        //         department: "department2",
        //         sub_departments: [
        //             {
        //                 name: "sub_department3",
        //                 mean_salary: 1000,
        //                 min_salary: 500,
        //                 max_salary: 3000
        //             }
        //         ]
        //     }
        // ]
        let final_results_obj = {};
        let last_department_id = null;
        result.forEach(element => {
            if (last_department_id != element.department_id) {
                last_department_id = element.department_id;
                if (!final_results_obj[last_department_id]) {
                    final_results_obj[last_department_id] = { department: element.department, 'sub_departments': [] };
                }
            }
            final_results_obj[last_department_id]['sub_departments'].push({
                name: element.sub_department,
                mean_salary: element.mean_salary,
                min_salary: element.min_salary,
                max_salary: element.max_salary
            })
        });
        final_results = Object.values(final_results_obj)
        return final_results;
    } catch (error) {
        throw error;
    }
}