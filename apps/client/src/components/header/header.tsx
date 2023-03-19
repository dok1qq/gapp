import './header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const openGateways = () => {
        navigate('/gateways');
    };

    const createGateway = () => {
        navigate('/gateways/new');
    };

    return (
        <div className="header">
            <div className="header-item" onClick={openGateways}>Gateways</div>
            <div className="header-item" onClick={createGateway}>Add Gateway</div>
        </div>
    );
}

export default Header;
