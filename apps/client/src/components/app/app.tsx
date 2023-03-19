import './app.css';

import {
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';

import Root from '../root';
import Gateways from '../gateways/gateways';
import GatewayForm from '../gateway-form/gateway-form';
import GatewayDetail from '../gateway-detail/gateway-detail-container';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'gateways',
                element: <Gateways />
            },
            {
                path: 'gateways/new',
                element: <GatewayForm />
            },
            {
                path: 'gateways/:id',
                element: <GatewayDetail />
            },
        ]
    },
]);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  )
}

export default App
