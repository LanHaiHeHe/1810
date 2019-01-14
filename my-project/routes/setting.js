var express = require('express');
var router = express.Router();
var {
    connect,
    insert,
    find,
    ObjectId,
    update,
    del
} = require("../libs/mongo.js");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/findUser', async (req, res, next) => {
    let {
        name
    } = req.body
    let data = await find(`students`, name ? {
        name
    } : {})
    res.send(data);
});
router.post('/inputUser', async (req, res, next) => {
    let {
        name,
        age,
        skill,
        description,
        city,
        aihao
    } = req.body
    let data = await insert('students', [{
        name:name, 
        age:age, 
        skill:skill, 
        description:description,
        city:city,
        aihao:aihao
    }]);
    res.send('success');
    
});
router.post('/updateUser', async (req, res, next) => {
    let {
        name,
        age,
        skill,
        description,
        city,
        aihao
    } = req.body
    let data = await update('students', {
        name:name
    },{
        name:name,
        age:age, 
        skill:skill, 
        description:description,
        city:city,
        aihao:aihao
    });
    res.send('success');
    
});
router.post('/delUser', async (req, res, next) => {
    let {
        _name,
        _age,
        _skill,
        _description,
        _city,
        _aihao
    } = req.body
    let data = await del('students', {
        name:_name
        // age:_age, 
        // skill:_skill, 
        // description:_description,
        // city:_city,
        // aihao:_aihao
    });
    res.send('success');
    
});

module.exports = router;