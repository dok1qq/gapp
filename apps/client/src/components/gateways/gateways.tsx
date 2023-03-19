import './gateways.css';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { Gateway } from '../../gateway';
import { getGateways } from '../../backend';
import GatewayItem from './gateway-item';

function Gateways() {
    const initRef = useRef(false);
    const [gateways, setGateways] = useState<Gateway[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (initRef.current) return;

        initRef.current = true;
        getGateways()
            .then(items => setGateways(items))
            .catch(err => {
                console.error(err);
            });

    }, []);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        const el = (event.target as HTMLElement);

        const itemEl = el.closest('[data-item-id]');
        if (itemEl) {
            const gatewayId = (itemEl as HTMLElement).dataset.itemId;
            navigate(`/gateways/${gatewayId}`);
        }
    };

    return (
        <div className="stack" onClick={handleClick}>
            {gateways.map(item => (
                <GatewayItem key={item.id} gateway={item} />
            ))}
        </div>
    );
}


export default Gateways;
