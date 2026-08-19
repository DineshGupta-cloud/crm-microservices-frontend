import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import CrudTable from './CrudTable';

export default function CrudPage({ title, api, columns, fields = columns, initialForm = {} }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await api.list();
      const data = response.data;
      setRows(Array.isArray(data) ? data : data?.data ?? data?.content ?? []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Unable to load records');
    } finally { setLoading(false); }
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const save = async (event) => {
    event.preventDefault();
    try {
      if (editing) await api.update(editing.id, form);
      else await api.create(form);
      setOpen(false); setEditing(null); setForm({ ...initialForm }); await load();
    } catch (e) { setError(e.response?.data?.message || e.message || 'Unable to save record'); }
  };

  const edit = (row) => { setEditing(row); setForm({ ...row }); setOpen(true); };
  const create = () => { setEditing(null); setForm({ ...initialForm }); setOpen(true); };
  const remove = async (row) => {
    try { await api.remove(row.id); await load(); }
    catch (e) { setError(e.response?.data?.message || e.message || 'Unable to delete record'); }
  };

  return <>
    {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
    <CrudTable title={title} columns={columns} rows={rows} loading={loading} onRefresh={load} onCreate={create} onEdit={edit} onDelete={remove} />
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <DialogTitle>{editing ? `Edit ${title}` : `Create ${title}`}</DialogTitle>
      <form onSubmit={save}>
        <DialogContent><Grid container spacing={2} sx={{ mt: 0.5 }}>
          {fields.map((field) => <Grid item xs={12} md={6} key={field.field}>
            <TextField fullWidth required={field.required !== false} label={field.header} type={field.type || 'text'} value={form[field.field] ?? ''} onChange={(e) => setForm({ ...form, [field.field]: e.target.value })} />
          </Grid>)}
        </Grid></DialogContent>
        <DialogActions><Button onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" variant="contained">Save</Button></DialogActions>
      </form>
    </Dialog>
  </>;
}
