import React from 'react';
import { supabase } from '../services/supabaseConfig';

const HomeNav = () => {
    const Logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <img src='/src/assets/gradiancewhite.png' style={{height: '50px'}}></img>
                <a className="btn btn-ghost text-xl" style={{letterSpacing: '3px', fontWeight: '400', color:'White'}}> GRADIANCE</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a style={{color:'White'}}>Link</a></li>
                    <li>
                        <details>
                            <summary style={{color:'White'}}>
                                Account
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><a style={{color:'White'}}>Link 1</a></li>
                                <li><a onClick={Logout} style={{color:'White'}}>Signout</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HomeNav;