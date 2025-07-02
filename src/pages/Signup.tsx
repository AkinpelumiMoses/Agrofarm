
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-50">
            
          </h2>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
