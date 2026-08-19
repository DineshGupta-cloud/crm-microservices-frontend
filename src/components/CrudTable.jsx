import { useMemo, useState } from 'react';
import {
  Alert, Box, Button, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, IconButton, Paper, Table, TableBody,
  TableCell, TableHead, TablePagination, TableRow, TextField, Typography
} from '@mui/material';
import { Add, Delete, Edit, Refresh } from '@mui/icons-material';

export default function CrudTable({
  title,
  columns,
  rows = [],
  loading = false,
  error = null,
  onRefresh,
  onCreate,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [deleteRow, setDeleteRow] = useState(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => columns.some((column) =>
      String(row[column.field] ?? '').toLowerCase().includes(term)
    ));
  }, [rows, columns, search]);

  const visibleRows = filtered.slice(page * size, page * size + size);

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h5" sx={{ flex: 1 }}>{title}</Typography>
        <TextField
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        />
        <IconButton onClick={onRefresh} disabled={loading}><Refresh /></IconButton>
        <Button variant="contained" startIcon={<Add />} onClick={onCreate}>Add</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? <Box textAlign="center" p={5}><CircularProgress /></Box> : (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => <TableCell key={column.field}>{column.header}</TableCell>)}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => <TableCell key={column.field}>{String(row[column.field] ?? '')}</TableCell>)}
                  <TableCell align="right">
                    <IconButton onClick={() => onEdit(row)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => setDeleteRow(row)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {!visibleRows.length && <TableRow><TableCell colSpan={columns.length + 1} align="center">No records found</TableCell></TableRow>}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={size}
            onPageChange={(_, next) => setPage(next)}
            onRowsPerPageChange={(e) => { setSize(Number(e.target.value)); setPage(0); }}
          />
        </>
      )}

      <Dialog open={Boolean(deleteRow)} onClose={() => setDeleteRow(null)}>
        <DialogTitle>Delete record?</DialogTitle>
        <DialogContent>This action cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteRow(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => { onDelete(deleteRow); setDeleteRow(null); }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
