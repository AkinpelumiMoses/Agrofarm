import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white text-lg">
          <Loader2 className="animate-spin h-5 w-5 text-green-500" />
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold text-green-500 mb-6">Your Profile</h1>
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
