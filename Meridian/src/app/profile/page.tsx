'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import UserProfileContent from './Components/UserProfileContent';

export default function ProfilePage() {
  return (
    <AppLayout activePath="/profile">
      <UserProfileContent />
    </AppLayout>
  );
}
