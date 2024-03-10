// Module.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Module() {
const { levelId, moduleId } = useParams();
const [moduleData, setModuleData] = useState<null | DataType>(null);

useEffect(() => {
    // Fetch the data for the specific module from your API
    // This is just a placeholder, replace it with your actual API call
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/levels/${levelId}/modules/${moduleId}`);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const data: DataType = await response.json();
            setModuleData(data);
        } catch (error) {
            // Handle the error here
        }
    };

    fetchData();
}, [levelId, moduleId]);

if (!moduleData) {
    return <div>Loading...</div>;
}

  return (
    <div>
      {/* Render your module data here */}
      <h1>{moduleData.name}</h1>
      <p>{moduleData.description}</p>
      {/* Add more fields as necessary */}
    </div>
  );
}

export default Module;