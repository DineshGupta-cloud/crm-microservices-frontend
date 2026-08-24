import { useEffect, useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import LookupSelect from './LookupSelect';
import { useBranches, useCompanies, useDepartments, useDesignations } from '../hooks/useLookups';

export default function EmployeeForm({ open, initialValues = {}, onClose, onSubmit }) {
  const [form, setForm] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { setForm(initialValues || {}); setError(''); }, [initialValues, open]);

  const company = useCompanies();
  const branch = useBranches(form.companyId);
  const department = useDepartments(form.branchId);
  const designation = useDesignations();
  const set = (name, value) => setForm((current) => ({ ...current, [name]: value }));
  const changeCompany = (value) => setForm((current) => ({ ...current, companyId: value, branchId: '', departmentId: '' }));
  const changeBranch = (value) => setForm((current) => ({ ...current, branchId: value, departmentId: '' }));
  const submit = async (event) => { event.preventDefault(); setSaving(true); setError(''); try { await onSubmit(form); } catch (e) { setError(e.response?.data?.message || e.message || 'Unable to save employee'); } finally { setSaving(false); } };

  return <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"><DialogTitle>Employee</DialogTitle><form onSubmit={submit}><DialogContent>{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}<Grid container spacing={2}>
    <Grid item xs={12} md={6}><TextField fullWidth required label="Employee Code" value={form.employeeCode || ''} onChange={e=>set('employeeCode',e.target.value)}/></Grid>
    <Grid item xs={12} md={6}><TextField fullWidth required label="First Name" value={form.firstName || ''} onChange={e=>set('firstName',e.target.value)}/></Grid>
    <Grid item xs={12} md={6}><TextField fullWidth required label="Last Name" value={form.lastName || ''} onChange={e=>set('lastName',e.target.value)}/></Grid>
    <Grid item xs={12} md={6}><TextField fullWidth required type="email" label="Email" value={form.email || ''} onChange={e=>set('email',e.target.value)}/></Grid>
    <Grid item xs={12} md={6}><TextField fullWidth label="Phone" value={form.phone || ''} onChange={e=>set('phone',e.target.value)}/></Grid>
    <Grid item xs={12} md={6}><LookupSelect required label="Company" value={form.companyId} options={company.options} loading={company.loading} onChange={changeCompany}/></Grid>
    <Grid item xs={12} md={6}><LookupSelect required label="Branch" value={form.branchId} options={branch.options} loading={branch.loading} disabled={!form.companyId} onChange={changeBranch}/></Grid>
    <Grid item xs={12} md={6}><LookupSelect required label="Department" value={form.departmentId} options={department.options} loading={department.loading} disabled={!form.branchId} onChange={v=>set('departmentId',v)}/></Grid>
    <Grid item xs={12} md={6}><LookupSelect required label="Designation" value={form.designationId} options={designation.options} loading={designation.loading} onChange={v=>set('designationId',v)}/></Grid>
  </Grid></DialogContent><DialogActions><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="contained" disabled={saving}>{saving?'Saving...':'Save Employee'}</Button></DialogActions></form></Dialog>;
}
