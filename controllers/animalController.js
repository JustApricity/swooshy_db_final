const {Animal, Comment, Reply} = require('../models');
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
        image_url: `/images/${req.body.color}/${req.body.type}/${req.body.age}.png`,
        user_id: req.user.id,
        created_on: new Date()
    });
    res.redirect('/')
}

module.exports.displayAnimal = async function(req, res){
    const animal = await Animal.findByPk(req.params.animalId, {
        include: [
            'user',
            {
                model: Comment,
                as: 'comments',
                required: false,
                include: [{
                    model: Reply,
                    as: 'replies',
                    required: false
                }]
            }
        ],
        order: [
            ['comments', 'commented_on', 'desc']
        ]
    })
    res.render('animals/view', {animal});
}

module.exports.displayAll = async function (req, res) {
    const animals = await Animal.findAll({
        include: ['user']
    });
    res.render('animals/viewAll', {animals});
}

module.exports.renderEditForm = async function (req, res) {
    const animal = await Animal.findByPk(req.params.animalId);
    if (!animal.isOwnedBy(req.user)) {
        res.redirect('/');
        return;
    }
    res.render('animals/edit', {animal, ages, colors, types});
}

module.exports.updateAnimal = async function (req, res) {
    const animal = await Animal.findByPk(req.params.animalId);
    if (!animal.isOwnedBy(req.user)) {
        res.redirect('/');
        return;
    }
    await Animal.update({
        color: req.body.color,
        type: req.body.type,
        age: req.body.age,
        backstory: req.body.backstory,
        image_url: `/images/${req.body.color}/${req.body.type}/${req.body.age}.png`
    }, {
        where: {
            id: req.params.animalId
        }
    });
    res.redirect(`/animal/${req.params.animalId}`);
}

module.exports.deleteAnimal = async function (req, res) {
    const animal = await Animal.findByPk(req.params.animalId);
    if (!user.is('admin') && !animal.isOwnedBy(user)) {
        res.redirect('/');
        return;
    }
    await Animal.destroy({
        where: {
            id: req.params.animalId
        }
    });
    res.redirect('/')
}