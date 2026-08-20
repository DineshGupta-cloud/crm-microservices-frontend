import CrudPage from '../components/CrudPage';
import { employeeApi } from '../services/crmApi';

const fields = [
  { field: 'firstName', header: 'First Name' },
  { field: 'lastName', header: 'Last Name' },
  { field: 'email', header: 'Email', type: 'email' },
  { field: 'phone', header: 'Phone' },
  { field: 'employeeCode', header: 'Employee Code' },
  { field: 'departmentId', header: 'Department ID' },
  { field: 'designationId', header: 'Designation ID' },
];

export default function Employee() {
  return <CrudPage title="Employees" api={employeeApi} columns={fields} fields={fields} />;
}
