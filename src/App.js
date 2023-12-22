import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/Home';
import InvoiceForm from './components/InvoiceForm';
import InvoiceModal from './components/InvoiceModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const router = createBrowserRouter([
	{ path: '/', element: <Home /> },
	{ path: '/new', element: <InvoiceForm /> },
	{ path: '/edit/:invoiceSlug', element: <InvoiceForm /> },
]);

const App = () => (
	<div className="App d-flex flex-column align-items-center justify-content-center w-100">
		<Container>
			<InvoiceModal />
			<RouterProvider router={router} />
		</Container>
	</div>
);

export default App;
