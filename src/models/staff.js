const database = require('../../database/file-database');

exports.createStaffMember = async (name, salary, currency, on_contract, department_id, sub_department_id) => {
    //create new staff member and return the staff member data
    //set on_contact to 0 if it's not provided
    if (on_contract === undefined) {
        on_contract = 0;
    }

    const sql = `INSERT INTO staff (name, salary, currency, on_contract, department_id, sub_department_id) VALUES ('${name}', ${salary}, '${currency}', ${on_contract}, ${department_id}, ${sub_department_id})`;

    try {
        const insertResult = await database.query(sql, "run", true);
        let result;
        if (insertResult.lastID) {
            //get the staff member data using the lastID from the insert
            result = await fetchStaffMembers(insertResult.lastID);
        }
        return result;
    } catch (error) {
        throw error;
    }
}

exports.deleteStaffMember = async (id) => {
    //delete staff member
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
    try {
        //get all staff members along with their departments and sub-departments
        const result = await fetchStaffMembers();
        return result;
    } catch (error) {
        throw error;
    }
}

const fetchStaffMembers = async (id = 0) => {
    //get all staff members along with their departments and sub-departments
    //or get only one staff member if id is provided
    let sql = `SELECT
                staff.id,
                staff.name,
                staff.salary,
                staff.currency,
                CASE staff.on_contract
                    WHEN 1
                    THEN 'true'
                    ELSE 'false'
                END on_contract,
                department.name as department_name,
                sub_department.name as sub_department_name
                    FROM staff
                INNER JOIN department ON staff.department_id = department.id
                INNER JOIN department as sub_department ON staff.sub_department_id = sub_department.id`;
    if (!isNaN(id) && id > 0) {
        sql += ` WHERE staff.id = ${id}`;
    }

    return await database.query(sql);
}