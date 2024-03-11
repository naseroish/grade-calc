//Profile page

import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseConfig';
import { User } from '@supabase/supabase-js';

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        void fetchData();
        setLoading(false);
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='page-container'>
            <div className='content-container flex items-center justify-center bg-neutral p-10'>
                <div className='flex flex-col items-center'>
                    {user && user.user_metadata && (
                        <img src={user.user_metadata.avatar_url as string || ''} alt='User avatar' className='h-20 w-20 rounded-full' />
                    )}
                    {user && user.user_metadata && (
                        <h1 className='text-3xl font-bold mt-4'>{user.user_metadata.full_name}</h1>
                    )}
                    {user && (
                        <p className='text-lg mt-2'>{user.email}</p>
                    )}
                </div>
            </div>
        </div>
    );
}