import CrudPage from '../components/CrudPage';
import { designationApi } from '../services/crmApi';
const fields=[{field:'name',header:'Designation Name'},{field:'code',header:'Designation Code'},{field:'description',header:'Description'}];
export default function Designation(){return <CrudPage title="Designations" api={designationApi} columns={fields} fields={fields}/>;}
