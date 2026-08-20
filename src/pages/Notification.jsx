import CrudPage from '../components/CrudPage';
import { notificationApi } from '../services/crmApi';
const fields=[{field:'title',header:'Title'},{field:'message',header:'Message'},{field:'userId',header:'User ID'},{field:'type',header:'Type'},{field:'read',header:'Read'}];
export default function Notification(){return <CrudPage title="Notifications" api={{list:notificationApi.list,create:async()=>{throw new Error('Use notification event API')},update:async()=>{throw new Error('Use mark as read')},remove:async()=>{throw new Error('Notification deletion is not supported by the API')},get:notificationApi.list}} columns={fields} fields={fields}/>;}
