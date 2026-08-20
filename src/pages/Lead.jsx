import CrudPage from '../components/CrudPage';
import { leadApi } from '../services/crmApi';

const fields = [
  { field: 'name', header: 'Lead Name' },
  { field: 'email', header: 'Email', type: 'email' },
  { field: 'phone', header: 'Phone' },
  { field: 'companyName', header: 'Company' },
  { field: 'status', header: 'Status' },
  { field: 'source', header: 'Source' },
];

export default function Lead() {
  return <CrudPage title="Leads" api={leadApi} columns={fields} fields={fields} />;
}
