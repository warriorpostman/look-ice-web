import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ type, labels, values }) => (
    <div>
        {type === "bar" && (
            <Bar
                labels={labels}
                label="# of arrests"
                type="bar"
                data={{
                    labels: labels,
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
                height={"300px"}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
        )}
    </div>
);

export default BarChart;