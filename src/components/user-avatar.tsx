'use client';

import { cn } from '../lib/utils';
import { getContrastingTextColor, getColorFromString } from '../lib/colors';

// Helper function to get initials from a name
export const getInitials = (name: string) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

interface UserAvatarProps {
  userEmail: string;
  userFullName: string;
  size?: number;
  className?: string;
}

export function UserAvatar({ userEmail, userFullName, size = 32, className }: UserAvatarProps) {
  const initials = getInitials(userFullName);

  // Generate deterministic color based on email
  const avatarColor = getColorFromString(userEmail);
  const textColor = getContrastingTextColor(avatarColor);

  // Calculate font size based on avatar size
  const fontSize = Math.max(Math.floor(size * 0.4), 12); // 40% of size, minimum 12px

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full transition-all duration-200 hover:brightness-110',
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    >

      <div
        className={cn(
          'flex h-full w-full items-center justify-center font-medium'
        )}
        style={{
          backgroundColor: avatarColor,
          color: textColor,
          fontSize: `${fontSize}px`,
        }}
      >
        {initials || '?'}
      </div>
    </div>
  );
}
