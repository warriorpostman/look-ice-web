'use client'

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ArrestsByState from './components/ArrestsByState';
import ArrestsByCountryOfOrigin from './components/ArrestsByCountryOfOrigin';
import ArrestsByMonth from './components/ArrestsByMonth';
ChartJS.register(ArcElement, Tooltip, Legend);
import SummaryItem from './components/SummaryItem';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import './Summary.css';

export default function Summary() {
    const [summary, setSummary] = useState({
        apprehensionsByState: [],
        apprehensionsByGender: [],
        apprehensionsByCriminality: [],
        apprehensionsByCitizenshipCountry: [],
    });
    useEffect(() => {
        fetch(`${apiUrl}/api/apprehensions/summary`)
            .then(response => response.json())
            .then(data => {
                // console.log('Fetched summary:', data);
                setSummary(data);
            })
            .catch(error => {
                console.error('Error fetching summary:', error);
            });
    }, []);
    const arrestMonths = [
        ["2023-09",10515],["2023-10",10006],["2023-11",8826],["2023-12",9803],
        ["2024-01",8464],["2024-02",9542],["2024-03",9505],["2024-04",10136],["2024-05",10223],["2024-06",8460],["2024-07",9445],["2024-08",9143],["2024-09",8408],["2024-10",9580],["2024-11",8250],["2024-12",8542],
        ["2025-01",12284],["2025-02",17327],["2025-03",18761],["2025-04",17877],["2025-05",22635],["2025-06",27494]
    ];

    let topDataByState = []
    let labels = [];
    let values = []
    if (summary.apprehensionsByState.length > 0) {
        topDataByState = summary.apprehensionsByState.slice(0, 15);
        // const remainingCount = summary.apprehensionsByState
        //     .slice(16, summary.apprehensionsByState.length)
        //     .reduce((acc, item) => acc = acc + item[1], 0);
        // topDataByState.push(['All Other States', remainingCount]);
        labels = topDataByState.slice(0, 15).map(item => item[0]);
        values = topDataByState.slice(0,15).map(item => item[1]);
    }

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
            <h2>Arrest Summaries</h2>
            <div className="summary-container">
                {summary.apprehensionsByGender.length !== 0 ?
                    <SummaryItem 
                        title="Count By Gender" 
                        labels={summary.apprehensionsByGender.map(values => values[0])}
                        values={summary.apprehensionsByGender.map(values => values[1])}
                        data={{
                            labels: summary.apprehensionsByGender.map(values => values[0]), // summary.apprehensionsByState.length > 0 ? summary.apprehensionsByState.map(value => value[0]) : [],
                            datasets: [
                                {
                                data: summary.apprehensionsByGender.map(values => values[1]), // summary.apprehensionsByState.length > 0 ? summary.apprehensionsByState.map(value => value[1]) : [],
                                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
                                },
                        ],
                        }} 
                    />
                    : <div> Loading... </div>}
                {summary.apprehensionsByCriminality.length !== 0 ?
                    <SummaryItem 
                        title="Count By Criminality" 
                        labels={summary.apprehensionsByCriminality.map(values => values[0])}
                        values={summary.apprehensionsByCriminality.map(values => values[1])}
                        data={{
                            labels: summary.apprehensionsByCriminality.map(values => values[0]), // summary.apprehensionsByState.length > 0 ? summary.apprehensionsByState.map(value => value[0]) : [],
                            datasets: [
                                {
                                data: summary.apprehensionsByCriminality.map(values => values[1]), // summary.apprehensionsByState.length > 0 ? summary.apprehensionsByState.map(value => value[1]) : [],
                                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
                                },
                        ],
                        }} 
                    />
                    : <div> Loading... </div>}
                {summary.apprehensionsByState.length !== 0 ?
                    <ArrestsByState 
                        labels={labels}
                        values={values}
                    />
                : <div> Loading... </div>}
                {summary.apprehensionsByCitizenshipCountry.length !== 0 ?
                    <ArrestsByCountryOfOrigin 
                        labels={summary.apprehensionsByCitizenshipCountry.slice(0,15).map(values => values[0])}
                        values={summary.apprehensionsByCitizenshipCountry.slice(0,15).map(values => values[1])}
                    />
                    : <div> Loading... </div>}
                {arrestMonths.length !== 0 ?
                    <ArrestsByMonth 
                        labels={arrestMonths.map(values => values[0])}
                        values={arrestMonths.map(values => values[1])}
                    />
                    : <div> Loading... </div>}
            </div>
        </div>
    );
}