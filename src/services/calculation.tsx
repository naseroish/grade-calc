import { LevelWithModules, ModuleTypeWithAssignments, Assignment } from './types';

// Calculate the grade for a single module based on its assignments
export const calculateModuleGrade = (assignments: Assignment[]): number => {
  let totalWeightedGrade = 0;
  let totalWeight = 0;

  assignments.forEach(({ grade, weight }) => {
    totalWeightedGrade += grade * weight;
    totalWeight += weight;
  });

  // Avoid division by zero; if no assignments or weights, return 0
  return totalWeight === 0 ? 0 : totalWeightedGrade / totalWeight;
};

// Calculate the overall grade across all levels and modules
export const calculateOverallGrade = (levels: LevelWithModules[]): number => {
    let totalWeightedGrade = 0;
    let totalCreditsAndWeights = 0;
  
    levels.forEach((level: LevelWithModules) => {
      level.modules.forEach((module: ModuleTypeWithAssignments) => {
        const moduleGrade = calculateModuleGrade(module.assignments);
        totalWeightedGrade += moduleGrade * module.credit * level.weight;
        totalCreditsAndWeights += module.credit * level.weight;
      });
    });
  
    // Avoid division by zero; if no modules or weights, return 0
    return totalCreditsAndWeights === 0 ? 0 : totalWeightedGrade / totalCreditsAndWeights;
  };
