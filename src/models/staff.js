const database = require('../../database/database');

exports.createStaffMember = async (name, salary, currency, department_id, sub_department_id) => {
    const sql = `INSERT INTO staff (name, salary, currency, department_id, sub_department_id) VALUES ('${name}', ${salary}, '${currency}', ${department_id}, ${sub_department_id})`;
    try {
        const insertResult = await database.query(sql, "run", true);
        let result;
        if (insertResult.lastID) {
            result = await database.query(`SELECT * FROM staff WHERE id = ${insertResult.lastID}`);
        }
        return result;
    } catch (error) {
        throw error;
    }
}

exports.deleteStaffMember = async (id) => {
    const sql = `DELETE FROM staff where id = ${id}`;
    try {
        //delete the record and return true
        //it can be more sophisticated to check if the member exists before deleting
        await database.query(sql, "run");
        return true;
    } catch (error) {
        console.log(error)
        throw error;
    }

}

exports.getStaffMembers = async () => {
    const sql = `SELECT
                staff.id,
                staff.name,
                staff.salary,
                staff.currency,
                department.name as department_name,
                sub_department.name as sub_department_name
                    FROM staff
                INNER JOIN department ON staff.department_id = department.id
                INNER JOIN department as sub_department ON staff.sub_department_id = sub_department.id`;
    try {
        const result = await database.query(sql);
        return result;
    } catch (error) {
        throw error;
    }

}