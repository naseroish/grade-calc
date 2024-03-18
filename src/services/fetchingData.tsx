import { supabase } from './supabaseConfig';
import { Assignment, LevelWithModules, ModuleTypeWithAssignments } from './types';



export async function fetchUserData(userId: string): Promise<LevelWithModules[]> {
    if (!userId) {
        throw new Error('No user id provided');
    }

    // Fetch years
    const { data: years, error: yearsError } = await supabase
        .from('year')
        .select('*')
        .eq('user_id', userId);
    if (yearsError) throw new Error(yearsError.message);

    // Add type assertion here
    const typedYears = years as LevelWithModules[];

    // Iterate over years to fetch modules for each year
    for (const year of typedYears) {
        const { data: modules, error: modulesError } = await supabase
            .from('module')
            .select('*')
            .eq('year_id', year.id)
            .eq('user_id', userId);
        if (modulesError) throw new Error(modulesError.message);

        // Add type assertion here
        const typedModules = modules as ModuleTypeWithAssignments[];

        // For each module, fetch its assignments
        for (const module of typedModules) {
            const { data: assignments, error: assignmentsError } = await supabase
                .from('Assignment')
                .select('*')
                .eq('module_id', module.id)
                .eq('user_id', userId);
            if (assignmentsError) throw new Error(assignmentsError.message);

            // Add type assertion here
            const typedAssignments = assignments as Assignment[];

            // Attach assignments to their module
            module.assignments = typedAssignments;
        }

        // Attach modules to their year
        year.modules = typedModules;
    }

    return typedYears;
}