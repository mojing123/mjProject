const mongoose = require("mongoose");
const Cate = require("../models/cate.model");
/**
 * 增删改查
 */

/**
 * 增加数据
 */

exports.create = function(req, res, next) {
  const category = new Cate(req.body); //实例化
  category.save().then(data => {
    //保存
    res.json(data);
  });
};

/* 修改数据 */
exports.update = function(req, res, next) {
  const id = req.params.id;

  Cate.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
    res.json(data);
  });
};

/* 删除数据 */
exports.remove = function(req, res, next) {
  const id = req.params.id;

  Cate.findByIdAndRemove(id, function(err, data) {
    res.json({ message: "数据已删除" });
  });
};


/* 删除多个数据 */
exports.removes = function(req, res, next) {
  var ids = req.body.ids;
  if (ids.length > 0) {
    Cate.remove({ _id: { $in: ids } }).then(data => {
      res.json({ message: "多条数据已删除" });
    });
  } else {
    res.status(404).send({ message: "404" });
  }
};

/* 查询数据 */
exports.list = function(req, res, next) {
  var page = req.body.page ? req.body.page : 1;
  var limit = req.body.limit ? req.body.limit : 5;
  var queryCondition = {};
  if (req.body.title && req.body.title.trim().length > 0) {
    title = req.body.title;
    queryCondition = {
      title: new RegExp(title, "i")
    };
  }
  Cate.paginate(queryCondition, { page: page, limit: limit }, function(
    err,
    result
  ) {
    res.json(result);
  });
};

/* 树形结构 */
function reverseTree(data, pid) {
  var result = [],
    temp;
  var data = JSON.parse(JSON.stringify(data)); //！！！数据模型里的对象没有children
  //把一个数据模型的对象转成字符串，再把一个字符串转成对象=》js obj
  for (var i in data) {
    if (data[i].parentId === pid) {
      result.push(data[i]);
      temp = reverseTree(data, data[i]._id);
      if (temp.length > 0) {
        data[i].expand = true;
        data[i].children = temp;
      }
    }
  }
  return result;
}

exports.lists = function(req, res, next) {
  var type = req.params.type || 0; //类型 0新闻，1产品
  Cate.find({ type: type }, function(err, data) {
    // console.log('err', err)
    // console.log('tag', data);
    var rpTree = reverseTree(data, null);
    res.json(rpTree);
  });
};

//查目标数据
exports.cateTarData = function(req, res, next) {
  Cate.find({ _id: req.body._id }, function(err, data) {
    res.json(data);
  });
};
