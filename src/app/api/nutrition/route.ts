import { NextRequest, NextResponse } from 'next/server';

const USDA_API_KEY = process.env.USDA_API_KEY;
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

interface USDAFood {
    fdcId: number;
    description: string;
    foodNutrients: {
        nutrientId: number;
        nutrientName: string;
        value: number;
        unitName: string;
    }[];
}

interface NutritionResult {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fdcId: number;
}

// Nutrient IDs from USDA
const NUTRIENT_IDS = {
    ENERGY: 1008,       // Calories (kcal)
    PROTEIN: 1003,      // Protein (g)
    CARBS: 1005,        // Carbohydrates (g)
    FAT: 1004,          // Total lipid/fat (g)
};

function extractNutrients(food: USDAFood): NutritionResult {
    const nutrients = food.foodNutrients || [];

    const findNutrient = (id: number): number => {
        const nutrient = nutrients.find(n => n.nutrientId === id);
        return nutrient?.value ?? 0;
    };

    return {
        name: food.description,
        calories: Math.round(findNutrient(NUTRIENT_IDS.ENERGY)),
        protein: Math.round(findNutrient(NUTRIENT_IDS.PROTEIN)),
        carbs: Math.round(findNutrient(NUTRIENT_IDS.CARBS)),
        fat: Math.round(findNutrient(NUTRIENT_IDS.FAT)),
        fdcId: food.fdcId,
    };
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json(
            { error: 'Missing query parameter "q"' },
            { status: 400 }
        );
    }

    if (!USDA_API_KEY) {
        console.error('USDA_API_KEY not configured');
        return NextResponse.json(
            { error: 'Nutrition API not configured' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `${USDA_BASE_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}&pageSize=10`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                next: { revalidate: 86400 }, // Cache for 24 hours
            }
        );

        if (!response.ok) {
            throw new Error(`USDA API error: ${response.status}`);
        }

        const data = await response.json();
        const foods: USDAFood[] = data.foods || [];

        // Extract nutrition from first 10 results
        const results: NutritionResult[] = foods
            .slice(0, 10)
            .map(extractNutrients);

        return NextResponse.json({
            query,
            results,
            totalHits: data.totalHits || 0,
        });
    } catch (error) {
        console.error('Nutrition API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch nutrition data' },
            { status: 500 }
        );
    }
}
