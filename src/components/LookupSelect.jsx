import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function LookupSelect({ label, value, onChange, options = [], loading = false, disabled = false, required = false }) {
  return (
    <FormControl fullWidth required={required} disabled={disabled || loading}>
      <InputLabel>{label}</InputLabel>
      <Select value={value ?? ''} label={label} onChange={(event) => onChange(event.target.value)}>
        {loading && <MenuItem value=""><em>Loading...</em></MenuItem>}
        {!loading && options.map((item) => (
          <MenuItem key={item.id} value={item.id}>{item.name || item.code || item.title || item.label}</MenuItem>
        ))}
      </Select>
      {loading && <CircularProgress size={18} sx={{ position: 'absolute', right: 32, top: 16 }} />}
    </FormControl>
  );
}
