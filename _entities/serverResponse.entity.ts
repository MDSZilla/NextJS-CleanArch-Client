import { ServerResponseEnum } from "@/_enums/serverResponseStatus.enum";


export type ServerResponseType<T> = {
    response: T;
    error: {
        message: string;
        repository: string;
        method: string;
    } | null;
    status: ServerResponseEnum;
};