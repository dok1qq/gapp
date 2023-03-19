
export type Status = 'online' | 'offline';

export interface Device {
    id: string;
    vendor: string;
    date: number;
    status: Status;
}

export interface DeviceDTO {
    gatewayId: string;
    vendor: string;
    date: number;
}
