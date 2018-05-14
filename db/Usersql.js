var UserSQL = {
    insert: 'INSERT INTO student(name, age, teacher) VALUES(?, ?, ?)',
    queryAll: 'SELECT * FROM student',
    getUserById: 'SELECT * FROM student WHERE id = ? ',
    delete: 'delete from student where id = ?',
    update: 'update student set name=?,age=?,teacher=? where id=?'
};
module.exports = UserSQL;