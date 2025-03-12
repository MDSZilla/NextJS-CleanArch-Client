
import { ClientSocket } from "@/_entities/clientSocket.entity";
import { ServerResponseType } from "@/_entities/serverResponse.entity";


export interface IClientSocketInterface{
    connect(clientSocket: ClientSocket): Promise<ServerResponseType<ClientSocket>>;
    disconnect(clientSocket: ClientSocket): Promise<ServerResponseType<ClientSocket>>;
    send(clientSocket: ClientSocket, key: string, message: string): Promise<ServerResponseType<ClientSocket>>;
};