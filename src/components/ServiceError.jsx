import { Alert, Button } from '@mui/material';

export default function ServiceError({ service, message, onRetry }) {
  return (
    <Alert severity="warning" action={<Button size="small" onClick={onRetry}>Retry</Button>}>
      {service}: {message || 'Service unavailable'}
    </Alert>
  );
}
