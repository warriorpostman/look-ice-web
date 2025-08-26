'use client'
import React from 'react';
import './ProjectTask.css';

const ProjectTask = ({ title, description, urgency, status }) => {
    let urgencyStyle = 'task-status-high';
    if (urgency === "MEDIUM") {
        urgencyStyle = 'task-status-medium';
    } else if (urgency === "LOW") {
        urgencyStyle = 'task-status-low';
    }

    return (
        <div className="project-task">
            <div>{title}</div>
            <div>{description}</div>
            <div className={urgencyStyle}>{urgency}</div>
            <div>{status}</div>
        </div>
    ); 
};

export default ProjectTask;