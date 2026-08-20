import CrudPage from '../components/CrudPage';
import { branchApi } from '../services/crmApi';
const fields=[{field:'name',header:'Branch Name'},{field:'code',header:'Branch Code'},{field:'companyId',header:'Company ID'},{field:'email',header:'Email',type:'email'},{field:'phone',header:'Phone'},{field:'address',header:'Address'}];
export default function Branch(){return <CrudPage title="Branches" api={branchApi} columns={fields} fields={fields}/>;}
