import multer from 'multer';
import express from 'express';
import {listPosts, newPost, uploadImage, atualizarNovoPost} from '../controllers/postsController.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest:'./uploads', storage});

const routs = (app) => {
    app.use(express.json());
    
    app.get('/posts', listPosts);

    app.post('/posts', newPost);

    app.post('/upload', upload.single('image'), uploadImage)

    app.put('/upload/:id', atualizarNovoPost )

};

export default routs;
