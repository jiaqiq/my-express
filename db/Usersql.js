var UserSQL = {
    insert: 'INSERT INTO student(name, age, teacher) VALUES(?, ?, ?)',
    queryAll: 'SELECT * FROM student',
    getUserById: 'SELECT * FROM student WHERE id = ? ',
};
module.exports = UserSQL;