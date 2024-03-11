//types

interface Level {
    id: string;
    name: string;
    credits: number;
    weight: number;
    userId: string;

}

interface Module {
    id: string;
    name: string;
    credit: number;
    yearId: string;
    userId: string;
}

interface Assignment {
    id: string;
    name: string;
    type: string;
    weight: number;
    grade: number;
    moduleId: string;
    userId: string;
}

interface UserData {
    year: Level[];
    modules: Module[];
    assignments: Assignment[];
}

interface User {
    id: string;
    name: string;
    email: string;
}

export type { Level, Module, Assignment, UserData, User };