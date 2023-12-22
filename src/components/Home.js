import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsPlusSquareFill } from 'react-icons/bs';

import InvoicesList from 'components/Invoices/InvoicesList';

const Home = () => (
	<>
		<div className="text-center my-4">
			<Link to="/new">
				<Button variant="primary">
					<BsPlusSquareFill className="me-2" />
					Add Invoice
				</Button>
			</Link>
		</div>

		<InvoicesList />
	</>
);

export default Home;
