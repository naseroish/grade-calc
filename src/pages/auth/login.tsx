// import React from 'react';
// import { useState } from "react";
// import { authService } from '../../services/supabase.js';

export default function Login() {

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [email, setEmail] = useState('');
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [password, setPassword] = useState('');
  
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const handleLogin = async () => {
    //   try {
    //     const user = await authService.signIn(email, password);
    //     console.log('User:', user);
    //     // Handle successful login (e.g., redirect)
    //   } catch (error) {
    //     console.error('Login error:', error.message);
    //     // Handle login error (e.g., display error message)
    //   }
    // };
    

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Sign In
                    </button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    );
}