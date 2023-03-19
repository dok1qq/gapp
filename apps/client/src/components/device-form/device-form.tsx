import './device-form.css';
import { useState } from 'react';

import { State } from '../../model';
import { useActionModel } from '../../useModel';
import { Device, DeviceDTO } from '../../device';

interface DeviceFormProps {
    gatewayId: string;
    addDevice(dto: DeviceDTO): void;
}

function DeviceForm({ gatewayId, addDevice }: DeviceFormProps) {
    const [vendor, setVendor] = useState('');
    const { model } = useActionModel<Device>();

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (vendor.length === 0) {
            return;
        }

        const dto: DeviceDTO = {
            vendor,
            gatewayId,
            date: new Date().valueOf(),
        };
        addDevice(dto);
    };


    return (
        <form className="device-form" onSubmit={onSubmit}>
            <div className="device-form-inner">
                <input
                    type="text"
                    placeholder="Device vendor"
                    value={vendor}
                    onChange={e => setVendor(e.target.value)}
                />

                <button type="submit" className="device-form__action">Add</button>
            </div>
            {model.state === State.ERROR && (
                <div className="device-form__error">{model.message}</div>
            )}
        </form>
    );
}

export default DeviceForm;
