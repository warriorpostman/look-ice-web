import React from 'react';
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend, 
    BarElement,
    LinearScale,
    CategoryScale
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);

import './SummaryItem.css';

const SummaryItem = ({ title, labels, values, type = "pie" }) => {
    const data = {
        labels: labels, 
        datasets: [
            {
            data: values,
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
            },
        ],
    };

    return (
        <div>
        {/* <h3>{title}</h3> */}
        <div className="summary-item">
            <div className="summary-table">
                <table>
                    <thead><tr><th>STATE</th><th>Count</th></tr></thead>
                    <tbody>
                        {labels.map((label, index) => (
                            <tr key={label}>
                                <td>{label}</td>
                                <td>{values[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
            </div>
            <div className="summary-chart">
                <Pie 
                    data={data} 
                    width={"250px"}
                    height={"250px"}
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: title
                            },
                            datalabels: {
                                color: '#fff',
                                anchor: 'center',
                                align: 'center',
                            }
                        }
                    }}
                />
            </div>
        </div>
        </div>
    );
};

export default SummaryItem;