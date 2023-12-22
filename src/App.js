import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';
import InvoiceModal from './components/InvoiceModal';
import Home from './components/Home';
import { saveItem, setActiveInvoice } from './store/invoicesReducer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const App = () => {
	const invoices = useSelector(state => state.invoices.items);
	const activeInvoice = useSelector(state => state.invoices.activeInvoice);
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

				<Routes>
					<Route path="/" element={<Home invoices={invoices} />} />
					<Route path="/new" element={<InvoiceForm />} />
					<Route path="/edit/:invoiceSlug" element={<InvoiceForm />} />
				</Routes>
			</Container>
		</div>
	);
};

export default App;
