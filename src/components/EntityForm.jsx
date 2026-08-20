import { useEffect, useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';

export default function EntityForm({ open, title, fields, initialValues = {}, onClose, onSubmit, submitting = false }) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState('');
  useEffect(() => { setValues(initialValues || {}); setError(''); }, [initialValues, open]);
  const submit = async (e) => { e.preventDefault(); try { await onSubmit(values); } catch (err) { setError(err?.response?.data?.message || err?.message || 'Unable to save'); } };
  return <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"><DialogTitle>{title}</DialogTitle><form onSubmit={submit}><DialogContent>{error && <Alert severity="error" sx={{mb:2}}>{error}</Alert>}<Grid container spacing={2}>{fields.map(f=><Grid item xs={12} md={f.fullWidth?12:6} key={f.name}><TextField fullWidth required={f.required !== false} label={f.label} type={f.type || 'text'} multiline={f.multiline} minRows={f.multiline?3:undefined} value={values[f.name] ?? ''} onChange={e=>setValues(v=>({...v,[f.name]:e.target.value}))}/></Grid>)}</Grid></DialogContent><DialogActions><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="contained" disabled={submitting}>{submitting?'Saving...':'Save'}</Button></DialogActions></form></Dialog>;
}
