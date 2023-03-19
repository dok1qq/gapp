import { useParams, useNavigate } from 'react-router-dom';

import { State } from '../../model';
import { useMountModel } from '../../useModel';
import { createDevice, deleteDevice, deleteGateway, getGatewayDetail } from '../../backend';
import { GatewayDetail } from '../../gateway';

import GatewayDetailComp from './gateway-detail';
import { DeviceDTO } from '../../device';


function GatewayDetailContainer() {
    const params = useParams();
    const navigate = useNavigate();
    const { model, reload } = useMountModel<GatewayDetail, string>(getGatewayDetail, params.id as string);


    const onDeleteGatewayHandler = async (id: string) => {
        try {
            await deleteGateway(id);
            navigate('/gateways');
        } catch (err) {
            console.error(err);
        }
    };

    const onDeleteDeviceHandler = async (id: string) => {
        try {
            await deleteDevice(id);
            reload();
        } catch (err) {
            console.error(err);
        }
    };

    const addDevice = async (dto: DeviceDTO) => {
        try {
            await createDevice(dto);
            reload();
        } catch (err) {
            console.error(err);
        }
    };

    if (model.state === State.PENDING) {
        return (
            <div>Pending</div>
        );
    }

    if (model.state === State.ERROR) {
        return (
            <div className="error">{model.message}</div>
        );
    }

    if (model.state === State.SUCCESS) {
        return (
            <GatewayDetailComp
                gateway={model.data.gateway}
                devices={model.data.devices}
                deleteGateway={onDeleteGatewayHandler}
                deleteDevice={onDeleteDeviceHandler}
                addDevice={addDevice}
            />
        );
    }

    return null;
}

export default GatewayDetailContainer;
