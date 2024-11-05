import prisma from '../database/client.js';

const controller = {}

controller.login = async function (req, res) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!usuario) {
            return res.status(404).send("Usuário não encontrado");
        }

        if (req.body.password !== usuario.password) {
            return res.status(401).send("Senha incorreta");
        }

        res.send({
            message: "Login bem-sucedido",
            user: {user: usuario.user, id: usuario.id, email: usuario.email},
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

controller.create = async function (req, res) {
    try {
        await prisma.usuario.create({data: req.body});
        res.status(201).end();
    } catch (err) {
        console.error(err);
        req.status(500).send(err);
    }
}

export default controller;