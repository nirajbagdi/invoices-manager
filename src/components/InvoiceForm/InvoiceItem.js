import { Table, Button } from 'react-bootstrap';
import { BiTrash } from 'react-icons/bi';

import EditableField from './EditableField';
import ItemGroupSelect from './ItemGroupSelect';

import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceItem = props => {
	const itemTableJSX = props.items.map(item => (
		<ItemRow
			key={item.id}
			item={item}
			currency={props.currency}
			onItemizedItemEdit={props.onItemizedItemEdit}
			onDelEvent={props.onRowDel.bind(this, item.id)}
		/>
	));

	return (
		<div>
			<Table>
				<thead>
					<tr>
						<th>ITEM</th>
						<th>QTY</th>
						<th>PRICE/RATE</th>
						<th className="text-center">ACTION</th>
					</tr>
				</thead>

				<tbody>{itemTableJSX}</tbody>
			</Table>

			{!props.onlyForm && (
				<Button className="fw-bold" onClick={props.onRowAdd}>
					Add Item
				</Button>
			)}
		</div>
	);
};

const ItemRow = props => (
	<tr>
		<td style={{ width: '100%' }}>
			<EditableField
				onItemizedItemEdit={props.onItemizedItemEdit}
				cellData={{
					type: 'text',
					name: 'name',
					placeholder: 'Item name',
					value: props.item.name,
					id: props.item.id,
				}}
			/>

			<EditableField
				onItemizedItemEdit={props.onItemizedItemEdit}
				cellData={{
					type: 'text',
					name: 'description',
					placeholder: 'Item description',
					value: props.item.description,
					id: props.item.id,
				}}
			/>
		</td>

		<td style={{ minWidth: '70px' }}>
			<EditableField
				onItemizedItemEdit={props.onItemizedItemEdit}
				cellData={{
					type: 'number',
					name: 'quantity',
					min: 1,
					step: '1',
					value: props.item.quantity,
					id: props.item.id,
				}}
			/>

			<ItemGroupSelect item={props.item} onItemizedItemEdit={props.onItemizedItemEdit} />
		</td>

		<td style={{ minWidth: '130px' }}>
			<EditableField
				onItemizedItemEdit={props.onItemizedItemEdit}
				cellData={{
					leading: props.currency,
					type: 'number',
					name: 'price',
					min: 1,
					step: 0.01,
					presicion: 2,
					textAlign: 'text-end',
					value: props.item.price,
					id: props.item.id,
				}}
			/>
		</td>

		<td className="text-center" style={{ minWidth: '50px' }}>
			<BiTrash
				onClick={props.onDelEvent.bind(null, props.item)}
				style={{ height: '33px', width: '33px', padding: '7.5px' }}
				className="text-white mt-1 btn btn-danger"
			/>
		</td>
	</tr>
);

export default InvoiceItem;
