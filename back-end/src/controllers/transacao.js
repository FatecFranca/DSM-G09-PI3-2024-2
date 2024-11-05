import prisma from '../database/client.js';

const controller = {}

controller.create = async (req, res) => {
    try {
        await prisma.transacao.create({
            data: req.body
        })
        res.status(201).end();
    } catch (err){
        console.error(err);
        res.status(500).end()
    }
}

export default controller;
