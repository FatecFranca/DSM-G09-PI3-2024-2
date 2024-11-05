import prisma from '../database/client.js';

const controller = {}

controller.create = async (req, res) => {
    try {
        await prisma.noticia.create({data: req.body});
        console.log(req.body)
        res.status(201).end();
    } catch (err) {
        console.error(err);
        req.status(500).send(err);
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.noticia.findMany({
            orderBy: [{titulo: 'desc'}]
        })
        res.status(200).send(result);
    } catch (err){
        console.error(err);
        req.status(500).send(err);
    }
}

controller.retrieveOne = async function (req, res) {
    try {
        const result = await prisma.noticia.findUnique({
            where: {id: req.params.id},
        })
        if (result) res.send(result)
        else res.status(404).end();
    } catch (err){
        console.error(err);
        req.status(500).send(err);
    }
}

controller.update = async function (req, res) {
    try {
        const result = await prisma.noticia.update({
            where: {id: req.params.id},
            data: req.body,
        })
        if (result) res.status(204).end();
        else res.status(404).end();
    } catch (err){
        console.error(err);
        req.status(500).send(err);
    }
}

controller.delete = async function (req, res) {
    try {
        const result = await prisma.noticia.delete({where: {id: req.params.id}});
        if (result) res.status(204).end()
        else res.status(404).end();
    } catch (err){
        console.error(err);
        req.status(500).send(err);
    }
}

export default controller;