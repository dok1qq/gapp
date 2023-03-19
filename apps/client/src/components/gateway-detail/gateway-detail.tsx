import './device.css';
import { Device, DeviceDTO } from '../../device';
import { Gateway } from '../../gateway';
import GatewayDevice from './gateway-device';
import DeviceForm from '../device-form/device-form';
import { MouseEvent } from 'react';


interface GatewayDetailProps {
    gateway: Gateway;
    devices: Device[];
    deleteGateway(id: string): void;
    deleteDevice(id: string): void;
    addDevice(dto: DeviceDTO): void;
}

function GatewayDetailComp(props: GatewayDetailProps) {
    const {
        gateway,
        devices,
        deleteDevice,
        deleteGateway,
        addDevice,
    } = props;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        const el = (event.target as HTMLElement);

        const itemEl = el.closest('[data-device-id]');
        if (itemEl) {
            const deviceId = (itemEl as HTMLElement).dataset.deviceId;
            deleteDevice(deviceId as string);
        }
    };

    return (
        <div className="stack-large">
            <div className="gateway">
                <div className="cluster">
                    <div className="gateway-info">
                        <div className="gateway-name">{gateway.name}</div>
                        <div className="gateway-ip">{gateway.ip}</div>
                    </div>
                    <div className="gateway-actions">
                        <button onClick={() => deleteGateway(gateway.id)}>Delete</button>
                    </div>
                </div>
            </div>

            <div className="stack" onClick={handleClick}>
                {devices.map(device => (
                    <GatewayDevice key={device.id} device={device} />
                ))}
                <DeviceForm gatewayId={gateway.id} addDevice={addDevice} />
            </div>
        </div>
    );
}

export default GatewayDetailComp;
