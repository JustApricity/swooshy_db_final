let express = require('express');
let router = express.Router();
const animalController = require('../controllers/animalController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const ensureUserAuthenticated = require('../middleware/ensureUserAuthenticated');
const userHasRole = require('../middleware/userHasRole');

router.get('/', function(req, res) {
    res.redirect('/animal');
})
router.get('/animal/add', ensureUserAuthenticated, userHasRole('user'), animalController.renderAddForm);

router.post('/animal/add', ensureUserAuthenticated, userHasRole('user'), animalController.addAnimal);

router.get('/animal/:animalId', animalController.displayAnimal);

router.get('/animal/', animalController.displayAll);

router.get('/animal/:animalId/edit', ensureUserAuthenticated, userHasRole('user'), animalController.renderEditForm);

router.post('/animal/:animalId/edit', ensureUserAuthenticated, userHasRole('user'), animalController.updateAnimal);

router.get('/animal/:animalId/delete', ensureUserAuthenticated, animalController.deleteAnimal);

router.post('/animal/:animalId/comment/create', commentController.createComment);

router.post('/comment/:commentId/reply/create', commentController.addReply);

router.get('/register', userController.renderRegistrationForm);

router.post('/register', userController.register);

router.get('/login', userController.renderLogin);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/comment/:commentId/delete', ensureUserAuthenticated, userHasRole('admin'), commentController.deleteComment);

router.get('/comment/:commentId/reply/:replyId/delete', ensureUserAuthenticated, userHasRole('admin'), commentController.deleteReply);

module.exports = router;
