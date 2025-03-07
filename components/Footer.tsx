// components/Footer.tsx
import React from 'react';
import {
    FiTwitter,
    FiInstagram,
    FiFacebook,
} from "react-icons/fi";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            id: 1,
            icon: <FiFacebook />,
            url: "#",
        },
        {
            id: 2,
            icon: <FiTwitter />,
            url: "#",
        },
        {
            id: 3,
            icon: <FiInstagram />,
            url: "#",
        },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-white text-lg font-semibold mb-4">SalesPro</h3>
                        <p className="text-sm text-gray-400">
                            Revolutionizing the way businesses manage their sales and inventory
                            with cutting-edge solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-1">
                        <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm">
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-400">
                                1234 Market Street
                            </li>
                            <li className="text-sm text-gray-400">
                                Suite 900
                            </li>
                            <li className="text-sm text-gray-400">
                              Akure, Industrial layout
                            </li>
                            <li className="text-sm text-gray-400">
                                Email: info@salespro.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <div className="flex space-x-6">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                                >
                                    <span className="text-xl">{link.icon}</span>
                                </a>
                            ))}
                        </div>

                        <div className="text-sm text-gray-400">
                            © {currentYear} SalesPro. All rights reserved.
                        </div>

                        <div className="flex space-x-6">
                            <a href="#" className="text-sm text-gray-400 hover:text-orange-500">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-gray-400 hover:text-orange-500">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
