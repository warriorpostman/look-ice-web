'use client'
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import './Menu.css'

const Menu = () => {
    // TODO: explore why using nav here causes layout issues
    // HINT: it's the user agent stylesheet in chrome
    const [activeIndex, setActiveIndex] = useState(null);

    const handleLinkClick = (index) => {
        setActiveIndex(index);
    };
    const linkProps = [
        { href: "/", label: "Home" },
        { href: "/apprehensions", label: "Arrests" },
        { href: "/detainers", label: "Detainers" },
        { href: "/summary", label: "Charts" },
        { href: "/about", label: "About" }
    ];
    return (
        <nav className="li-menu">
            <ul>
                {linkProps.map((link, index) => (
                    <li key={link.href}>
                        <Link
                            className={activeIndex === index && "current-link"}
                            href={link.href}
                            onClick={() => handleLinkClick(index)}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;