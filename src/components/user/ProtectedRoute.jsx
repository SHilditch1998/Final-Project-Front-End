import { Navigate } from 'react-router-dom';
import readcookie from '../../utils/readcookie'; // Assuming you have this utility

const ProtectedRoute = ({ element: Component }) => {
  const token = readcookie('jwt_token'); // Check if the user is authenticated

  return token ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
