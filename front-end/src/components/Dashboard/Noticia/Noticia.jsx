import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import '../styleboard.css';

const NewsCards = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get('/noticia');
                setNews(response.data);
            } catch (err) {
                setError('Erro ao carregar as notícias.');
                console.error(err);
            }
        };

        fetchNews();
    }, []);

    if (error) return <p>{error}</p>;
    if (news.length === 0) return <p>Carregando...</p>;
    return (
        <div className="news-cards-container">
            {news.map((item) => (
                <div className="news-card" key={item.id}>
                    <img src={item.imagem} alt={item.titulo} />
                    <div className="news-card-content">
                        <h5>{item.titulo}</h5>
                        <p>{new Date(item.data_noticia).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsCards;
