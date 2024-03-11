
import { useEffect, useState } from 'react';
import '../App.css'
import Footer from '../components/Footer';
import HomeNav from '../components/HomeNav';
import OverallAverageGradeComponent from '../components/OverallGrade';
// import Grades from '../components/grades';
import { supabase } from '../services/supabaseConfig';
import { User } from '@supabase/supabase-js';
import { Tab } from '@headlessui/react';
import Levels from '../components/Levels';
import { Level } from '../services/types';
import ModuleDialog from '../components/ModuleDialog';

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [levels, setLevels] = useState<Level[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: levels } = await supabase.from('year').select('*');
                setLevels(levels || []);
            }
            setLoading(false);
        };

        void fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render loading indicator
    }


    return (
        <div className='flex-1 max-h-full justify-center max-w-7xl flex-col mx-auto overflow-hidden overflow-y-scroll'>
            <HomeNav />
            <div className='content-container flex items-center justify-left py-2 px-10'>
                <h1 className='text-3xl font-bold'>Welcome, <span className='text-3xl text-secondary font-bold'>{user?.email}</span></h1>
            </div>
            <div className='content-container flex items-center justify-left  py-2 px-10'>
                <h3 className='text-2xl font-bold'>Overview</h3>
            </div>
            <div className='grid md:grid-cols-3 gap-4 px-16 text-neutral-content'>
                <OverallAverageGradeComponent userId={user?.id.toString() || ''} />
                <OverallAverageGradeComponent userId={user?.id.toString() || ''} />
                <OverallAverageGradeComponent userId={user?.id.toString() || ''} />
            </div>
            <div className='px-10 py-2'>
                <Tab.Group>
                    <h3 className='text-2xl font-bold'>Levels</h3>
                    <Tab.List className='flex  rounded-xl bg-neutral  px-12 mx-7'>
                        <div className='flex space-x-1 py-2'>
                            {levels.map((level: Level, index: number) => (
                                <Tab
                                    key={index}
                                    className={({ selected }) =>
                                        selected
                                            ? 'bg-secondary text-white rounded-xl px-4 py-2'
                                            : 'bg-neutral text-neutral-content rounded-xl px-4 py-2 hover:bg-white/[0.12] hover:text-white'
                                    }
                                >{level.name}</Tab>
                            ))}
                            <button className='bg-neutral flex inset-y-0 right-0 py-1 px-2 ml-2 rounded-xl text-neutral-content hover:bg-white/[0.12] hover:text-white'>
                                options
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                    </Tab.List>



                    <Tab.Panels className="mt-2 px-10">
                        <h3 className='text-2xl font-bold py-2'>Modules</h3>
                        {levels.map((level: Level, index: number) => (
                            <Tab.Panel
                                key={index}
                                className="rounded-xl bg-neutral p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            >
                                <Levels levelId={parseInt(level.id)} />
                                <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                                    <ModuleDialog levelId={level.id} userId={user?.id.toString() || ''} /> {/* Pass the level id directly */}
                                </div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <Footer />
        </div>
    );
}