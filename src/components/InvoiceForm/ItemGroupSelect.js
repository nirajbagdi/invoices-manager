import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

const ItemGroupSelect = ({ item, onItemizedItemEdit }) => {
	const { groups } = useSelector(state => state.invoices);

	return (
		<Form.Select
			id={item.id}
			name="group"
			value={item.group}
			className="mt-2"
			style={{ width: '10rem' }}
			onChange={onItemizedItemEdit}
		>
			<option value="">Select Category</option>

			{groups.map(group => (
				<option key={group} value={group}>
					{group}
				</option>
			))}
		</Form.Select>
	);
};

export default ItemGroupSelect;
