import { Link } from 'react-router-dom';
import { FaHome, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-2xl font-black tracking-tight">
                            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
                                <FaHome className="text-white text-sm" />
                            </div>
                            <span className="bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent font-['Dancing_Script'] font-semibold text-3xl italic">
                                HomeHive
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Find your perfect home away from home. Discover unique properties and create unforgettable experiences.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors duration-200"
                            >
                                <FaFacebook className="text-gray-600" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors duration-200"
                            >
                                <FaTwitter className="text-gray-600" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors duration-200"
                            >
                                <FaInstagram className="text-gray-600" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors duration-200"
                            >
                                <FaLinkedin className="text-gray-600" />
                            </a>
                        </div>
                    </div>

                    {/* Community */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Community</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    Disaster relief housing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    Support Afghan refugees
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    Combating discrimination
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-rose-400 text-sm" />
                                <a href="mailto:info@homehive.com" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    info@homehive.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-rose-400 text-sm" />
                                <a href="tel:+1234567890" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-rose-400 text-sm" />
                                <span className="text-gray-600 text-sm">
                                    San Francisco, CA
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    Safety information
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    Cancellation options
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    Our COVID-19 Response
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                                    Report a neighborhood concern
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <span>© 2024 HomeHive, Inc.</span>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors duration-200">Privacy</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors duration-200">Terms</a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900 transition-colors duration-200">Sitemap</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                <FaGlobe />
                                <span>English (US)</span>
                            </button>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">$ USD</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
