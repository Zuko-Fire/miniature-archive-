// shared/ui/badge.tsx
import { View, Text } from '@gluestack-ui/themed';
import { cn } from '@/shared/lib/cn';

interface BadgeProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Badge({ children, active, onClick, className }: BadgeProps) {
  return (
    <View
      onPress={onClick}
      className={cn(
        "px-3 py-1 rounded-full cursor-pointer transition-colors",
        active 
          ? "bg-accentPurple" 
          : "bg-dark800 hover:bg-dark700",
        className
      )}
    >
      <Text 
        className={cn(
          "text-xs font-medium",
          active ? "text-white" : "text-gray-400"
        )}
      >
        {children}
      </Text>
    </View>
  );
}