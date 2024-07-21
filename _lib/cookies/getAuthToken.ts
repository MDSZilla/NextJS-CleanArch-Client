'use server';

import { cookies } from "next/headers";

export default async function getAuthToken() {
    return cookies().get(process.env.AUTH_COOKIE_NAME!)?.value.toString() || '';
};