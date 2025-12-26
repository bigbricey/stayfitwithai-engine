'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface MealData {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export async function saveMeal(data: MealData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // For now, allow anonymous usage with a mock ID
    const userId = user?.id || '00000000-0000-0000-0000-000000000000';

    const { data: meal, error } = await supabase
        .from('meals')
        .insert({
            user_id: userId,
            description: data.name,
            calories: data.calories,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            meal_type: data.meal_type,
            date: new Date().toISOString().split('T')[0],
        })
        .select()
        .single();

    if (error) {
        console.error('Error saving meal:', error);
        throw new Error('Failed to save meal');
    }

    revalidatePath('/');
    return meal;
}

export async function getTodaysMeals() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const userId = user?.id || '00000000-0000-0000-0000-000000000000';
    const today = new Date().toISOString().split('T')[0];

    const { data: meals, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching meals:', error);
        return [];
    }

    // Map to match our component interface
    return meals.map((m) => ({
        id: m.id,
        name: m.description || '',
        calories: m.calories || 0,
        protein: m.protein || 0,
        carbs: m.carbs || 0,
        fat: m.fat || 0,
        meal_type: m.meal_type || 'snack',
        created_at: m.created_at,
    }));
}
