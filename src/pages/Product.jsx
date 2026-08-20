import CrudPage from '../components/CrudPage';
import { productApi } from '../services/crmApi';

const fields = [
  { field: 'name', header: 'Product Name' },
  { field: 'sku', header: 'SKU' },
  { field: 'description', header: 'Description' },
  { field: 'price', header: 'Price', type: 'number' },
  { field: 'status', header: 'Status' },
];

export default function Product() {
  return <CrudPage title="Products" api={productApi} columns={fields} fields={fields} />;
}
