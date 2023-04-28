const {Animal} = require('../models');
let ages = ['Young', 'Adult', 'Elder'];
let colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
let types = ['Avian', 'Reptilian', 'Aquatic', 'Arboreal', 'Nocturnal', 'Scavenger'];

module.exports.renderAddForm = async function(req, res) {
    const animal = {
        color: '',
        type: '',
        age: '',
        backstory: '',
    };
    res.render('animals/add', {animal, ages, colors, types});
};

module.exports.addAnimal = async function (req,res) {
    const animal = await Animal.create({
        color: req.body.color,
        type: req.body.type,
        age: req.body.age,
        backstory: req.body.backstory,
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

module.exports.capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}