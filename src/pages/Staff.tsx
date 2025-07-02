
import { useAuth } from '@/hooks/useAuth';
import  StaffDashboard from '@/components/StaffDashboard';
import { Navigate } from 'react-router-dom';

const Staff = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'staff') {
    return <Navigate to="/login" replace />;
  }

  return <StaffDashboard  />;
};

export default Staff;
