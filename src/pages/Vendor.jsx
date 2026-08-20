import CrudPage from '../components/CrudPage';
import { vendorApi } from '../services/crmApi';
const fields=[{field:'name',header:'Vendor Name'},{field:'email',header:'Email',type:'email'},{field:'phone',header:'Phone'},{field:'companyName',header:'Company'},{field:'address',header:'Address'},{field:'status',header:'Status'}];
export default function Vendor(){return <CrudPage title="Vendors" api={vendorApi} columns={fields} fields={fields}/>;}
