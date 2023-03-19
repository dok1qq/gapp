import { Gateway } from '../../gateway';

interface GatewayProps {
    gateway: Gateway;
}

function GatewayItem({ gateway }: GatewayProps) {
    return (
        <div className="stack-small gateway" data-item-id={gateway.id}>
            <div className="gateway-name">{gateway.name}</div>
            <div className="gateway-ip">{gateway.ip}</div>
        </div>
    )
}


export default GatewayItem;
