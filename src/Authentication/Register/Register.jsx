import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import { Helmet } from 'react-helmet';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if (password.length < 6) {
            setError('Password should be at least 6 characters or longer');
        } else if (!/[A-Z]/.test(password)) {
            setError('Password should have at least one uppercase letter');
        } else if (!/[a-z]/.test(password)) {
            setError('Password should have at least one lowercase letter');
        } else {
            createUser(email, password)
                .then(result => {
                    console.log(result);
                    Swal.fire({
                        title: "Success!",
                        text: "Registration successful",
                        icon: "success"
                    });
                })
                .catch(err => {
                    console.error(err.message);
                    Swal.fire({
                        title: "Error!",
                        text: err.message,
                        icon: "error"
                    });
                });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div>
            <div className="min-h-screen bg-base-200 flex text-neutral items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Helmet>
                    <title>HomeSpot | Register</title>
                </Helmet>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="text-center text-3xl font-bold text-gray-900">Register Now!</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className="rounded-md shadow-sm">
                            <div className="mb-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="mb-1">
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="rounded-md relative w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <div>
                            <button
                                type="submit"
                                className="btn w-full bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                Sign Up
                            </button>
                        </div>
                        <SocialLogin></SocialLogin>
                    </form>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
