import { Device } from '../../device';


interface GatewayDeviceProps {
    device: Device;
}

function GatewayDevice({ device }: GatewayDeviceProps) {
    const date = new Date(device.date).toDateString();
    return (
        <div className="stack-small">
            <div className="cluster device">
                <div className="device-info">
                    <div className="device-vendor">{device.vendor}</div>
                    <div
                        className="device-status"
                        data-online={device.status === 'online'}
                    >
                        {device.status}
                    </div>
                </div>
                <div className="cluster-space">
                    <div className="device-date">{date}</div>
                    <button data-device-id={device.id}>x</button>
                </div>
            </div>
        </div>
    );
}


export default GatewayDevice;
