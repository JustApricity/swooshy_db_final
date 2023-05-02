const {Comment, Reply} = require('../models');

module.exports.createComment = async function (req, res) {
    let animalId = req.params.animalId;
    await Comment.create({
        user_name: req.body.user_name,
        body: req.body.body,
        commented_on: new Date,
        animal_id: animalId
    })
    res.redirect(`/animal/${animalId}`);
}

module.exports.addReply = async function (req, res) {
    const parentComment = await Comment.findByPk(req.params.commentId);
    let animalId = parentComment.animal_id;
    await Reply.create({
        user_name: req.body.user_name,
        body: req.body.body,
        commented_on: new Date,
        animal_id: animalId,
        parent_comment_id: parentComment.id
    })
    res.redirect(`/animal/${animalId}`);
}