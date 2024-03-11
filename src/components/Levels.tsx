// Levels.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Module } from '../services/types';
import { supabase } from '../services/supabaseConfig';

type LevelsProps = {
    levelId: number;
};

function Levels({ levelId }: LevelsProps) {
    const [modules, setModules] = useState<Module[]>([]);

    useEffect(() => {
        // Fetch the modules for the specific level from supabase
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('module')
                    .select('*')
                    .eq('year_id', levelId);

                if (error) throw error;

                if (data) setModules(data);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchData();
    }, [levelId]);

    return (
        <div>
        {modules.map((module) => (
            <Link key={module.id} to={`/dashboard/levels/${levelId}/modules/${module.id}`}>
                <div className='text-xl text-neutral-content mt-2 p-2 border rounded-lg'>
                    {module.name}
                </div>
            </Link>
        ))}
    </div>
    );
}

export default Levels;