// /app/api/auth/imagekit/route.ts
import { NextResponse } from "next/server";
import config from "@/lib/config";
import ImageKit from "imagekit";

// Destructure from config
const { env: { imagekit: { publicKey, privateKey, urlEndpoint } } } = config;

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
});

// Handle GET request for signing
export async function GET() {
    try {
        const authenticationParams = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParams);
    } catch (error:any) {
        console.error("Error getting authentication parameters:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

