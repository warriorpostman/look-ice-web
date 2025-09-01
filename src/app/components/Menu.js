'use client'
import React from 'react';
import Link from 'next/link';
import './Menu.css'

const Menu = () => {
    return (
        <div className="li-menu">
            <h2>Menu</h2>
            <ul>
                <Link href="/">Home</Link>
                <li><Link href="/apprehensions">View Apprehensions</Link></li>
                <li><Link href="/detainers">View Detainers</Link></li>
                <li><Link href="/summary">Charts</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
        </div>
    );
};

export default Menu;