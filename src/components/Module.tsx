// Module.tsx
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../services/supabaseConfig';
import { ModuleType, Assignment } from '../services/types';
import HomeNav from './HomeNav';
import AssignmentDialog from './Dialog/AssignmentDialog';
import { User } from '@supabase/supabase-js';
import { calculateModuleGrade } from '../services/calculation';  // Ensure the path is correct
import EditAssignmentDialog from './Dialog/EditAssignment';
import DeleteAssignmentDialog from './Dialog/DeleteAssignment';

function Module() {
  const { moduleId = '' } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [moduleData, setModuleData] = useState<ModuleType | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [overallAverageGrade, setOverallAverageGrade] = useState<number | null>(null);

  const [moduleLoading, setModuleLoading] = useState<boolean>(true);
  const [assignmentLoading, setAssignmentLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');


  const fetchModuleData = useCallback(async () => {
    setModuleLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data, error } = await supabase
        .from('module')
        .select('*')
        .eq('id', moduleId);

      if (error) {
        console.error('Error fetching module data:', error);
        setError('Error fetching module data');
      } else {
        setModuleData(data[0] as ModuleType);
      }
    }
    setModuleLoading(false);
  }, [moduleId]);

  //fetch module assignment data
  const fetchModuleAssignmentData = useCallback(async () => {
    setAssignmentLoading(true);
    const { data, error } = await supabase
      .from('Assignment')
      .select('*')
      .eq('module_id', moduleId);

    if (error) {
      console.error('Error fetching module assignment data:', error);
      setError('Error fetching module assignment data');
    } else {
      setAssignments(data || []);
    }
    setAssignmentLoading(false);
  }, [moduleId]);

  useEffect(() => {
    void fetchModuleData();
    void fetchModuleAssignmentData();
  }, [fetchModuleAssignmentData, fetchModuleData, moduleId]);

  useEffect(() => {
    const calculatedModuleGrade = calculateModuleGrade(assignments);
    setOverallAverageGrade(calculatedModuleGrade);
  }, [assignments]);

  // //filtter assignment by type
  // const filterAssignmentsByType = (type: string) => {
  //     return assignments.filter((assignment) => assignment.type === type);
  // };



  const isLoading = moduleLoading || assignmentLoading;

  return (
    <div className='max-w-7xl flex-col mx-auto '>
      <HomeNav />
      <div className='content-container flex items-center justify-left  py-2 px-6 md:px-10'>
        <h3 className='text-2xl font-bold'>Overview</h3>
      </div>
      <div className='grid md:grid-cols-2 gap-4 px-8 md:px-16 text-neutral-content'>
        {isLoading ? (
          <>
            <div className='skeleton w-full h-6 mx-10'></div>
            <div className='skeleton w-full h-6'></div>
          </>
        ) : (
          <>
            <div className='flex justify-between bg-neutral py-2 px-10 rounded-md items-center'>
              <p className='mr-4'>Overall Average Grade</p>
              {isLoading
                ? <div className='skeleton w-16 h-16 rounded-full shrink-0 mt-2' data-testid='loading-skeleton' />
                : error
                  ? <p>{error}</p>
                  : <div className="radial-progress bg-secondary text-white border-4 border-secondary"
                    style={{ "--value": `${overallAverageGrade}`, "--size": "4rem", "--thickness": "2px" } as React.CSSProperties}>
                    {overallAverageGrade}%
                  </div>
              }
            </div>
            <div className='flex  bg-neutral p-2 px-10 rounded-md items-center'>
              <p className='mr-4'>Module Name</p>
              <p className='mr-4 text-lg'>{moduleData?.name}</p>
              <p className='mr-4'>Module Credit</p>
              <p className='text-xl'>{moduleData?.credit}</p>
            </div>
          </>
        )}
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
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='bg-neutral p-4 rounded-lg'>
                <div className='animate-pulse flex justify-between pb-2'>
                  <div className='skeleton w-full h-6 mr-3'></div>
                  <div className='skeleton w-7 h-7 rounded-full shrink-0'></div>
                </div>
                <div className='flex justify-evenly text-neutral-content'>
                  <div className='skeleton w-24 h-6'></div>
                  <div className='skeleton w-24 h-6'></div>
                </div>
              </div>
            ))
          ) : (
            assignments.map((assignment: Assignment, index: number) => (
              <div key={index} className='bg-neutral p-4 rounded-lg'>
                <div className='text-lg flex justify-between pb-2'>
                  <h3 className='text-neutral-content text-xl font-semibold'>{assignment.name}</h3>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-xs btn-circle flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>

                    </div>
                    <ul tabIndex={0} className=" dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><EditAssignmentDialog assignmentId={assignment.id} assignmentName={assignment.name} assignmentGrade={assignment.grade.toString()} assignmentWeight={assignment.weight.toString()} onEditAssignment={fetchModuleAssignmentData} /></li>
                      <li><DeleteAssignmentDialog assignmentId={assignment.id} onDeleteAssignment={fetchModuleAssignmentData} /> </li>
                    </ul>
                  </div>
                </div>
                <div className='flex justify-evenly text-neutral-content'>
                  <p>Weight: {assignment.weight}%</p>
                  <p>Grade: {assignment.grade}%</p>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default Module;