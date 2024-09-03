import { Navigate } from 'react-router-dom';
import readcookie from '../../utils/readcookie';

const ProtectedRoute = ({ element: Component }) => {
  const token = readcookie('jwt_token'); 

  return token ? <Component /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
