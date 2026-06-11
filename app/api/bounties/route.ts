// src/app/api/bounties/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';

const pirateData: any[] = [];

const PirateSchema = z.object({
    name: z.string().min(1).max(50),
    crew: z.string().min(3),
    bounty: z.number().gt(0),
    is_devil_fruit_user: z.boolean().default(false),
});

export async function GET() {
    if (pirateData.length === 0) {
        return NextResponse.json(
            { message: "No active bounties." },
            { status: 404 }
        );
    }
    return NextResponse.json({ data: pirateData });
}

// 4. POST Endpoint: Insert new pirate record 
// FastAPI: @router.post("/") with Depends(need_rank)
export async function POST(request: Request) {
    // --- Dependency Simulation: Check Marine Header Rank ---
    const marineRank = request.headers.get('Marine-Rank') || 'soldier';

    if (marineRank !== 'Admiral' && marineRank !== 'Fleet-Admiral') {
        return NextResponse.json(
            { detail: "only high ranking official can ulter the data base" },
            { status: 401 }
        );
    }

    try {
        // Read and parse request payload
        const body = await request.json();

        // Validate body rules against the schema safely
        const parsedPirate = PirateSchema.parse(body);

        // Business evaluation logic (Fixed the typo from "therat_level"!)
        const threatLevel = parsedPirate.bounty > 1000000000 ? "Extreme" : "Regular";

        // Construct database document object
        const newPirateRecord = {
            ...parsedPirate,
            threat_level: threatLevel,
        };

        pirateData.push(newPirateRecord);

        return NextResponse.json(
            {
                message: "pirated added sucessfully",
                pirate: newPirateRecord,
            },
            { status: 201 }
        );

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: "Validation Failed",
                    details: error.issues // <-- Changed from error.errors to error.issues
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Malformed JSON payload body" },
            { status: 400 }
        );
    }
}