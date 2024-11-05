import prisma from '../database/client.js';
import {includeRelations} from "../lib/utils.js";

const controller = {}

controller.create = async (req, res) => {
    try {
        const categoriaBody = req.body;
        await prisma.categoria.create(
            {
                data: {
                    descricao: categoriaBody.descricao,
                    ativo: categoriaBody.ativo,
                    tipo_transacao: categoriaBody.tipo_transacao,
                    usuario: {
                        connect: {id: categoriaBody.usuario},
                    }
                }
            }
        )
        res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const include = includeRelations(req.query);
        const result = await prisma.categoria.findMany({
            include,
            where: {
                usuario: {id: req.body.usuario},
                ativo: true,
            },
            orderBy: [{descricao: 'asc'}]
        })
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

controller.retrieveOne = async function (req, res) {
    try {
        const include = includeRelations(req.query);
        const result = await prisma.categoria.findUnique({
            include,
            where: {
                id: req.params.id,
                usuario: {id: req.body.usuario}
            }
        })
        if (result) res.send(result)
        else res.status(404).end();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }

}

controller.update = async function (req, res) {
    try {
        const categoriaBody = req.body;
        const result = await prisma.categoria.update({
            where: {
                id: req.params.id,
            },
            data: {
                descricao: categoriaBody.descricao,
                ativo: categoriaBody.ativo,
                tipo_transacao: categoriaBody.tipo_transacao,
                usuario: {
                    connect: {id: categoriaBody.usuario},
                }
            }
        })
        if (result) res.status(204).end();
        else res.status(404).end();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

controller.delete = async function (req, res) {
    try {
        const categoria = await prisma.categoria.findFirst({
        where: {
            id: req.params.id,
            usuario: { id: req.body.usuario }
        }
    });
        if (categoria) {
            await prisma.categoria.delete({
                where: {
                    id: req.params.id
                }
            });
            res.status(204).end();
        } else {
            res.status(404).send({ message: "Categoria não encontrada ou usuário não autorizado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}


export default controller;