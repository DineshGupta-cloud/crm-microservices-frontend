import CrudPage from '../components/CrudPage';
import { customerApi } from '../services/crmApi';

const fields = [
  { field: 'name', header: 'Customer Name' },
  { field: 'email', header: 'Email', type: 'email' },
  { field: 'phone', header: 'Phone' },
  { field: 'companyName', header: 'Company' },
  { field: 'address', header: 'Address' },
];

export default function Customer() {
  return <CrudPage title="Customers" api={customerApi} columns={fields} fields={fields} />;
}
