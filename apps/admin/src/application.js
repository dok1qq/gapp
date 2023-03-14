'use strict';

const IP = require('./ip');
const GUID = require('./guid');

const DeviceStatus = {
    ONLINE: 'online',
    OFFLINE: 'offline',
}

class Application {
    static gateways = new Map();
    static devices = new Map();
    static bounds = new Map();

    static async resolveGateways() {
        return Array.from(Application.gateways.values());
    }

    static async resolveGateway(id)  {
        const gateway = Application.gateways.get(id);
        if (!gateway) {
            throw new Error(`Gateway id=${id} doesnt exist!`);
        }

        const deviceIds = Application.bounds.get(id);
        console.assert(!!deviceIds, 'Synchronisation error between gateways and devices');

        const devices = deviceIds.map(deviceId => {
            return Application.devices.get(deviceId);
        });

        return {
            gateway,
            devices,
        };
    }

    static async createGateway(dto) {
        const { name, ip } = dto;

        const validation = IP.validateIPv4(ip);

        if (!validation.valid) {
            throw new Error(validation.message);
        }

        const gateway = {
            id: GUID.create(),
            ip,
            name,
        };

        Application.gateways.set(gateway.id, gateway)
        Application.bounds.set(gateway.id, []);

        return gateway;
    }

    static async updateGateway(gatewayId, dto) {
        const { name, ip } = dto;

        if (ip) {
            const validation = IP.validateIPv4(ip);

            if (!validation.valid) {
                throw new Error(validation.message);
            }
        }

        const current = Application.gateways.get(gatewayId);
        if (current) {
            const updated = {
                id: gatewayId,
                name: name || current.name,
                ip: ip || current.ip,
            };

            Application.gateways.set(updated.id, updated);
            return updated;
        }

        throw new Error(`Gateway id=${gatewayId} doesnt exist!`);
    }

    static async deleteGateway(gatewayId) {
        const gateway = Application.gateways.get(gatewayId);

        if (gateway) {
            const devices = Application.bounds.get(gatewayId);
            console.assert(!!devices, 'Synchronisation error between gateways and devices');

            if (Array.isArray(devices)) {
                devices.forEach(device => Application.devices.delete(device.id));
            }

            Application.bounds.delete(gatewayId);
            Application.gateways.delete(gatewayId);
        }
    }

    static async addDevice(dto) {
        const { gatewayId, vendor, date } = dto;
        const gateway = Application.gateways.get(gatewayId);

        if (!gateway) {
            throw new Error(`Gateway id=${gatewayId} doesnt exist!`);
        }

        const devicesIds = Application.bounds.get(gatewayId);

        const device = {
            id: GUID.create(),
            vendor,
            date,
            status: DeviceStatus.OFFLINE,
        };

        if  (devicesIds.length < 10) {
            devicesIds.push(device.id);
            Application.bounds.set(gatewayId, devicesIds);
            Application.devices.set(device.id, device);
        } else {
            throw new Error(`Reached maximum count of devices for gateway ${gatewayId}`);
        }

        return device;
    }

    static async deleteDevice(id) {
        const device = Application.devices.get(id);
        if (device) {
            Application.devices.delete(id);
            // TODO
        }
    }
}



module.exports = Application;


// const first = createGateway('first', '127.0.0.1');
// const second = createGateway('second', '127.0.0.1');
// const third = createGateway('third', '127.0.0.1');
// gateways.set(first.id, first);
// gateways.set(second.id, second);
// gateways.set(third.id, third);
