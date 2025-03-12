import { ClientSocket } from "@/_entities/clientSocket.entity";
import { ServerResponse, ServerResponseError } from "@/_entities/serverResponse.entity";
import { ClientSocketStatusEnum } from "@/_enums/clientSocket.enum";
import { ServerResponseStatus } from "@/_enums/serverResponseStatus.enum";
import { IClientSocketInterface } from "@/_interfaces/clientSocket.interface";
import { getEnvWsURL } from "@/_lib/env/exportEnv";
import { io } from "socket.io-client";

async function checkSocketServerStatus(wsUrl: string){
    'use client';
    try {
        const res = await fetch(wsUrl);
    if(res.ok){
        return true;
    };
    } catch (error) {
        console.log("Error in Fetching The Server");
        console.error(error);
        return false;
    };
};

export class ClientSocketRepository implements IClientSocketInterface {

    async connect(clientSocket: ClientSocket): Promise<ServerResponse<ClientSocket>> {
        const wsUrl = await getEnvWsURL();
        const checkServerAvailability = await checkSocketServerStatus(wsUrl);
        if(checkServerAvailability){
            clientSocket.socketHandler = io(wsUrl, {
                closeOnBeforeunload: true,
                reconnectionAttempts: 2,
            });
    
            clientSocket.socketHandler.on('connect', () => {
                clientSocket.socketStatus = ClientSocketStatusEnum.CONNECTED;
                console.log("Socket Connected");
            });
    
            return Promise.resolve(new ServerResponse<ClientSocket>(clientSocket, ServerResponseStatus.SUCCESS));
        } else {
            return Promise.resolve(new ServerResponse<ClientSocket>(clientSocket, ServerResponseStatus.SERVERERROR, new ServerResponseError("clientSocket", "connect", "Socket server is not available")));
        };
    };

    async disconnect(clientSocket: ClientSocket): Promise<ServerResponse<ClientSocket>> {
        if(clientSocket.socketStatus === ClientSocketStatusEnum.CONNECTED){
            clientSocket.socketHandler!.disconnect();
            clientSocket.socketStatus = ClientSocketStatusEnum.DISCONNECTED;
            return Promise.resolve(new ServerResponse<ClientSocket>(clientSocket, ServerResponseStatus.SUCCESS));
        } else {
            return Promise.resolve(new ServerResponse<ClientSocket>(clientSocket, ServerResponseStatus.SERVERERROR, new ServerResponseError("clientSocket", "disconnect", "Socket is not connected")));
        };
    };

    async send(clientSocket: ClientSocket, key:string, message: any): Promise<ServerResponse<ClientSocket>> {
        if(clientSocket.socketStatus === ClientSocketStatusEnum.CONNECTED){
            clientSocket.socketHandler!.emit(key, message!);
            return Promise.resolve(new ServerResponse<ClientSocket>(clientSocket, ServerResponseStatus.SUCCESS));
        } else {
            return Promise.resolve(new ServerResponse<ClientSocket>(clientSocket, ServerResponseStatus.SERVERERROR, new ServerResponseError("clientSocket", "send", "Socket is not connected")));
        };
    };
};