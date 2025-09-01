'use client';
import React, { useEffect, useState } from 'react';
import Apprehensions from '../components/Apprehensions';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ApprehensionPage = () => {
    return (
        <div>
            <Apprehensions />
        </div>
    );
}

export default ApprehensionPage;