import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);

const ArrestsByCountryOfOrigin = ({ values, labels }) => {
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Arrests',
            data: values,
            backgroundColor: ["#0088FE", "#00C49F", "#FFBB28"],
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Arrests by Country of Origin (Top 15)',
        },
    },
    scales: {
        x: { title: { display: true, text: 'CountryOfOrigin' } },
        y: { title: { display: true, text: 'Number of Arrests' }, beginAtZero: true },
    },
};

return (
    <div className="summary-item" style={{ flex: 3 }}>
        <Bar data={data} options={options} 
                width={"400px"}
                height={"200px"}
        />
    </div>);
};

export default ArrestsByCountryOfOrigin;