import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ModalGraph = ({ isOpen, closeModal }) => {
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Receitas',
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: '#742774',
        tension: 0.1,
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  const fetchReceitas = async (months) => {
    try {
      setLoading(true);

      const response = await fetch('/transacao/receitas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ months }),
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const result = await response.json();
      return result.receitas; // Exemplo: [100, 200, 300, ...]
    } catch (error) {
      console.error(error);
      return []; // Retorna array vazio em caso de erro
    } finally {
      setLoading(false);
    }
  };

  const handleLabelsChange = async (e) => {
    const newLabels = e.target.value.split(',').map((label) => label.trim());

    // Busca os dados atualizados para os meses
    const receitas = await fetchReceitas(newLabels);

    // Atualiza o estado do gráfico
    setData((prevData) => ({
      ...prevData,
      labels: newLabels,
      datasets: [
        {
          ...prevData.datasets[0],
          data: receitas,
        },
      ],
    }));
  };

  return (
      <div className={`modal ${isOpen ? 'open' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Gráfico de Receitas</h2>
          {loading ? (
              <p>Carregando...</p>
          ) : (
              <Line data={data} />
          )}
          <div className="form-container">
            <h3>Configurar Dados</h3>
            <label>
              Labels (Meses):
              <input
                  type="text"
                  name="labels"
                  value={data.labels.join(',')}
                  onChange={handleLabelsChange}
                  placeholder="Jan,Feb,Mar,Apr,May"
              />
            </label>
          </div>
        </div>
      </div>
  );
};

export default ModalGraph;
