const mysql_connector = require('mysql');
const ResultSet = require('oracledb/lib/resultset');
const connection = mysql_connector.createConnection({
    host : 'localhost',
    user : 'root',
    password  :'tennis92',
    database : 'user_db'
});
connection.connect();


const getUsers = (request, response) => {
    connection.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}
const getUserById = (request, response) => {
    console.log("serfsdf");
    const id = parseInt(request.params.id)
    connection.query('SELECT * FROM users WHERE id = ' + id, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results);
    })
}
const createUser = (request, response) => {
    const id = parseInt(request.params.id)
    const name = request.params.name
    const email = request.params.email
    connection.query('INSERT INTO users (id, name, email) VALUES (' + id + ',"' + name + '","' + email + '")', (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added : ` + id + ' ' + name + ' ' + email);
    })
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const name = request.params.name
    const email = request.params.email
    connection.query(
        'UPDATE users SET name = "' + name + '", email = "' + email + '" WHERE id = ' + id,
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID : ` + id);
        }
    )
}
const deleteUser = (request, response) => {
    console.log("user");
    const id = parseInt(request.params.id)
    connection.query('DELETE FROM users WHERE id = ' + id, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send('User deleted with ID: ' + id)
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}