import { supabase } from './supabaseConfig';

import { UserData } from './types';

//fetch all the data for the user
export async function fetchUserData(userId: string) {
    //get all the years for the user
    const { data: years, error: yearsError } = await supabase
        .from('years')
        .select('*')
        .eq('userId', userId);
    if (yearsError) {
        console.error(yearsError);
        return;
    }
    //get all the modules for the user
    const { data: modules, error: modulesError } = await supabase
        .from('modules')
        .select('*')
        .eq('userId', userId);
    if (modulesError) {
        console.error(modulesError);
        return;
    }
    //get all the assignments for the user
    const { data: assignments, error: assignmentsError } = await supabase
        .from('assignments')
        .select('*')
        .eq('userId', userId);
    if (assignmentsError) {
        console.error(assignmentsError);
        return;
    }
    return { years, modules, assignments } as UserData;
}