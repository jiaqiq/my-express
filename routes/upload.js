var fs = require('fs')
var path = require('path')
var multer = require('multer')
var express = require('express')
var router = express.Router()
var upload = multer({
    dest: path.resolve(__dirname, '../public/uploads/')
});

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

module.exports = router;