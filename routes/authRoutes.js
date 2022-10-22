const { Router } = require('express')
const authController = require('../controllers/authController')
const appController = require('../controllers/appController')
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const router = Router();
router.get('*',checkUser);
router.get('/register', authController.register_get);
router.post('/register', authController.register_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/newimage',requireAuth, appController.newimage_get);
router.post('/newimage',requireAuth, appController.newimage_post);
router.post('/addcomment',requireAuth, appController.addcomment_post);
router.post('/updateAlbum',requireAuth, appController.update_image_album_post);


router.get('/newalbum', requireAuth, appController.newalbum_get);
router.post('/newalbum', appController.newalbum_post);

router.get('/images', requireAuth, appController.images_get);
router.get('/images/:id',requireAuth, appController.images_getOne);
router.get('/images/delete/:id',requireAuth, appController.images_deleteOne);

router.get('/albums',requireAuth, appController.albums_get);
router.get('/albums/:id',requireAuth, appController.albums_getOne);
router.get('/albums/delete/:id',requireAuth, appController.albums_deleteOne);



module.exports = router;
