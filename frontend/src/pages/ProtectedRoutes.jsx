import { useAuth } from '../context/AuthContext';

function ProtectedRoutes() {
  const { user, isAuthenticated } = useAuth();

  return <div>ProtectedRoutes</div>;
}

export default ProtectedRoutes;
