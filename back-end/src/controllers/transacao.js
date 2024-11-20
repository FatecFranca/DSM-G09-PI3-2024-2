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
        const { inicio, fim } = req.query;
        if (!inicio || !fim) {
            return res.status(400).send({ error: "Os parâmetros 'inicio' e 'fim' são obrigatórios." });
        }
        console.log(inicio)
        console.log(fim)
        const result = await prisma.transacao.findMany({
            where: {
                data: {
                    gte: new Date(inicio),
                    lte: new Date(fim),
                },
            },
            include: {
                categoria: true,
            },
            orderBy: { data: "desc" },
        });
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

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

controller.getReceitasByMonths = async (req, res) => {
    try {
        const { months } = req.body;
        if (!Array.isArray(months) || months.length === 0) {
            return res.status(400).json({ error: 'Meses inválidos ou ausentes.' });
        }
        const filters = months.map((month) => {
            const [year, monthNumber] = month.split('-');
            const startDate = new Date(`${year}-${monthNumber}-01T00:00:00.000Z`);
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);

            return {
                data: {
                    gte: startDate,
                    lt: endDate,
                },
            };
        });
        const receitas = await prisma.transacao.findMany({
            where: {
                OR: [
                    { tipo_transacao: 'Receita' },
                    {
                        categoria: {
                            tipo_transacao: 'Receita',
                        },
                    },
                ],
            },
        });
        const valoresPorMes = months.map((month) => {
            const total = receitas
                .filter((r) => r.data.toISOString().startsWith(month))
                .reduce((sum, r) => sum + r.valor, 0);
            return total;
        });
        res.json({ receitas: valoresPorMes });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

controller.getDespesaByMonths = async (req, res) => {
    try {
        const { months } = req.body;
        if (!Array.isArray(months) || months.length === 0) {
            return res.status(400).json({ error: 'Meses inválidos ou ausentes.' });
        }
        const filters = months.map((month) => {
            const [year, monthNumber] = month.split('-');
            const startDate = new Date(`${year}-${monthNumber}-01T00:00:00.000Z`);
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);

            return {
                data: {
                    gte: startDate,
                    lt: endDate,
                },
            };
        });
        const receitas = await prisma.transacao.findMany({
            where: {
                OR: [
                    { tipo_transacao: 'Despesa' },
                    {
                        categoria: {
                            tipo_transacao: 'Despesa',
                        },
                    },
                ],
            },
        });
        const valoresPorMes = months.map((month) => {
            const total = receitas
                .filter((r) => r.data.toISOString().startsWith(month))
                .reduce((sum, r) => sum + r.valor, 0);
            return total;
        });
        res.json({ despesas: valoresPorMes });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

controller.getReceitasByMonth = async (req, res) => {
    try {
        const { month } = req.query;
        const { userId } = req.params;

        if (!month) {
            return res.status(400).json({ error: 'Mês ausente ou inválido.' });
        }

        const monthMapping = {
            Janeiro: '01',
            Fevereiro: '02',
            Março: '03',
            Abril: '04',
            Maio: '05',
            Junho: '06',
            Julho: '07',
            Agosto: '08',
            Setembro: '09',
            Outubro: '10',
            Novembro: '11',
            Dezembro: '12',
        };

        const monthNumber = monthMapping[month];

        if (!monthNumber) {
            return res.status(400).json({ error: 'Mês inválido. Use o nome completo do mês (ex: Janeiro, Fevereiro, etc.).' });
        }

        const year = new Date().getFullYear();

        const startDate = new Date(`${year}-${monthNumber}-01T00:00:00.000Z`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        const receitas = await prisma.transacao.findMany({
            where: {
                data: {
                    gte: startDate,
                    lt: endDate,
                },
                usuario_id: userId,
            },
            include: {
                categoria: true,
            },
        });

        // Retorna as receitas encontradas (não a soma)
        res.json(receitas);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor: ' + err.message);
    }
};

export default controller;
