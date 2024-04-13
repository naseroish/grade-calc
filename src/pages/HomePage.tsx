import { useCallback, useEffect, useState } from 'react';
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
import LevelDialog from '../components/Dialog/LevelDialog';
import DeleteLevelDialog from '../components/Dialog/DeleteLevel';
import EditLevelDialog from '../components/Dialog/EditLevel';
import { GoalStatus } from '../components/goalStatus';

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [levels, setLevels] = useState<Level[]>([]);
    const [overallAverageGrade, setOverallAverageGrade] = useState<number>(0);
    // Add a new state variable for the selected level
    const [selectedLevel, setSelectedLevel] = useState<number>(() => {
        // Get the selected level from local storage when initializing the state
        const savedLevel = localStorage.getItem('selectedLevel');
        return savedLevel ? Number(savedLevel) : 0;
    });
    //loading for skeleton
    const [loading, setLoading] = useState<boolean>(true);



    const fetchData = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
            const { data: levels } = await supabase.from('year').select('*');
            setLevels(levels || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    return (
        <div className='flex-1 max-h-full justify-center max-w-7xl flex-col mx-auto overflow-hidden overflow-y-scroll'>
            <HomeNav />
            <div className='content-container flex items-center justify-left py-2 px-10'>
                <h1 className='text-3xl font-bold'>Welcome, <span className='text-3xl text-secondary font-bold'>{user?.email}</span></h1>
            </div>
            <div className='content-container flex items-center justify-left  py-2 px-10'>
                <h3 className='text-2xl font-bold'>Overview</h3>
            </div>
            <div className='grid md:grid-cols-2 gap-4 px-8 md:px-16 text-neutral-content'>
                {user && <OverallAverageGradeComponent userId={user?.id.toString() || ''} setOverallAverageGrade={setOverallAverageGrade} />}

                {/* user goal status */}
                <GoalStatus start={60} end={90} currentGrade={overallAverageGrade} />



            </div>
            <div className='md:px-10 py-2'>
                <Tab.Group defaultIndex={selectedLevel} onChange={index => {
                    // Save the selected level in local storage whenever it changes
                    localStorage.setItem('selectedLevel', String(index));
                    setSelectedLevel(index);
                }}>
                    <h3 className='text-2xl font-bold px-10 py-2'>Levels</h3>
                    {/* if loading add skeleton */}
                    {loading ? (
                        <>
                            <Tab.List className='flex  rounded-xl bg-neutral px-6 md:px-12 mx-7'>
                                <div className='flex space-x-2 py-2 items-center'>
                                    <div className="skeleton w-24 h-12 mt-2" data-testid='loading-skeleton' />
                                    <div className="skeleton w-9 h-9 rounded-full shrink-0 mt-2" data-testid='loading-skeleton' />
                                    <div className="skeleton w-24 h-12 mt-2" data-testid='loading-skeleton' />
                                    <div className="skeleton w-9 h-9 rounded-full shrink-0 mt-2" data-testid='loading-skeleton' />
                                    <div className="skeleton w-12 h-12 rounded-full shrink-0 mt-2" data-testid='loading-skeleton' />
                                </div>
                            </Tab.List>
                            <Tab.Panels className="mt-2 px-8 md:px-10">
                                <h3 className='text-2xl font-bold py-2'>Modules</h3>
                                <Tab.Panel
                                    className="rounded-xl bg-neutral p-3"
                                >
                                    <div className="skeleton w-full h-12 mt-2" data-testid='loading-skeleton' />
                                    <div className="skeleton w-full h-12 mt-2" data-testid='loading-skeleton' />
                                </Tab.Panel>
                            </Tab.Panels>
                        </>

                    ) : (
                        <>
                            {/* if not loading show content */}
                            <Tab.List className='flex  rounded-xl bg-neutral px-6  md:px-12 mx-7'>
                                <div className='flex space-x-2 py-2 items-center'>

                                    {levels.map((level: Level, index: number) => (
                                        <div className="flex items-center join rounded-xl" key={index}>
                                            <Tab
                                                className={({ selected }) =>
                                                    selected
                                                        ? ' bg-secondary text-white  px-4 py-2 join-item'
                                                        : 'bg-neutral text-neutral-content px-4 py-2 hover:bg-white/[0.12] hover:text-white join-item'
                                                }
                                            >{level.name}</Tab>
                                            <div className="dropdown join-item">
                                                <button className="bg-white/[0.12] text-white py-2 rounded-r-xl">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                    </svg>


                                                </button>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <EditLevelDialog
                                                            levelId={level.id}
                                                            levelName={level.name}
                                                            levelWeight={level.weight.toString()}
                                                            onEditLevel={fetchData}
                                                        />
                                                    </li>
                                                    <li>
                                                        <DeleteLevelDialog
                                                            levelId={level.id}
                                                            onDeleteLevel={fetchData}
                                                        />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))}

                                    <LevelDialog userId={user?.id.toString() || ''} fetchData={fetchData} levels={levels} loading={loading} />
                                </div>

                            </Tab.List>


                            <Tab.Panels className="mt-2 px-8 md:px-10">
                                <h3 className='text-2xl font-bold py-2'>Modules</h3>
                                {levels.map((level: Level, index: number) => (
                                    <Tab.Panel
                                        key={index}
                                        className="rounded-xl bg-neutral p-3"
                                    >
                                        <Levels levelId={parseInt(level.id)} userId={user?.id.toString() || ''} />
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </>
                    )}
                </Tab.Group>
            </div>
            <Footer />
        </div>
    );
}