import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseConfig';


export default function Stat() {

  const [modules, setModules] = useState(0);
  const [assignments, setAssignments] = useState(0);
  const [grades, setGrades] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const user = supabase.auth.getSession();
      if (await user)
      {
        const { data, error } = await supabase
          .from('modules')
          .select('*')
          // Update the code to use the user() method instead of the user property
        if (error) {
          console.log('error', error)
        } else {
          setModules(data.length)
        }
      } else {
        console.log('No user')
      }
    }
    fetchStats()
  }, [])

  useEffect(() => {
    async function fetchStats() {
      const user = supabase.auth.getSession();
      if (await user)
      {
        const { data, error } = await supabase
          .from('assignments')
          .select('*')
          // Update the code to use the user() method instead of the user property
        if (error) {
          console.log('error', error)
        } else {
          setAssignments(data.length)
        }
      } else {
        console.log('No user')
      }
    }
    fetchStats()
  }, [])

  useEffect(() => {
    async function fetchStats() {
      const user = supabase.auth.getSession();
      if (await user)
      {
        const { data, error } = await supabase
          .from('grades')
          .select('*')
          // Update the code to use the user() method instead of the user property
        if (error) {
          console.log('error', error)
        } else {
          setGrades(data.length)
        }
      } else {
        console.log('No user')
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="stats shadow ">

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div className="stat-title">Modules</div>
        <div className="stat-value">{String(modules).length}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
        </div>
        <div className="stat-title">Assingments</div>
        <div className="stat-value">{String(assignments).length}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
        </div>
        <div className="stat-title">Grades</div>
        <div className="stat-value">{String(grades).length}</div>
      </div>

    </div>
  );
}