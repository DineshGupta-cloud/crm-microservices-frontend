import CrudPage from '../components/CrudPage';
import { taskApi } from '../services/crmApi';
const fields=[{field:'title',header:'Title'},{field:'description',header:'Description'},{field:'status',header:'Status'},{field:'priority',header:'Priority'},{field:'assignedTo',header:'Assigned To'},{field:'dueDate',header:'Due Date',type:'date'}];
export default function Task(){return <CrudPage title="Tasks" api={taskApi} columns={fields} fields={fields}/>;}
