import fs from 'fs';
import gerarDescricaoComGemini from '../services/geminiServices.js'
import { getAllPosts, create, atualizar } from "../models/postsModel.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function newPost(req, res) {
    const post = req.body;
    try {
        const createPost = await create(post);
        res.status(200).json(createPost);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ 'Error': 'falha na requisição' })
    };
}

export async function uploadImage(req, res) {
    const post = {
        'descrição': '',
        'imgUrl': req.file.originalname,
        'alt': ''
    }
    try {
        const createPost = await create(post);
        const imageCreat = `uploads/${createPost.insertedId}.png`
        fs.renameSync(req.file.path, imageCreat)
        res.status(200).json(createPost);
    } catch (error) {
        console.error(error.message)

        res.status(500).json({ 'Error': 'falha na requisição' })
    };
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImage = `https://cursoservidorjs-2550204813.southamerica-east1.run.app/${id}.png`
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer)

        const post = {
            imgUrl: urlImage,
            descricao: descricao,
            alt: req.body.alt
        }

        const newPost = await atualizar(id, post);
        res.status(200).json(newPost);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ 'Error': 'falha na requisição' })
    };
}
