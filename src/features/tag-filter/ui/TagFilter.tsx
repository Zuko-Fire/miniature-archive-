import { View, Text, Pressable } from '@gluestack-ui/themed';
import { cn } from '@/shared/lib/cn';

export function TagFilter({ tags, selected, onToggle }: { tags: string[]; selected: string[]; onToggle: (tag: string) => void }) {
  return (
    <View className="flex flex-row flex-wrap gap-2">
      {tags.map(tag => (
        <Pressable
          key={tag}
          onPress={() => onToggle(tag)}
          className={cn(
            "px-3 py-1.5 rounded-full transition-colors",
            selected.includes(tag) ? "bg-accentPurple" : "bg-dark800 hover:bg-dark700"
          )}
        >
          <Text className={cn("text-xs font-medium", selected.includes(tag) ? "text-white" : "text-gray-400")}>
            {tag}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}