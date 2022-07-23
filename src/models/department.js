const database = require('../../database/file-database');

exports.getDepartment = async (id, parentId = false) => {
    //get the department data by id and parentId if presents
    let sql = `SELECT * FROM department WHERE id = ${id}`;
    if (parentId) {
        sql += ` AND parent_id = ${parentId}`;
    }

    try {
        const result = await database.query(sql);
        return result;
    } catch (error) {
        throw error;
    }
}
