'use server';

import { redirect } from "next/navigation";

export default async function navigateTo(path: string){
    redirect(path);
};