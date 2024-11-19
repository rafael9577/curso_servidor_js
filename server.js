import express from 'express';

const posts = [
    {
        id: 0,
        descricao: 'Gato brincando com bola',
        imagem: 'https://placecats.com/felix/200/200'
    },
    {
        id: 1,
        descricao: 'Paisagem montanhosa',
        imagem: 'https://picsum.photos/200/300'
    },
    {
        id: 2,
        descricao: 'Comida deliciosa',
        imagem: 'https://loremflickr.com/320/240/food'
    },
    {
        id: 3,
        descricao: 'Cachorro correndo na praia',
        imagem: 'https://placeimg.com/640/480/animals'
    },
    {
        id: 4,
        descricao: 'Desenho abstrato',
        imagem: 'https://source.unsplash.com/random'
    }
];

const app = express();
app.use(express.json());

function buscaPostID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
};

app.listen(3000, () => {
    console.log('Inicio');
});

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

app.get('/posts/:id', (req, res) => {
    const index = buscaPostID(req.params.id);
    res.status(200).json(posts[index]);
});
