/**
 * user模块逻辑控制
 * 需要用户名唯一，修改、删除都通过用户名来进行操作。
 * 负责数据的增、删、改、查
 */
const mongoose = require("mongoose");
const User = require("../models/user.model");

/**
 * 增加数据
 */
exports.insert = (req, res, next) => {
    const user = new User(req.body); // 请示方式是post
    console.log(req.body);
    findUserByName(req.body.userName, res, obj => {
        let isExist = obj === "没有查到用户" ? false : true;
        if (isExist) {
            res.json();
        } else {
            user.save().then(data => {
                res.json(data);
            });
        }
    });
};

/**
 * 更新数据
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.update = (req, res, next) => {
    // 通过用户名来查找并修改
    const userName = req.body.userName;
    console.log(req.body);
    findUserByName(userName, res, obj => {
        let isExist = obj === "没有查到用户" ? false : true;
        if (isExist) {
            User.findByIdAndUpdate(
                obj._id,
                { $set: req.body },
                { new: false }
            ).then(data => {
                res.json({
                    success: true,
                    message: "修改成功"
                });
            });
        } else {
            res.json({
                message: obj
            });
        }
    });
};

/**
 * 删除数据
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.remove = (req, res, next) => {
    const userName = req.body.userName;
    findUserByName(userName, res, obj => {
        let isExist = obj === "没有查到用户" ? false : true;
        if (isExist) {
            User.findByIdAndRemove(obj._id, function(err, data) {
                res.json({ message: "数据已删除" });
            });
        } else {
            res.json({ message: obj });
        }
    });
};

/**
 * 删除多个
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.removes = function(req, res, next) {
    console.log(req.body);
    var userNames = req.body.userNames;
    userNames = userNames.split(",");
    console.log(userNames);
    if (userNames.length > 0) {
        User.remove({ userName: { $in: userNames } }).then(data => {
            res.json({ message: "多条数据已删除" });
        });
    } else {
        res.json({ message: "所选条目为空" });
    }
};

/**
 * 查询数据
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.list = (req, res, next) => {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 5;

    var queryCondition = {};

    if (req.body.userName && req.body.userName.trim().length > 0) {
        userName = req.body.userName;
        queryCondition = {
            userName: new RegExp(userName, "i")
        };
    }

    User.paginate(queryCondition, { page: page, limit: limit }, function(
        err,
        result
    ) {
        // res.json(result);
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
};

exports.getUserByName = (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;
    User.findOne({ userName: userName, password: password }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
};

exports.loginCheck = (req, res) => {
    User.findOne(
        { userName: req.body.userName, password: req.body.password },
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.json(data);
            }
        }
    );
};
/**
 * 通过用户名查找用户，修改、删除都需要使用
 * @param {*} userName 用户名，后期可能使用其他字段
 * @param {*} fn 回调函数，用来做修改、删除操作
 */
function findUserByName(userName, res, fn) {
    // 通过用户名查询
    User.find({ userName: userName }, (err, data) => {
        let obj;
        if (err) {
            res.json({ message: err });
        } else {
            if (data.length === 0) {
                obj = "没有查到用户";
            } else {
                obj = data[0];
            }
        }

        fn(obj);
    });
}
