import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "./styleModRD.css"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ModalGraph = ({ isOpen, closeModal }) => {
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Receita',
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: '#742774',
        tension: 0.1,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      const newData = { ...prevData };
      if (name === 'labels') {
        newData.labels = value.split(',');
      } else {
        newData.datasets[0].data = value.split(',').map((num) => parseInt(num, 10));
      }
      return newData;
    });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Gráfico de Receitas</h2>
        <Line data={data} />
        <div className="form-container">
          <h3>Configurar Dados</h3>
          <label>
            Labels (Meses):
            <input
              type="text"
              name="labels"
              value={data.labels.join(',')}
              onChange={handleChange}
              placeholder="Jan,Feb,Mar,Apr,May"
            />
          </label>
          <label>
            Dados de receitas:
            <input
              type="text"
              name="data"
              value={data.datasets[0].data.join(',')}
              onChange={handleChange}
              placeholder="65,59,80,81,56"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalGraph;
