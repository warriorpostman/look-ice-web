'use client'

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
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

    let topDataByState = []
    let labels = [];
    let values = []
    if (summary.apprehensionsByState.length > 0) {
        topDataByState = summary.apprehensionsByState.slice(0, 15);
        const remainingCount = summary.apprehensionsByState
            .slice(16, summary.apprehensionsByState.length)
            .reduce((acc, item) => acc = acc + item[1], 0);
        topDataByState.push(['All Other States', remainingCount]);
        labels = topDataByState.map(item => item[0]);
        values = topDataByState.map(item => item[1]);
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
            <h2>Apprehensions Summary</h2>
            <div className="summary-container">
                {summary.apprehensionsByState.length !== 0 ?
                    <SummaryItem 
                        title="Count By State" 
                        labels={labels}
                        values={values}
                        data={data} 
                    />
                : <div> Loading... </div>}
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
                {summary.apprehensionsByCitizenshipCountry.length !== 0 ?
                    <SummaryItem 
                        title="Count By Citizenship/Country" 
                        labels={summary.apprehensionsByCitizenshipCountry.map(values => values[0])}
                        values={summary.apprehensionsByCitizenshipCountry.map(values => values[1])}
                        data={{
                            labels: summary.apprehensionsByCitizenshipCountry.map(values => values[0]), // summary.apprehensionsByState.length > 0 ? summary.apprehensionsByState.map(value => value[0]) : [],
                            datasets: [
                                {
                                data: summary.apprehensionsByCitizenshipCountry.map(values => values[1]), // summary.apprehensionsByState.length > 0 ? summary.apprehensionsByState.map(value => value[1]) : [],
                                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
                                },
                        ],
                        }} 
                    />
                    : <div> Loading... </div>}
            </div>
        </div>
    );
}