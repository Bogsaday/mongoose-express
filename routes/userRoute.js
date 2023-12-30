const { newUser, createProfile, listProfiles } = require('../controllers/userController');

const router= require('express').Router()
// import {Router} from 'express

// get all profiles with users

router.get('/list/profiles', listProfiles)


// register user api

router.post('/new', newUser)
router.post('/new/profile', createProfile)


module.exports = router;