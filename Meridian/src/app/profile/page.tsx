'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import UserProfileContent from './components/UserProfileContent';

export default function ProfilePage() {
  return (
    <AppLayout activePath="/profile">
      <UserProfileContent />
    </AppLayout>
  );
}
