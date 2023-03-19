import { Device } from './device';

export interface Gateway {
    id: string;
    ip: string;
    name: string;
}

export interface GatewayDetail {
    gateway: Gateway;
    devices: Device[];
}


export interface GatewayDTO {
    ip: string;
    name: string;
}
