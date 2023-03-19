import './gateway-form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Gateway, GatewayDTO } from '../../gateway';
import { createGateway } from '../../backend';
import { useActionModel } from '../../useModel';
import { State } from '../../model';


function GatewayForm() {
    const navigate = useNavigate();
    const [ip, setIp] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState<null | string>(null);
    const { model, action } = useActionModel<Gateway>();

    const addGateway = async (e: any) => {
        e.preventDefault();

        if (ip.length === 0) {
            setMessage('Fill IP field');
            return;
        }

        if (name.length === 0) {
            setMessage('Fill Name field');
            return;
        }

        setMessage(null);

        const dto: GatewayDTO = { ip, name };
        const success = await action(createGateway, dto);
        if (success) {
            navigate('/gateways');
        }
    };


    return (
        <form className="gateway-form" onSubmit={addGateway}>
            <div className="gateway-form__field">
                <label htmlFor="gateway-name">Gateway Name</label>
                <input
                    placeholder="Name"
                    id="gateway-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="gateway-form__field">
                <label htmlFor="gateway-ip">Gateway IP</label>
                <input
                    placeholder="127.0.0.1"
                    id="gateway-ip"
                    type="text"
                    value={ip}
                    onChange={e => setIp(e.target.value)}
                />
            </div>

            <button type="submit" className="gateway-form__action">Create</button>
            {model.state === State.ERROR && (
                <div className="gateway-form__error">{model.message}</div>
            )}
            {message && (
                <div className="gateway-form__error">{message}</div>
            )}
        </form>
    );
}

export default GatewayForm;
