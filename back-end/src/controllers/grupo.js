import prisma from '../database/client.js';
import {includeRelations} from "../lib/utils.js";

const controller = {}


controller.create = async (req, res) => {
    try {
        const grupoBody = req.body;
        const grupoCriado = await prisma.grupo.create({
            data: {
                nome: grupoBody.nome,
                descricao: grupoBody.descricao,
                usuario: {
                    connect: {id: grupoBody.usuario}
                }
            }
        });
        await prisma.usuariosGrupo.create({
            data: {
                grupo_id: grupoCriado.id,
                usuario_id: grupoBody.usuario
            }
        });
        res.status(201).send(grupoCriado);
    } catch (err) {
        console.error(err);
        req.status(500).send(err);
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const include = includeRelations(req.query);
        const result = await prisma.grupo.findMany({
            include,
            where: {usuario_id: req.body.usuario},
        })
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        req.status(500).send(err);
    }
}

controller.retrieveOne = async function (req, res) {
    try {
        const result = await prisma.grupo.findUnique({
            where: {
                id: req.params.id,
                usuario_id: req.body.usuario
            },
        })
        if (result) res.send(result)
        else res.status(404).end();
    } catch (err) {
        console.error(err);
        req.status(500).send(err);
    }
}

controller.update = async function (req, res) {
    try {
        const grupoBody = req.body;
        const result = await prisma.grupo.update({
            where: {id: req.params.id},
            data: {
                nome: grupoBody.nome,
                descricao: grupoBody.descricao,
                usuario: {
                    connect: {id: grupoBody.usuario}
                }
            }
        })
        if (result) res.status(204).end();
        else res.status(404).end();
    } catch (err) {
        console.error(err);
        req.status(500).send(err);
    }
}

controller.delete = async function (req, res) {
    try {
        const usuariosGrupos = await prisma.usuariosGrupo.findMany({
            where: {
                grupo_id: req.params.id,
            }
        });
        console.log(usuariosGrupos);
        const findUserGrupo = await prisma.grupo.findUnique({
            where: {
                id: req.params.id,
                usuario_id: req.body.usuario
            }
        });
        if (findUserGrupo) {
            for (const usuariosGrupo of usuariosGrupos) {
                await prisma.usuariosGrupo.delete
                ({
                    where:
                        {
                            usuario_id_grupo_id: {
                                usuario_id: usuariosGrupo.usuario_id,
                                grupo_id: req.params.id,
                            }
                        }
                });
            }
            await prisma.grupo.delete({where: {id: req.params.id}});
            res.status(204).end()
        } else {
            res.status(404).send({message: "Grupo não encontrada ou usuário não autorizado."});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

controller.addUserToGroup = async (req, res) => {
    try {
        const {grupo_id, usuario_id} = req.body;
        const grupoExists = await prisma.grupo.findUnique({
            where: {id: grupo_id},
        })
        if (!grupoExists){
            res.status(404).send({message:"Grupo não encontrado"})
        }
        await prisma.usuariosGrupo.create({
            data: {
                grupo_id: grupo_id,
                usuario_id: usuario_id
            }
        });
        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

controller.removeUserFromGroup = async (req, res) => {
    try {
        const {grupo_id, usuario_id} = req.body;
        await prisma.usuariosGrupo.delete({
                where: {
                    usuario_id_grupo_id: {
                        usuario_id: usuario_id,
                        grupo_id: grupo_id
                    }
                }
            }
        );
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

controller.getGroupUsers = async (req, res) => {
    try {
        const {grupoId} = req.params;
        const usuarios = await prisma.usuariosGrupo.findMany({
            where: {grupo_id: grupoId},
            include: {usuario: true}
        });
        res.status(200).send(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

controller.getUserGroups = async (req, res) => {
    try {
        const userId = req.params.id;
        const grupos = await prisma.usuariosGrupo.findMany({
            where: {
                usuario_id: userId,
            },
            include: {grupo: true}
        })
        res.status(200).send(grupos);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

export default controller;