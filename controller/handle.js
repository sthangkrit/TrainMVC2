var sql = require("mssql");
var moment = require('moment')
// config for your database
var config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'sthangDB'
};

// connect to your database
var errdb = sql.connect(config)
if (errdb) {
    console.log(errdb);
}

class request {

    async createStudent(req) {
        let functionName = '[createStudent]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {

                var request = new sql.Request();
                var first_name = req.first_name
                var last_name = req.last_name
                var faculty_id = req.faculty_id
                var gender = req.gender
                var dmission_date = moment().format()
                var grade = req.grade
                var student_status = req.student_status
                var create_by = req.create_by
                var create_date = moment().format()
                var update_by = req.update_by
                var update_date = moment().format()
                var work_status = req.work_status

                var commandCreate = `INSERT INTO STUDENT_PROFILE
            (first_name, last_name, faculty_id, gender, dmission_date, grade, student_status, create_by, create_date, update_by, update_date, work_status)
            VALUES('${first_name}', '${last_name}', '${faculty_id}', '${gender}', '${dmission_date}','${grade}', '${student_status}', '${create_by}', '${create_date}', '${update_by}', '${update_date}', '${work_status}');`// sql command
                var resultCreate = await request.query(commandCreate); //ยิง command เข้าไปใน 


                let message = {
                    statusCode: 201,
                    message: "Create Success"
                }

                resolve(message)
            } catch (err) {
                let messageError = {
                    statusCode: err.statusCode || 400,
                    message: err.message || `${functionName} CREATE failed [Error] ${err}`
                }
                reject(messageError)
            }


        })
    }

    async getByID(req) {
        let functionName = '[getStudentByID]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {
                var request = new sql.Request();

                var id = req.id
                var command = `SELECT id, first_name, last_name, faculty_id, gender, dmission_date, grade, student_status, create_by, create_date, update_by, update_date, work_status
FROM sthangDB.dbo.STUDENT_PROFILE   WHERE id = ${id} `
                var resultQuery = await request.query(command);
                // resolve(resultQuery.recordset)
                let message = {
                    statusCode: 200,
                    message: resultQuery.recordset
                }
                resolve(message)

            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message || `${functionName} QUERY failed [Error] ${error}`
                }
                reject(messageError)
            }

        })
    }

    async getAll(req) {
        let functionName = '[getAllStudent]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {
                var faculty_id = req.faculty_id
                var request = new sql.Request();
                var command = `SELECT id, first_name, last_name, faculty_id, gender, dmission_date, grade, student_status, create_by, create_date, update_by, update_date, work_status
FROM sthangDB.dbo.STUDENT_PROFILE  WHERE student_status = 'Y' ORDER BY id `

                var commandFaculty = `SELECT id, first_name, last_name, faculty_id, gender, dmission_date, grade, student_status, create_by, create_date, update_by, update_date, work_status
FROM sthangDB.dbo.STUDENT_PROFILE  WHERE student_status = 'Y' AND faculty_id = ${faculty_id} ORDER BY id `
                var resultQuery
                if (faculty_id == 0) {
                    resultQuery = await request.query(command);
                } else
                    resultQuery = await request.query(commandFaculty)

                let message = {
                    statusCode: 200,
                    message: resultQuery.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message || `${functionName} QUERY failed [Error] ${error}`
                }
                reject(messageError)
            }

        })
    }

    async updateGrade(req) {
        let functionName = '[updateGrade]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {
                var request = new sql.Request();
                var id = req.id;
                var grade = req.grade;
                var update_by = req.update_by;
                var update_date = moment().format();
                var command = `UPDATE sthangDB.dbo.STUDENT_PROFILE 
                                SET grade='${grade}',update_by='${update_by}', update_date='${update_date}'  WHERE id = ${id};`
                await request.query(command);
                // resolve(result.recordset);
                let message = {
                    statusCode: 200,
                    message: "Update Success"
                }
                resolve(message)

            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message || `${functionName} UPDATE failed [Error] ${error}`
                }
                reject(messageError)
            }

        })
    }


    async delete(req) {
        let functionName = '[deleteStudent]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {
                var request = new sql.Request();
                var id = req.id;
                var update_by = req.update_by;
                var update_date = moment().format();
                var command = `UPDATE sthangDB.dbo.STUDENT_PROFILE 
                                SET student_status='N',work_status ='N',update_by='${update_by}', update_date='${update_date}'  WHERE id = ${id}; 
                                `
                await request.query(command);
                // resolve(result.recordset);
                let message = {
                    statusCode: 200,
                    message: "Update Success"
                }
                resolve(message)

            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message || `${functionName} DELETE failed [Error] ${error}`
                }
                reject(messageError)
            }

        })
    }


}

module.exports = request
