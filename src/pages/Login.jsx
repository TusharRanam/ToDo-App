import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Head from '../components/Head';

const Login = () => {
    const navigate = useNavigate();

    const [authState, setAuthState] = useState('login');
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNo: ''
    });
    const [errors, setErrors] = useState({});

    // Toggle between login and signup
    const toggleAuthState = useCallback(() => {
        setAuthState((currentAuthState) => currentAuthState === "login" ? "signup" : "login");
        setErrors({});
    }, []);

    // Handle input change
    const handleOnChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [e.target.name]: '',
        }));
    }

    const validateLoginInputs = () => {
        const newErrors = {};
        if (!inputs.email) newErrors.email = "Email cannot be empty";
        if (!inputs.password) newErrors.password = "Password cannot be empty";
        return newErrors;
    }

    const validateSignupInputs = () => {
        const newErrors = {};
        if (!inputs.username) newErrors.username = "Username cannot be empty";
        if (!inputs.email) newErrors.email = "Email cannot be empty";
        if (!inputs.password) newErrors.password = "Password cannot be empty";
        if (!inputs.mobileNo) newErrors.mobileNo = "Mobile No cannot be empty";
        if (!inputs.confirmPassword) newErrors.confirmPassword = "Confirm Passwords cannot be empty";
        if (inputs.password !== inputs.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputs.email)) newErrors.email = "Invalid email format";
        if (!inputs.password) newErrors.password = "Password cannot be empty";
        return newErrors;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const newErrors = validateLoginInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(user => user.email === inputs.email && user.password === inputs.password);

        if (user) {
            localStorage.setItem('token', 'dummy-token');
            localStorage.setItem('userId', user.userId);
            localStorage.setItem('email', user.email);
            localStorage.setItem('mobileNo', user.mobileNo);
            localStorage.setItem('username', user.username);
            toast.success("Logged in");
            navigate('/main');
        } else {
            toast.error("Email or password incorrect");
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const newErrors = validateSignupInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (storedUsers.some(user => user.email === inputs.email)) {
            setErrors({ email: "Email already exists" });
            return;
        }

        const newUser = {
            userId: Date.now().toString(),
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
            mobileNo: inputs.mobileNo
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('userId', newUser.userId);
        localStorage.setItem('email', newUser.email);
        localStorage.setItem('mobileNo', newUser.mobileNo);
        localStorage.setItem('username', newUser.username);
        toast.success("Registered");
        navigate('/main');
    };

    return (
        <>
            <Head />

            <div className="flex h-screen">
                <div className="flex-1 flex items-center justify-center p-12">
                    <form className="max-w-md w-full space-y-4">
                        <h2 className="text-2xl font-bold text-center">
                            {authState === "login" ? "Login" : "Create an account"}
                        </h2>

                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                                placeholder="Enter your email"
                                value={inputs.email}
                                onChange={handleOnChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {authState === "signup" && (
                            <>
                                <div>
                                    <label className="block text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className={`w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                                        placeholder="Enter your Username"
                                        value={inputs.username}
                                        onChange={handleOnChange}
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700">Mobile No</label>
                                    <input
                                        type="number"
                                        name="mobileNo"
                                        className={`w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                                        placeholder="Enter your Mobile No"
                                        value={inputs.mobileNo}
                                        onChange={handleOnChange}
                                    />
                                    {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>}
                                </div>
                                
                            </>
                        )}

                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded mb-4 px-4 py-2`}
                                placeholder="Enter your password"
                                value={inputs.password}
                                onChange={handleOnChange}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        {authState === "signup" && (
                        <div>
                                    <label className="block text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded px-4 py-2`}
                                        placeholder="Confirm your password"
                                        value={inputs.confirmPassword}
                                        onChange={handleOnChange}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>
                        )}
                        {authState === "login" ? (
                            <button
                                type="submit"
                                className="w-full bg-apporange hover:bg-orange-800 text-white py-2 rounded-lg"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full bg-apporange hover:bg-orange-800 text-white py-2 rounded-lg"
                                onClick={handleSignup}
                            >
                                Sign Up
                            </button>
                        )}

                        <p>
                            {authState === "login" ? "Don't have an account?" : "Already have an account?"}
                            <span>
                                {authState === "login" ? (
                                    <a className='ml-1 hover:underline cursor-pointer content-center text-apporange' onClick={toggleAuthState}>Sign Up</a>
                                ) : (
                                    <a className='ml-1 hover:underline cursor-pointer text-orange-600' onClick={toggleAuthState}>Login</a>
                                )}
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
