import { ClientSocketStatusEnum } from "@/_enums/clientSocket.enum";
import { Socket } from "socket.io-client";

export class ClientSocket{

    socketHandler: Socket | undefined;
    socketStatus: ClientSocketStatusEnum;

    constructor(){
        this.socketStatus = ClientSocketStatusEnum.DISCONNECTED;
    };

}