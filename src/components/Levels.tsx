// Levels.tsx
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModuleType } from '../services/types';
import { supabase } from '../services/supabaseConfig';
import ModuleDialog from './Dialog/ModuleDialog';
import EditModuleDialog from './Dialog/EditModule';
import DeleteModuleDialog from './Dialog/DeleteModule';

type LevelsProps = {
    userId: string;
    levelId: number;
};

function Levels({ levelId, userId }: LevelsProps) {
    const [modules, setModules] = useState<ModuleType[]>([]);


    // Fetch the modules for the specific level from supabase
    const fetchData = useCallback(async () => {
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
    }, [levelId]);

    useEffect(() => {
        void fetchData();
    }, [fetchData, levelId]);

    return (
        <div>
            <div>
                {modules.map((module) => (
                    <div key={module.id} className="flex items-center border rounded-lg">
                        <Link to={`/dashboard/levels/${levelId}/modules/${module.id}`} className="flex-grow">
                            <div className='text-xl text-neutral-content p-2 '>
                                {module.name}
                            </div>
                        </Link>
                        <div className="dropdown dropdown-end dropdown-hover">
                            <div tabIndex={0} role="button" className="btn btn-xs btn-circle mr-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>

                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><EditModuleDialog moduleId={module.id} moduleName={module.name} moduleCredit={module.credit.toString()} onEditModule={fetchData} /></li>
                                <li><DeleteModuleDialog moduleId={module.id} onDeleteModule={fetchData} /></li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
                <ModuleDialog levelId={levelId} userId={userId} fetchData={fetchData} /> {/* Pass the level id directly */}
            </div>
        </div>
    );
}

export default Levels;