var fs = require('fs')
var path = require('path')
var multer = require('multer')
var express = require('express')
var router = express.Router()
var upload = multer({
    dest: path.resolve(__dirname, '../public/uploads/')
});
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

//多文件上传 （限定上传文件个数）（没有修改后缀）
router.post('/uploads', upload.array('file', 3), function (req, res, next) {
    console.log(111, req.files[0])
    // console.log(222, res)
    res.send('successfully');
    //目标文件
    var des_file = "./public/uploads/" + req.files[0].originalname;
    //临时文件
    var temp_file = "./public/uploads/" + req.files[0].filename;

    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
                console.log(response);
                res.end(JSON.stringify(response));
            }
        });
        //删除文件
        fs.unlink(temp_file, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('unlinkOK');
            }
        })
    });
})

router.get('/files', function (req, res, next) {
    // 显示服务器文件 
    // 文件目录
    var filePath = path.join(__dirname, '../public/uploads/');
    fs.readdir(filePath, function (err, results) {
        if (err) throw err;
        if (results.length > 0) {
            var files = [];
            results.forEach(function (file) {
                if (fs.statSync(path.join(filePath, file)).isFile()) {
                    files.push(file);
                }
            })
            res.render('files', {
                files: files
            });
        } else {
            res.end('当前目录下没有文件');
        }
    });
});

router.get('/file/:fileName', function (req, res, next) {
    // 实现文件下载
    var fileName = req.params.fileName;
    var filePath = path.join(__dirname, '../public/uploads/' + fileName);
    var stats = fs.statSync(filePath);
    if (stats.isFile()) {
        res.set({
            'Content-Type': 'application/octet-stream; charset=utf-8',
            'Content-Disposition': 'attachment; filename=' + encodeURI(fileName), // 含中文需转码
            // 'Content-Disposition': 'attachment; filename=' + encodeURIComponent(fileName), // 含中文需转码
            'Content-Length': stats.size
        });
        // res.writeHead(200, {
        //     'Content-Type': 'application/octet-stream; charset=utf-8',
        //     'Content-Disposition': 'attachment; filename=' + encodeURI(fileName), // 含中文需转码
        //   });
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.end(404);
    }
});



module.exports = router;