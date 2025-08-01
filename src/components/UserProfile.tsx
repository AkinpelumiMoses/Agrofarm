import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { authApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, Trash2 } from 'lucide-react';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const updates: any = {};
      if (formData.name !== user?.name) updates.name = formData.name;
      if (formData.email !== user?.email) updates.email = formData.email;
      if (formData.password) updates.password = formData.password;

      if (Object.keys(updates).length === 0) {
        toast({ title: "No changes", description: "No changes were made to your profile." });
        return;
      }

      await authApi.updateProfile(updates);
      toast({ title: "Profile updated", description: "Your profile has been updated." });
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await authApi.logoutAll();
      logout();
      toast({ title: "Logged out", description: "You have been logged out everywhere." });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Failed to logout from all devices.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await authApi.deleteAccount(user);
      logout();
      toast({ title: "Account deleted", description: "Your account has been permanently deleted." });
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: "Failed to delete your account.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-green-500" />
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        </div>

        {/* Profile Info Card */}
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="text-green-500">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">New Password (optional)</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isUpdating}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="text-red-500">Security & Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              onClick={handleLogoutAll}
              className="w-full flex items-center justify-center gap-2 text-white border-green-600 hover:bg-green-600"
            >
              <LogOut className="h-4 w-4" />
              Logout from All Devices
            </Button>

            <Separator className="bg-gray-700" />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 text-white border border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your account will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
