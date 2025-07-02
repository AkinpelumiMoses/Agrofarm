
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <UserProfile />
    </div>
  );
};

export default Profile;
