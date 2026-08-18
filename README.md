# Enterprise CRM Frontend

React + Vite frontend for the Enterprise CRM microservices platform.

## Backend

- Architecture: https://github.com/DineshGupta-cloud/crm-microservices-architecture
- Services: https://github.com/DineshGupta-cloud/crm-microservices-services

## Stack

- React 19
- Vite
- Material UI
- React Router
- TanStack React Query
- Axios
- Zustand
- React Hook Form / Zod

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## API configuration

Create `.env`:

```env
VITE_API_URL=http://localhost:8080
```

The frontend sends JWT access tokens as `Authorization: Bearer <token>` and routes API calls through the API Gateway.

## Modules

- Dashboard
- Company
- Branch
- Department
- Designation
- Employee
- Lead
- Customer
- Vendor
- Product
- Task
- Notification
- Audit

## Production build

```bash
npm run build
npm run preview
```
