import React, { useEffect, useState } from 'react';
import '../Financeiro.css';

const formatDateToDay = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

const Table = ({ month, searchTerm }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchItems = async (month, userId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`http://localhost:8080/transacao/receita/${userId}?month=${month}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar os itens');
            }

            const data = await response.json();

            setItems(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userID');
        fetchItems(month, userId);
    }, [month]);

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

            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Erro ao excluir item:', error.message);
        }
    };

    const filteredItems = items.filter(item =>
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    {Object.keys(groupedItems).map((day, index) => (
                        <React.Fragment key={index}>
                            {groupedItems[day].map((item, itemIndex) => (
                                <tr key={itemIndex}>
                                    <td>{new Date(item.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.categoria.descricao}</td>
                                    <td>R$ {item.valor.toFixed(2)}</td>
                                    <td>
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
