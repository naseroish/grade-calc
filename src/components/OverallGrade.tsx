import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../services/fetchingData'; // Ensure the path is correct
import { calculateOverallGrade } from '../services/calculation';  // Ensure the path is correct

interface OverallAverageGradeComponentProps {
  userId: string;
  setOverallAverageGrade: React.Dispatch<React.SetStateAction<number>>;
}

const OverallAverageGradeComponent: React.FC<OverallAverageGradeComponentProps> = ({ userId, setOverallAverageGrade }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [overallAverageGrade, setLocalOverallAverageGrade] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchUserData(userId);
        const calculatedGrade = calculateOverallGrade(userData);
        setOverallAverageGrade(calculatedGrade);
        setLocalOverallAverageGrade(calculatedGrade);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [userId, setOverallAverageGrade]);

return (
  <div className='flex justify-between bg-neutral py-2 px-10 rounded-md items-center'>
    <p className='mr-4'>Overall Average Grade</p>
    {loading
      ? <div className='skeleton w-16 h-16 rounded-full shrink-0 mt-2' data-testid='loading-skeleton' />
      : error
        ? <p>{error}</p>
        : <div className="radial-progress bg-secondary text-white border-4 border-secondary" 
            style={{ "--value": `${overallAverageGrade}`, "--size": "4rem", "--thickness": "2px" } as React.CSSProperties}>
            {overallAverageGrade}%
          </div>
    }
  </div>
);
};

export default OverallAverageGradeComponent;
