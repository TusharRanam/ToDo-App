import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Update = () => {
    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        mobileNo: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
        // Load user data from localStorage
        const email = localStorage.getItem('email');
        const username = localStorage.getItem('username');
        const mobileNo = localStorage.getItem('mobileNo');
        setInputs(prevState => ({ ...prevState, email, username, mobileNo }));
    }, []);

    // Handle input change
    const handleOnChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCheckboxChange = () => {
        setChangePassword(!changePassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputs.mobileNo) {
            toast.error("Mobile number cannot be empty");
            return;
        }

        if (changePassword) {
            if (inputs.newPassword !== inputs.confirmPassword) {
                toast.error("New passwords do not match");
                return;
            }
            if (inputs.newPassword.length < 6) {
                toast.error("New password must be at least 6 characters long");
                return;
            }
        }

        // Get stored users
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const email = localStorage.getItem('email');
        const updatedUsers = storedUsers.map(user => {
            if (user.email === email) {
                return {
                    ...user,
                    username: inputs.username,
                    mobileNo: inputs.mobileNo,
                    password: changePassword ? inputs.newPassword : user.password
                };
            }
            return user;
        });

        // Update user data in localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('username', inputs.username);
        localStorage.setItem('mobileNo', inputs.mobileNo);
        if (changePassword) {
            localStorage.setItem('password', inputs.newPassword);
        }

        toast.success("Profile updated successfully");
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex items-center justify-center p-12">
                <form className="max-w-md w-full space-y-4" onSubmit={handleSubmit}>
                    <h2 className="text-2xl text-apporange font-bold text-center">
                        Update Profile
                    </h2>

                    <div>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Email"
                            value={inputs.email}
                            disabled
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="username"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            placeholder="Enter your Username"
                            value={inputs.username}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="mobileNo"
                            className="w-full border border-gray-300 rounded mb-4 px-4 py-2"
                            placeholder="Enter your mobile number"
                            value={inputs.mobileNo}
                            onChange={handleOnChange}
                        />
                    </div>

                    {changePassword && (
                        <>
                            <div>
                                <input
                                    type="password"
                                    name="newPassword"
                                    className="w-full border border-gray-300 rounded mb-4 px-4 py-2"
                                    placeholder="New password"
                                    value={inputs.newPassword}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full border border-gray-300 rounded mb-4 px-4 py-2"
                                    placeholder="Confirm new password"
                                    value={inputs.confirmPassword}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </>
                    )}

                    <div className="text-center">
                        <label className="flex items-center justify-center">
                            <span className="mr-2">Do you want to change password?</span>
                            <input
                                type="checkbox"
                                checked={changePassword}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-apporange hover:bg-orange-800 text-white py-2 rounded-lg"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;
