import CrudPage from '../components/CrudPage';
import { departmentApi } from '../services/crmApi';
const fields=[{field:'name',header:'Department Name'},{field:'code',header:'Department Code'},{field:'companyId',header:'Company ID'},{field:'branchId',header:'Branch ID'},{field:'description',header:'Description'}];
export default function Department(){return <CrudPage title="Departments" api={departmentApi} columns={fields} fields={fields}/>;}
