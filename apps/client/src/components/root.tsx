import { Outlet } from 'react-router-dom';

import Header from './header/header';

function Root() {
    return (
        <div className="content">
            <Header />
            <Outlet />
        </div>
    );
}

export default Root;
