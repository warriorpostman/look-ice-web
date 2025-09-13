import React from "react";
import { Bar } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    BarElement,
    LinearScale,
    CategoryScale
} from 'chart.js';
ChartJS.register(
    ArcElement, 
    Tooltip, 
    LinearScale, 
    CategoryScale, 
    BarElement
);

const ArrestsByMonth = ({ labels, values }) => (
    <div className="summary-item" style={{ flex: 3 }}>
        <Bar
            labels={labels.map(l => new Date(l).toLocaleString('default', { month: 'short', 
                year: 'numeric' 
            })
            )}
            label="# of arrests"
            type="bar"
            data={{
                labels: labels.map(l => 
                    new Date(l).toLocaleString('default', 
                        { month: 'short', year: 'numeric' })
                ),
                datasets: [
                    {
                        label: "# arrests",
                        data: values,
                        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28"],
                        borderWidth: 1,
                    },
                ],
            }}
            width={"500px"}
            height={"200px"}
            options={{
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Monthly Arrests (2023-2025)',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Number of Arrests' }
                    },
                },
            }}
        />
        
    </div>
);

export default ArrestsByMonth;
