'use client'
import React from 'react';
import Link from 'next/link';
import './Menu.css'

const Menu = () => {
    // TODO: explore why using nav here causes layout issues
    // HINT: it's the user agent stylesheet in chrome
    return (
        <nav className="li-menu">
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/apprehensions">Arrests</Link></li>
                <li><Link href="/detainers">Detainers</Link></li>
                <li><Link href="/summary">Charts</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;