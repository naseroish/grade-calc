import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseConfig';
import { useNavigate } from 'react-router-dom';

const HomeNav = () => {
    //dark mode state
    const [theme, setTheme] = useState<string>('');
    const navigate = useNavigate();

    //get current theme
    useEffect(() => {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme ? 'night' : 'nord');
        document.documentElement.setAttribute('data-theme', currentTheme);
        setTheme(currentTheme);
    }, []);

    //dark mode toggle
    const toggleTheme = () => {
        const newTheme = theme === 'nord' ? 'night' : 'nord';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    //tailwindcss dark mode
    const isDarkTheme = theme === 'night';
    const isLightTheme = theme === 'nord';

    //supabase logout
    const Logout = () => {
        const logout = async () => {
            const { error } = await supabase.auth.signOut();
            if (error) console.log('Error logging out:', error.message);
        };
        void logout();
    };

    //profile page
    const Profile = () => {
        navigate('/profile');
    };

    const Dashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className='btn btn-ghost text-xl' onClick={Dashboard}>
                    {isDarkTheme ? (
                        <svg width="50" height="50" viewBox="0 0 145 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M83.5 6L72.5 0L0.5 38.5L72.5 77.5L144.5 39L103 16L67 35L78 41.5L103 28L122 39L72.5 65.5L23 38.5L83.5 6Z" fill="#c8cbd0" />
                            <path d="M18 81V60.5L27 65.5V74.5L72.5 99L117 75V65.5L126 61V81L72.5 110L18 81Z" fill="#c8cbd0" />
                        </svg>
                    ) : isLightTheme ? (
                        <svg width="50" height="50" viewBox="0 0 145 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M83.5 6L72.5 0L0.5 38.5L72.5 77.5L144.5 39L103 16L67 35L78 41.5L103 28L122 39L72.5 65.5L23 38.5L83.5 6Z" fill="#2e3440" />
                            <path d="M18 81V60.5L27 65.5V74.5L72.5 99L117 75V65.5L126 61V81L72.5 110L18 81Z" fill="#2e3440" />
                        </svg>
                    ) : (
                        <svg width="50" height="50" viewBox="0 0 145 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M83.5 6L72.5 0L0.5 38.5L72.5 77.5L144.5 39L103 16L67 35L78 41.5L103 28L122 39L72.5 65.5L23 38.5L83.5 6Z" fill="#2e3440" />
                            <path d="M18 81V60.5L27 65.5V74.5L72.5 99L117 75V65.5L126 61V81L72.5 110L18 81Z" fill="#2e3440" />
                        </svg>
                    )}
                </a>
            </div>



            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <label className="swap swap-rotate">

                            <input type="checkbox" onClick={toggleTheme} />


                            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>


                            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                    </li>
                    <li>
                        <details>
                            <summary className='text-center'>
                                Account
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><a onClick={Profile}>Profile</a></li>
                                <li><a onClick={Logout}>Signout</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HomeNav;