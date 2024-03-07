
import { useEffect, useState } from 'react';
import '../App.css'
import Footer from '../components/Footer';
import HomeNav from '../components/HomeNav';
import OverallAverageGradeComponent from '../components/OverallGrade';
// import Grades from '../components/grades';
import { supabase } from '../services/supabaseConfig';
import { User } from '@supabase/supabase-js';

export default function Home() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchData();
    }, []);

    return (
        <div className='flex-1 max-h-full overflow-hidden overflow-y-scroll'>
            <HomeNav />
            <div className='content-container flex items-center justify-center bg-neutral p-10'>
                <OverallAverageGradeComponent userId={user?.id || ''} />
            </div>
            <Footer />
        </div>
    );
}