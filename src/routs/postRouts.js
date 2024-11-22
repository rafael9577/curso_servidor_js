import express from 'express'
import listPosts from '../controllers/postsController.js';

const routs = (app) => {
    app.use(express.json())
    
    app.get('/posts', listPosts);
};

export default routs;
