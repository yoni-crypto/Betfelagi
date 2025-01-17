import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
                phoneNumber,
            });
            toast.success("Registered successfully. Please log in!");
            setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="container mx-auto py-8 max-w-md">
            <ToastContainer position="top-center" autoClose={3000} />
            <h2 className="text-xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleRegister} className="bg-white shadow-md rounded-md p-6">
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Phone Number</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
