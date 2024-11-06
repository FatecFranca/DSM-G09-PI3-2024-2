import prisma from '../database/client.js';
import {includeRelations} from "../lib/utils.js";
import req from "express/lib/request.js";

const controller = {}

controller.create = async (req, res) => {
    try {
        const transacaoBody = req.body;
        await prisma.transacao.create({
            data: {
                valor: transacaoBody.valor,
                descricao: transacaoBody.descricao,
                data: transacaoBody.data,
                metodo_pagamento: transacaoBody.metodo_pagamento,
                tipo_transacao: transacaoBody.tipo_transacao,
                categoria: {
                    connect: {id: transacaoBody.categoria}
                },
                usuario: {
                    connect: {id: transacaoBody.usuario},
                }
            }
        })
        res.status(201).end();
    } catch (err) {
        console.error(err);
        res.status(500).end()
    }
}

controller.retrieveAll = async (req, res) => {
    try {
        const include = includeRelations(req.query);
        const result = await prisma.transacao.findMany({
            include,
            where: {
                usuario_id: req.body.usuario
            },
            orderBy: [{data: 'desc'}]
        })
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        req.status(500).send(err);
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const include = includeRelations(req.query);
        const result = await prisma.transacao.findUnique({
            include,
            where: {
                id: req.params.id,
                usuario_id: req.body.usuario,
            },
        })

        if (!result) res.send(404).end();
        else res.send(result);
    } catch (err) {
        console.error(err);
        req.status(500).send(err);
    }
}

controller.update = async (req, res) => {
    try {
        const transacaoBody = req.body;
        const result = await prisma.transacao.update({
            where: {id: req.params.id},
            data: {
                valor: transacaoBody.valor,
                descricao: transacaoBody.descricao,
                data: transacaoBody.data,
                metodo_pagamento: transacaoBody.metodo_pagamento,
                tipo_transacao: transacaoBody.tipo_transacao,
                categoria: {
                    connect: {id: transacaoBody.categoria}
                },
                usuario: {
                    connect: {id: transacaoBody.usuario},
                }
            }
        })
        if (result) res.status(204).end();
        else res.status(404).end();
    } catch (err){
        console.error(err);
        res.status(500).send(err);
    }
}

controller.delete = async (req, res) => {
    try {
        const transacao = await prisma.transacao.findFirst({
            where: {
                id: req.params.id,
                usuario_id: req.body.usuario,
            }
        })
        if (transacao) {
            await prisma.transacao.delete({
                where: {id: req.params.id}
            })
            res.status(204).end();
        } else {
            res.status(404).send({ message: "Categoria não encontrada ou usuário não autorizado." });
        }
    } catch (err){
        console.error(err);
        res.status(500).send(err);
    }
}
export default controller;
