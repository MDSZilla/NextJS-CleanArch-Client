'use client;'
import { ClientSocket } from "@/_entities/clientSocket.entity";
import { ServerResponseType } from "@/_entities/serverResponse.entity";
import { ClientSocketStatusEnum } from "@/_enums/clientSocket.enum";
import { ServerResponseEnum } from "@/_enums/serverResponseStatus.enum";
import { IClientSocketInterface } from "@/_interfaces/clientSocket.interface";
import { io } from "socket.io-client";

const repositoryName = 'ClientSocketRepository'

export class ClientSocketRepository implements IClientSocketInterface {

    async connect(clientSocket: ClientSocket): Promise<ServerResponseType<ClientSocket>> {
        clientSocket.socketHandler = io('URL', {
            closeOnBeforeunload: true,
            reconnectionAttempts: 2,
            path: '/path',
        });

        return new Promise((resolve, reject) => {

            //If Socket Connects
            clientSocket.socketHandler!.on('connect', () => {
                clientSocket.socketStatus = ClientSocketStatusEnum.CONNECTED;
                console.log("Socket Connected");

                resolve(<ServerResponseType<ClientSocket>> {
                    response: clientSocket,
                    status: ServerResponseEnum.SUCCESS
                });

            });

            //If Socket Throws Error
            clientSocket.socketHandler!.on('connect_error', (error) => {
                console.error("Connection Error:", error);
                clientSocket.socketStatus = ClientSocketStatusEnum.DISCONNECTED; // Update status on error
                reject(<ServerResponseType<ClientSocket>> {
                    response: clientSocket,
                    error: {
                        message: `${error}`,
                        method: 'connect()',
                        repository: repositoryName,
                    }, status: ServerResponseEnum.INTERNAL_SERVER_ERROR,
                });
            });
        })
    };

    async disconnect(clientSocket: ClientSocket): Promise<ServerResponseType<ClientSocket>> {
        if(clientSocket.socketStatus === ClientSocketStatusEnum.CONNECTED){
            clientSocket.socketHandler!.disconnect();
            clientSocket.socketStatus = ClientSocketStatusEnum.DISCONNECTED;
            return Promise.resolve(<ServerResponseType<ClientSocket>> {
                status: ServerResponseEnum.SUCCESS,
                response: clientSocket,
            });
        } else {
            return Promise.resolve(<ServerResponseType<ClientSocket>> {
                status: ServerResponseEnum.BAD_REQUEST,
                response: clientSocket,
                error: {
                    message: 'Socket is not connected.',
                    method: 'disconnect()',
                    repository: repositoryName,
                },
            });
        };
    };

    async send(clientSocket: ClientSocket, key:string, message: any): Promise<ServerResponseType<ClientSocket>> {
        if(clientSocket.socketStatus === ClientSocketStatusEnum.CONNECTED){
            clientSocket.socketHandler!.emit(key, message!);
            return Promise.resolve(<ServerResponseType<ClientSocket>> {
                response: clientSocket,
                status: ServerResponseEnum.SUCCESS,
            });
        } else {
            return Promise.resolve(<ServerResponseType<ClientSocket>> {
                response: clientSocket,
                status: ServerResponseEnum.BAD_REQUEST,
                error: {
                    message: "Socket is not connected.",
                    method: 'send()',
                    repository: repositoryName,
                },
            });
        };
    };
};