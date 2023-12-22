import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

import { saveItem, setActiveInvoice } from './actions/invoicesActions';
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

const App = () => {
	const { activeInvoice } = useSelector(state => state.invoices);
	const dispatch = useDispatch();

	return (
		<div className="App d-flex flex-column align-items-center justify-content-center w-100">
			<Container>
				<InvoiceModal
					showModal={activeInvoice !== null}
					invoice={activeInvoice}
					closeModal={() => dispatch(setActiveInvoice(null))}
					onInvoiceSave={() => {
						dispatch(saveItem(activeInvoice));
						dispatch(setActiveInvoice(null));
					}}
				/>

				<RouterProvider router={router} />
			</Container>
		</div>
	);
};

export default App;
