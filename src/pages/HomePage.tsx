
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
import { optionButton } from '../components/optionButton'; // Import the optionButton component

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
        return <span className="loading loading-spinner loading-lg"></span>; // Render loading indicator
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
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn ml-4">options
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Add Level</a></li>
                                    <li><a>Edit Level</a></li>
                                    <li><a>Delete Level</a></li>
                                </ul>
                            </div>
                        </div>

                    </Tab.List>


                    <Tab.Panels className="mt-2 px-10">
                        <h3 className='text-2xl font-bold py-2'>Modules</h3>
                        {levels.map((level: Level, index: number) => (
                            <Tab.Panel
                                key={index}
                                className="rounded-xl bg-neutral p-3"
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