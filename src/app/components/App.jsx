'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const App = () => {
    return (
        <div>
            <p>Use this website to browse ICE deportation data and view basic analytics.</p>
            <h2>Menu</h2>
            <ul>
                <li><Link href="/apprehensions">View Apprehensions</Link></li>
                <li><Link href="/detainers">View Detainers</Link></li>
                <li><Link href="/summary">Charts</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
        </div>
    );
}
export default App;