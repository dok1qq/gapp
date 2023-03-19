import { Gateway, GatewayDetail, GatewayDTO } from './gateway';
import { Device, DeviceDTO } from './device';

async function fetchJsonGetWrapper<T, D>(url: string): Promise<T> {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response?.ok) {
        return response.json();
    }

    const result = await response.json();
    throw new Error(JSON.stringify(result));
}

async function fetchJsonPostWrapper<T, D>(url: string, body: D): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response?.ok) {
        return response.json();
    }

    const result = await response.json();
    throw new Error(JSON.stringify(result));
}

async function fetchJsonDeleteWrapper<T>(url: string): Promise<void> {
    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (response?.ok) {
        return Promise.resolve();
    }

    const result = await response.json();
    throw new Error(JSON.stringify(result));
}

const BASE_URL = 'http://localhost:3456';

export async function getGateways(): Promise<Gateway[]> {
    return fetchJsonGetWrapper(`${BASE_URL}/api/gateway`);
}

export async function getGatewayDetail(id: string): Promise<GatewayDetail> {
    const url = `${BASE_URL}/api/gateway/${id}`;
    return fetchJsonGetWrapper(url);
}

export async function createGateway(dto: GatewayDTO): Promise<Gateway> {
    return fetchJsonPostWrapper(`${BASE_URL}/api/gateway`, dto);
}

export async function createDevice(dto: DeviceDTO): Promise<Device> {
    return fetchJsonPostWrapper(`${BASE_URL}/api/gateway/device`, dto);
}

export async function deleteGateway(id: string): Promise<void> {
    const url = `${BASE_URL}/api/gateway/${id}`;
    return fetchJsonDeleteWrapper(url);
}

export async function deleteDevice(id: string): Promise<void> {
    const url = `${BASE_URL}/api/gateway/device/${id}`;
    return fetchJsonDeleteWrapper(url);
}
