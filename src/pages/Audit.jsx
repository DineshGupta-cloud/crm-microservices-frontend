import CrudPage from '../components/CrudPage';
import { auditApi } from '../services/crmApi';
const fields=[{field:'entityName',header:'Entity'},{field:'entityId',header:'Entity ID'},{field:'action',header:'Action'},{field:'username',header:'User'},{field:'createdAt',header:'Created At'}];
export default function Audit(){return <CrudPage title="Audit Logs" api={{...auditApi,list:auditApi.list}} columns={fields} fields={fields}/>;}
