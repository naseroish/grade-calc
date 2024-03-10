
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

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [levels, setLevels] = useState<Level[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user }} = await supabase.auth.getUser();
            setUser(user);
            
            if (user) {
                const { data: levels } = await supabase.from('year').select('*');
                setLevels(levels || [] );
            }
            setLoading(false);
        };

        void fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render loading indicator
    }


    return (
        <div className='flex-1 max-h-full overflow-hidden overflow-y-scroll'>
            <HomeNav />
            <div className='content-container flex items-center justify-center bg-neutral p-10'>
                <OverallAverageGradeComponent userId={user?.id.toString() || ''} />
            </div>
            <div className=' bg-neutral p-10'>
            <Tab.Group >
                <Tab.List className='content-container flex items-center justify-start p-2 '>
                    <div className='flex space-x-1'>
                    {levels.map((level:Level, index: number) => (
                        <Tab
                         key={index}
                        className={({ selected }) =>
                            selected
                            ? 'bg-primary text-white rounded-xl px-4 py-2'
                            : 'bg-neutral text-white rounded-xl px-4 py-2'
                        }
                        >{level.name}</Tab>
                    ))}
                    </div>
                    <div className=' inset-y-0 right-0'>options</div>
                </Tab.List>
                

                <Tab.Panels className="mt-2">
                    {levels.map((level: Level, index: number) => (
                        <Tab.Panel
                            key={index}
                            className="rounded-xl bg-base-100 p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                        >
                            <Levels levelId={parseInt(level.id)} />
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
            </div>
            <Footer />
        </div>
    );
}