const {Animal} = require('../models');
let ages = ['young', 'adult', 'elder'];
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
let types = ['avian', 'reptilian', 'aquatic', 'arboreal', 'nocturnal', 'scavenger'];

module.exports.renderAddForm = async function(req, res) {
    const animal = {
        color: '',
        type: '',
        age: '',
    };
    res.render('animals/add', {animal, ages, colors, types});
};

module.exports.addAnimal = async function (req,res) {
    const animal = await Animal.create({
        color: req.body.color,
        type: req.body.type,
        age: req.body.age,
        user_id: 1, // todo get logged in
        created_on: new Date()
    });
    res.redirect('/') // todo change the redirect to view all once made
}

module.exports.displayAnimal = async function(req, res){
    const animal = await Animal.findByPk(req.params.animalId, {
        include: ['user']
    })
    res.render('animals/view', {animal});
}

module.exports.displayAll = async function (req, res) {
    const animals = await Animal.findAll({
        include: ['user']
    });
    res.render('animals/viewAll', {animals});
}