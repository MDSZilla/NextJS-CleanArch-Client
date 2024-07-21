import { ServerResponseStatus } from "@/_enums/serverResponseStatus.enum";

export class ServerResponseError{
    repository: string;
    method: string;
    error: string;

    constructor(repository: string = "", method: string = "", error: string = ""){
        this.repository = repository;
        this.method = method;
        this.error = error;
    };
};

export class ServerResponse<T>{
    status: ServerResponseStatus;
    response: T;
    error: ServerResponseError

    constructor(response: T, status: ServerResponseStatus, error: ServerResponseError = new ServerResponseError()){
        this.response = response;
        this.status = status;
        this.error = error;
    };
};