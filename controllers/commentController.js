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

module.exports.deleteComment = async function (req, res) {
    const comment = await Comment.findByPk(req.params.commentId);
    await Comment.update({
        is_deleted: true
    }, {
        where: {
            id: req.params.commentId
        }
    })
    res.redirect(`/animal/${comment.animal_id}`);
}

module.exports.deleteReply = async function (req, res) {
    const reply = await Reply.findByPk(req.params.replyId);
    await Reply.update({
        is_deleted: true
    }, {
        where: {
            id: req.params.replyId
        }
    })
    res.redirect(`/animal/${reply.animal_id}`);
}