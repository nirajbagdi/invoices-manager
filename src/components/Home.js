import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsPlusSquareFill } from 'react-icons/bs';

import InvoicesList from 'components/Invoices/InvoicesList';

const Home = () => (
	<div className="App d-flex align-items-center justify-content-center flex-column">
		<div className="text-center">
			<Link to="/new">
				<Button variant="primary">
					<BsPlusSquareFill className="me-2" />
					Add Invoice
				</Button>
			</Link>
		</div>

		<InvoicesList />
	</div>
);

export default Home;
