interface GoalStatusProps {
  start: number;
  end: number;
  currentGrade: number;
}

// eslint-disable-next-line react/prop-types
export const GoalStatus: React.FC<GoalStatusProps> = ({ start, end, currentGrade }) => {
  // Define the milestones for the goal by splitting the range into three parts
  const milestones = [start, start + (end - start) / 2, end];

  return (
    <ul className="steps bg-neutral py-2 px-10 rounded-md items-center">
      {milestones.map((milestone, index) => (
        <li key={index} 
            className={milestone <= currentGrade ? "step step-secondary" : "step"} 
            data-content={milestone <= currentGrade ? "✓" : "✕"}>
          {milestone}%
        </li>
      ))}
    </ul>
  );
};