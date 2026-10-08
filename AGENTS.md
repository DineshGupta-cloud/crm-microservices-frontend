# CRM Frontend AI Development Instructions

## Stack
- React 19
- Vite
- Material UI
- React Router
- TanStack React Query
- Axios
- Zustand
- React Hook Form
- Zod

## Rules
1. Inspect existing components before creating new ones.
2. Reuse shared components, hooks, API services, and layouts.
3. Keep API calls centralized.
4. Use React Query for server state where already adopted.
5. Use Zustand only for client/global state that needs it.
6. Use React Hook Form/Zod for forms and validation.
7. Handle loading, error, empty, and success states.
8. Do not hardcode API URLs or secrets.
9. Keep access control consistent with backend permissions.
10. Do not duplicate pages/components when configuration or reuse is possible.
11. Avoid unnecessary useEffect and local state.
12. Do not modify unrelated screens.
13. Add tests for important reusable behaviour.

## API
The normal development API entry point is the API Gateway:
http://localhost:8080

JWT is sent as:
Authorization: Bearer <access-token>

## Feature Workflow
Plan -> inspect existing UI -> implement -> test -> review -> update PROJECT_STATUS.md.

## UI Standards
- consistent spacing and typography
- accessible labels
- disabled/loading states
- clear validation messages
- responsive layout
- reusable DataTable/Form patterns
- consistent notification/snackbar behaviour
