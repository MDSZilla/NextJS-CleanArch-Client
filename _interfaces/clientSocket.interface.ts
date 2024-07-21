
import { ClientSocket } from "@/_entities/clientSocket.entity";
import { ServerResponse } from "@/_entities/serverResponse.entity";


export interface IClientSocketInterface{
    connect(clientSocket: ClientSocket): Promise<ServerResponse<ClientSocket>>;
    disconnect(clientSocket: ClientSocket): Promise<ServerResponse<ClientSocket>>;
    send(clientSocket: ClientSocket, key: string, message: string): Promise<ServerResponse<ClientSocket>>;
};