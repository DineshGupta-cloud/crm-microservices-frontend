import CrudPage from '../components/CrudPage';
import { companyApi } from '../services/crmApi';

const fields = [
  { field: 'name', header: 'Company Name' },
  { field: 'code', header: 'Company Code' },
  { field: 'email', header: 'Email', type: 'email' },
  { field: 'phone', header: 'Phone' },
  { field: 'address', header: 'Address' },
];

export default function Company() {
  return <CrudPage title="Companies" api={companyApi} columns={fields} fields={fields} />;
}
