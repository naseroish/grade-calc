// Module.tsx
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseConfig';
import { ModuleType, Assignment } from '../services/types';
import HomeNav from './HomeNav';
import AssignmentDialog from './Dialog/AssignmentDialog';
import { User } from '@supabase/supabase-js';
import { calculateModuleGrade } from '../services/calculation';  // Ensure the path is correct

function Module() {
  const { moduleId = '' } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [moduleData, setModuleData] = useState<ModuleType | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [overallAverageGrade, setOverallAverageGrade] = useState<number | null>(null);


  const fetchModuleData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data, error } = await supabase
        .from('module')
        .select('*')
        .eq('id', moduleId);

      if (error) {
        console.error('Error fetching module data:', error);
      } else {
        setModuleData(data[0] as ModuleType);
      }
    }
  }, [moduleId]);

  //fetch module assignment data
  const fetchModuleAssignmentData = useCallback(async () => {
    const { data, error } = await supabase
      .from('Assignment')
      .select('*')
      .eq('module_id', moduleId);

    if (error) {
      console.error('Error fetching module assignment data:', error);
    } else {
      setAssignments(data || []);
    }
  }, [moduleId]);

  useEffect(() => {
    void fetchModuleData();
    void fetchModuleAssignmentData();
    const calculatedModuleGrade = calculateModuleGrade(assignments);
    setOverallAverageGrade(calculatedModuleGrade);
  }, [fetchModuleAssignmentData, fetchModuleData, moduleId, assignments]);

  // //filtter assignment by type
  // const filterAssignmentsByType = (type: string) => {
  //     return assignments.filter((assignment) => assignment.type === type);
  // };


  if (!moduleData) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className='max-w-7xl flex-col mx-auto '>
      <HomeNav />
      <div className='content-container flex items-center justify-left  py-2 px-6 md:px-10'>
        <h3 className='text-2xl font-bold'>Overview</h3>
      </div>
      <div className='flex justify-evenly mx-8 md:mx-16 p-2 bg-neutral text-neutral-content rounded-md'>
        <h1 className='text-xl'>Module: {moduleData.name}</h1>
        <h2 className='text-xl'>Overall Grade: {overallAverageGrade}%</h2>
      </div>

      {/* <div>
        <h3>Exams</h3>
        <div>
          {filterAssignmentsByType('test').map((assignment: Assignment, index: number) => (
            <div key={index}>
              <h3>{assignment.name}</h3>
              <p>Weight: {assignment.weight}</p>
              <p>Grade: {assignment.grade}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className='mt-5 px-6 md:px-10'>
        <div className='flex justify-between mr-6 md:mr-10'>
          <h3 className='text-2xl font-bold'>Assignments</h3>
          <AssignmentDialog moduleId={moduleId} userId={user?.id.toString() || ''} onNewAssignment={fetchModuleAssignmentData} />
        </div>
        <div className='grid md:grid-cols-3 gap-4 md:px-14 pt-2'>
          {assignments.map((assignment: Assignment, index: number) => (
            <div key={index} className='bg-neutral p-4 rounded-lg'>
              <div className='text-lg flex justify-between pb-2'>
                <h3 className='text-neutral-content text-xl font-semibold'>{assignment.name}</h3>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-xs btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                  </div>
                  <ul tabIndex={0} className=" dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Edit</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>
              </div>
              <div className='flex justify-evenly text-neutral-content'>
                <p>Weight: {assignment.weight}%</p>
                <p>Grade: {assignment.grade}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Module;