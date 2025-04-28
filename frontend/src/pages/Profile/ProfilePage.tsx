import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

interface ProfileFormInputs {
  name: string;
  email: string;
  skills: string;
  bio: string;
  portfolioLink: string;
  city: string;
  country: string;
  avatar: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormInputs>();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/api/users/profile');
      return response.data;
    },
    onSuccess: (data) => {
      reset({
        name: data.name,
        email: data.email,
        skills: data.skills.join(', '),
        bio: data.bio,
        portfolioLink: data.portfolioLink,
        city: data.location.city,
        country: data.location.country,
        avatar: data.avatar,
      });
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ProfileFormInputs) => {
      const payload = {
        name: data.name,
        skills: data.skills.split(',').map((s) => s.trim()),
        bio: data.bio,
        portfolioLink: data.portfolioLink,
        location: {
          city: data.city,
          country: data.country,
        },
        avatar: data.avatar,
      };
      const response = await axios.put('http://localhost:5000/api/users/profile', payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const onSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            {...register('name', { required: 'Full name is required' })}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            {...register('email')}
            disabled
          />
          {user?.role === 'freelancer' && (
            <>
              <Input
                label="Skills (comma-separated)"
                {...register('skills', { required: 'Skills are required' })}
                placeholder="e.g., Web Development, UI/UX Design"
                error={errors.skills?.message}
              />
              <Input
                label="Bio"
                {...register('bio', { required: 'Bio is required' })}
                error={errors.bio?.message}
              />
              <Input
                label="Portfolio Link"
                {...register('portfolioLink')}
                error={errors.portfolioLink?.message}
              />
              <Input
                label="City"
                {...register('city')}
                error={errors.city?.message}
              />
              <Input
                label="Country"
                {...register('country')}
                error={errors.country?.message}
              />
              <Input
                label="Profile Picture URL"
                {...register('avatar')}
                error={errors.avatar?.message}
              />
            </>
          )}
          <Button type="submit" variant="primary" fullWidth>
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;