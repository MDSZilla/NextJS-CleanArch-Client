'use server';

import * as bcrypt from "bcrypt";

export async function bcryptHash(input: string){
    return bcrypt.hash(input, 10);
};