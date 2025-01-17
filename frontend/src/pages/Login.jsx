import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Login successful!');
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds to allow the toast to be visible
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="container mx-auto mt-24 py-8 max-w-md">
            <ToastContainer position="top-center" autoClose={3000} />
            <h2 className="text-xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded-md p-6">
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
                    Login
                </button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-sm">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>.</p>
            </div>
        </div>
    );
};

export default Login;
