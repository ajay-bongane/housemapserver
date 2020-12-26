const House = require('../models/house');
const schema = require('./validate');
const jwt = require('jsonwebtoken');
const { func } = require('@hapi/joi');

// Endpoint business logic layer
exports.getDefault = function(req, res) {
    res.send('You are on route folder');
};

exports.getHouseMap = function(req, res) {
    let name = req.body.name;
    House.find({name: name},(err, results)=>{
        if(err) {
            res.end(err.message);
        } else {
            res.send(results);
        }
    });
};

exports.addNewHouse = function(req, res) {
    const house = new House();;
    house.name = req.body.name;
    house.houseMap = req.body.houseMap;
    house.save({},(err, results)=>{
        if(err) {
            res.end(err.message);
        } else {
            res.send(`Created/updated ${house.name}`);
        }
    });
};

exports.updateHouseMap = function(req, res) {
    let name = req.body.name;
    let houseMap = req.body.houseMap;
    House.updateOne(
        {name: name},
        {$set:{houseMap: houseMap}},
        {upsert:false},
        (err, results)=>{
        if(err) {
            res.end(err.message);
        } else {
            res.send(`House ${name} updated`);
        }
    });
};

exports.addNewProfile = function(req, res) {
    const {error} = schema.validate(req.body);
    if (error)
        return res.status(400).json({error: error.details[0].message});
    const house = new House();
    house.name = req.body.name;
    house.pass = req.body.pass;
    house.houseMap = {};
    house.save({}, function(err, result) {
        if (err) {
            res.end(err);
        } else {
            jwt.sign({
                name:house.name,
                userID:house._id
            },
            "mysecret",
            {expiresIn:"1hr"},
            function (err, token) {
                if(err) res.end(err);
                res.json({message:`Created ${house.name}`,token:token});
            })
        }
    });
};

exports.loginUser = function (req, res) {
    let name = req.body.name;
    let pass = req.body.pass;

    House.find({name:name}, function (err, results) {
        if (err) res.end(err.message);
            if (pass == results[0].pass) {
                jwt.sign(
                    {
                        name:results[0].name,
                        userID:results[0]._id
                    },
                    "mysecret",
                    {expiresIn:"1hr"},
                    function(err, token) {
                        if(err) throw error;
                        res.json({token:token});
                    }
                );
            } else {
                res.send({status: "Login failed"})
            }
    })
};