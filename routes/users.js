var express = require('express');
var router = express.Router();
// var ws = require('../websocket/ws');
var bodyParser = require('body-parser')
// 创建 application/json 解析/uploads
var jsonParser = bodyParser.json()
// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
//导入mysql模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};
/* GET users listing. */
router.get('/addUser', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log('建立连接失败')
    } else {
      // 获取前台页面传过来的参数  
      var param = req.query || req.params;
      var data = [param.name, param.age, param.teacher];
      // 建立连接 增加一个用户信息 
      connection.query(userSQL.insert, data, function (err, result) {
        if (result) {
          result = {
            code: 200,
            msg: '增加成功',
            result: result
          };
        }
        // 以json形式，把操作结果返回给前台页面     
        responseJSON(res, result);
        // 释放连接  
        connection.release();
      });
    }
  });
});

/*删除 */
router.post('/delUser', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('建立连接失败')
    } else {
      var param = req.body;
      var data = [param.id];
      connection.query(userSQL.delete, data, (err, result) => {
        if (result) {
          result = {
            code: 200,
            msg: '删除成功',
            result: result
          }
        };
        responseJSON(res, result);
        connection.release();
      })
    }
  })
});

/**修改 */
router.post('/updateUser', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('建立连接失败')
    } else {
      var param = req.body;
      var data = [param.name, param.age, param.teacher, param.id];
      connection.query(userSQL.update, data, (err, result) => {
        if (result) {
          result = {
            code: 200,
            msg: '更新成功',
            result: result
          }
        };
        responseJSON(res, result);
        connection.release();
      })
    }
  })
})
/**查询 */
router.post('/selectUserById', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('建立连接失败')
    } else {
      var param = req.body;
      var data = [param.id, param.name, param.age, param.teacher];
      connection.query(userSQL.getUserById, data, (err, result) => {
        if (result) {
          result = {
            code: 200,
            msg: '查询成功',
            result: result
          }
        };
        responseJSON(res, result);
        connection.release();
      })
    }
  })
})
//查询所有
router.post('/selectUser', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('建立连接失败')
    } else {
      var param = req.body;
      var data = [param.id, param.name, param.age, param.teacher];
      connection.query(userSQL.queryAll, data, (err, result) => {
        if (result) {
          result = {
            code: 200,
            msg: '查询成功',
            result: result
          }
        };
        responseJSON(res, result);
        connection.release();
      })
    }
  })
})
//登录
router.post('/login', (req, res, next) => {
  pool.getConnection((err, connection) => {
    if(err) {
      console.log('建立链接失败')
    } else {
      var param = req.body;
      // var data = [param.id, param.login_type, param.login_token, param.username, param.password, param.nick_name];
      var data = [param.username, param.password];
      connection.query(userSQL.login, data, (err, result) => {
        if(result.length) {
          result = {
            code: 200,
            msg: '登录成功',
            result: result
          }
        } else {
          result = {
            code: 0,
            msg: '登录失败'
          }
        }
        responseJSON(res, result);
        connection.release();
      })
    }
  })
})

module.exports = router;