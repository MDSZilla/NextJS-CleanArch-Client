'use server';

export async function getEnvApiURL(){
    return `${process.env.API_URL!}`;
};

export async function getEnvWsURL(){
    return `${process.env.WS_URL!}`;
};

export async function getEnvAuthCookieName() {
    return `${process.env.AUTH_COOKIE_NAME!}`;
};