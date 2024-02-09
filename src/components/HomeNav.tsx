import { supabase } from '../services/supabaseConfig';

const HomeNav = () => {
    const Logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className='btn btn-ghost text-xl'>
                  <img src='/src/assets/gradiancewhite.png' className='h-12'></img>
                  <a className='tracking-wider font-normal '> GRADIANCE</a>
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a >Link</a></li>
                    <li>
                        <details>
                            <summary >
                                Account
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><a >Link 1</a></li>
                                <li><a onClick={Logout} >Signout</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HomeNav;