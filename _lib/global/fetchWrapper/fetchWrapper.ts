import { getEnvApiURL } from "@/_lib/env/exportEnv";
import getAuthToken from "../../cookies/getAuthToken";

export enum FetchWrapperMethod{
    GET = "GET",
    POST = "POST",
};

export async function fetchWrapper(apiPath: string, method: FetchWrapperMethod, body: any = ""){

    if(method === FetchWrapperMethod.GET){
        const res = await fetch(`${await getEnvApiURL()}${apiPath}`, {
            method: FetchWrapperMethod.GET,
            headers: {
                'Authorization': await getAuthToken(),
            }, credentials: "include",
        });
    
        return await res.json();
    } else if(method === FetchWrapperMethod.POST){
        const res = await fetch(`${await getEnvApiURL()}${apiPath}`, {
            body: JSON.stringify(body),
            method: FetchWrapperMethod.POST,
            headers: {
                "Content-Type": "application/json",
                'Authorization': await getAuthToken(),
            }, credentials: "include",
        });
    
        return await res.json();
    };
};