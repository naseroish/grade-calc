//types

interface Level {
    id: string;
    name: string;
    weight: number;
    userId: string;

}

interface ModuleType {
    id: string;
    name: string;
    credit: number;
    yearId: string;
    userId: string;
}

interface Assignment {
    id: string;
    name: string;
    weight: number;
    grade: number;
    moduleId: string;
    userId: string;
}

interface UserData {
    year: Level[];
    modules: ModuleType[];
    assignments: Assignment[];
}

interface User {
    id: string;
    name: string;
    email: string;
}

// Extend Level and ModuleType to include assignments and modules properties
interface LevelWithModules extends Level {
    modules: ModuleTypeWithAssignments[];
}

interface ModuleTypeWithAssignments extends ModuleType {
    assignments: Assignment[];
}

export type { Level, ModuleType, Assignment, UserData, User, LevelWithModules, ModuleTypeWithAssignments};