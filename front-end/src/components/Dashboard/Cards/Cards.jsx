import React, { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
    const [transacoes, setTransacoes] = useState([]);
    const [saldoAtual, setSaldoAtual] = useState(0);
    const [saldoPrevisto, setSaldoPrevisto] = useState(0);
    const [despesas, setDespesas] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const now = new Date();
                const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
                const fimMes = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

                const response = await axios.get("http://localhost:8080/transacao", {
                    params: {
                        inicio: inicioMes,
                        fim: fimMes,
                    },
                });

                const transacoes = response.data;

                const despesasFiltradas = transacoes.filter((t) => t.categoria.tipo_transacao === "Despesa");
                const receitasFiltradas = transacoes.filter((t) => t.categoria.tipo_transacao === "Receita");

                const saldoAtualCalc = transacoes.reduce(
                    (acc, t) => acc + (t.categoria.tipo_transacao === "Receita" ? t.valor : -t.valor),
                    0
                );
                const saldoPrevistoCalc = saldoAtualCalc + Math.abs(saldoAtualCalc * 0.1);

                setTransacoes(transacoes);
                setDespesas(despesasFiltradas);
                setReceitas(receitasFiltradas);
                setSaldoAtual(saldoAtualCalc);
                setSaldoPrevisto(saldoPrevistoCalc);

            } catch (err) {
                setError("Erro ao carregar as transações.");
                console.error(err);
            }
        };

        fetchTransacoes();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard">
            <div className="balance">
                <div className="balance-info">
                    <h3>Saldo atual</h3>
                    <span>R$ {saldoAtual.toFixed(2)}</span>
                </div>
                <div className="balance-info">
                    <h3>Saldo previsto</h3>
                    <span>R$ {saldoPrevisto.toFixed(2)}</span>
                </div>
            </div>

            <div className="cards">
                <div className="card red">
                    <h4>Despesas</h4>
                    <span className="amount red">
            R$ {despesas.reduce((acc, t) => acc + t.valor, 0).toFixed(2)}
          </span>
                    <ul>
                        {despesas.slice(-3).map((d, index) => (
                            <li key={index}>
                                {d.descricao.substring(0, 10)}: R$ {d.valor.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card green">
                    <h4>Receitas</h4>
                    <span className="amount green">
            R$ {receitas.reduce((acc, t) => acc + t.valor, 0).toFixed(2)}
          </span>
                    <ul>
                        {receitas.slice(-3).map((r, index) => (
                            <li key={index}>
                                {r.descricao.substring(0, 10)}: R$ {r.valor.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Cards;
