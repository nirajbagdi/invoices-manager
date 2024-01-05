import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';

export const invoiceTabs = ['Invoice Details', 'Products'];

const InvoiceNavigation = ({ activeTab, onTabChange }) => (
	<Nav className="d-flex align-items-center" style={{ fontSize: '1rem' }}>
		<Nav.Item>
			<Link to="/">
				<IoMdArrowRoundBack style={{ fontSize: '1.2rem' }} className="me-3" />
			</Link>
		</Nav.Item>

		{invoiceTabs.map((tab, idx) => (
			<Fragment key={idx}>
				<Nav.Item>
					<Nav.Link
						className="text-primary"
						style={{ fontWeight: tab === activeTab ? 600 : 400 }}
						onClick={onTabChange.bind(null, tab)}
					>
						{tab}
					</Nav.Link>
				</Nav.Item>

				<span className="fw-bold text-primary link-separator">/</span>
			</Fragment>
		))}
	</Nav>
);

export default InvoiceNavigation;
