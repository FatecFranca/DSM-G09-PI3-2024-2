import React, { useEffect, useState } from 'react';
import '../Financeiro.css';

// Função para formatar a data como o nome do dia da semana
const formatDateToDay = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

const Table = ({ month, searchTerm }) => {
    const [items, setItems] = useState([]); // Estado para armazenar os itens
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro, caso algo aconteça na requisição

    // Função para buscar itens do back-end
    const fetchItems = async (month) => {
        try {
            setLoading(true);
            setError(null); // Limpa o erro anterior, se houver

            // Faz a requisição para pegar os itens com base no mês
            const response = await fetch(`http://localhost:8080/transacao/receita?month=${month}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Verifica se a requisição foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar os itens');
            }

            // Converte a resposta para JSON
            const data = await response.json();

            // Atualiza o estado com os itens recebidos
            setItems(data);
        } catch (error) {
            setError(error.message); // Caso ocorra um erro, armazena o erro
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    useEffect(() => {
        fetchItems(month); // Chama a função toda vez que o mês mudar
    }, [month]);

    // Função para excluir item
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/transacao/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o item');
            }

            // Atualiza os itens após a exclusão
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Erro ao excluir item:', error.message);
        }
    };

    // Filtra os itens com base no texto de busca
    const filteredItems = items.filter(item =>
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Agrupar transações por dia da semana
    const groupedItems = filteredItems.reduce((groups, item) => {
        const day = formatDateToDay(item.data);
        if (!groups[day]) {
            groups[day] = [];
        }
        groups[day].push(item);
        return groups;
    }, {});

    return (
        <section className="fin-table-container">
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>Erro ao carregar os dados: {error}</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Renderiza cada grupo de transações, agrupadas pelo dia da semana */}
                    {Object.keys(groupedItems).map((day, index) => (
                        <React.Fragment key={index}>
                            {groupedItems[day].map((item, itemIndex) => (
                                <tr key={itemIndex}>
                                    <td>{new Date(item.data).toLocaleDateString()}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.categoria.descricao}</td>
                                    <td>R$ {item.valor.toFixed(2)}</td>
                                    <td >
                                        <div className="td-button">
                                            <button
                                                className="Delete-button"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default Table;
