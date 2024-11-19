import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchReceitas = async (months) => {
  try {
    const response = await fetch('http://localhost:8080/transacao/receitas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ months }),
    });

    if (!response.ok) throw new Error('Erro ao buscar dados do servidor');

    const result = await response.json();
    return result.receitas;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const ModalGraph = ({ isOpen, closeModal }) => {
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Receitas',
        data: [0, 0, 0, 0, 0],
        fill: false,
        borderColor: '#277431',
        tension: 0.1,
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  const updateGraphData = async (newLabels) => {
    setLoading(true);

    const formattedLabels = newLabels.map((label) => {
      const monthIndex = new Date(Date.parse(`${label} 1`)).getMonth() + 1; 
      return `2024-${String(monthIndex).padStart(2, '0')}`;
    });

    const receitas = await fetchReceitas(formattedLabels);

    setData({
      labels: newLabels,
      datasets: [
        {
          label: 'Receitas',
          data: receitas,
          fill: false,
          borderColor: '#11c616',
          tension: 0.1,
        },
      ],
    });

    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      const initialLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      updateGraphData(initialLabels);
    }
  }, [isOpen]);

  const handleLabelsChange = (e) => {
    const newLabels = e.target.value.split(',').map((label) => label.trim());
    updateGraphData(newLabels);
  };

  return (
      <div className={`modal ${isOpen ? 'open' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
          <h2>Gráfico de Receitas</h2>
          {loading ? <p>Carregando...</p> : <Line data={data} />}
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