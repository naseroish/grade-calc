import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../services/fetchingData'; // Ensure the path is correct
import { calculateOverallGrade } from '../services/calculation';  // Ensure the path is correct

interface OverallAverageGradeComponentProps {
  userId: string;
}

const OverallAverageGradeComponent: React.FC<OverallAverageGradeComponentProps> = ({ userId }) => {
  const [overallAverageGrade, setOverallAverageGrade] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchUserData(userId);
        const calculatedGrade = calculateOverallGrade(userData);
        setOverallAverageGrade(calculatedGrade);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [userId]);

  return (
    <div className='bg-neutral py-2 px-10 rounded-md'>
      <h2>Overall Average Grade</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{`Overall average grade: ${overallAverageGrade?.toFixed(2)}`}</p>
      )}
    </div>
  );
};

export default OverallAverageGradeComponent;
