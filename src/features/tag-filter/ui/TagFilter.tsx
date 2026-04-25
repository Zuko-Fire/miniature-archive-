import { Badge, Flex } from '@chakra-ui/react';

interface TagFilterProps {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}

export function TagFilter({ tags, selected, onToggle }: TagFilterProps) {
  return (
    <Flex wrap="wrap" gap={2}>
      {tags.map(tag => (
        <Badge
          key={tag}
          cursor="pointer"
          variant={selected.includes(tag) ? 'subtle' : 'outline'}
          _hover={{ 
            bg: selected.includes(tag) ? 'accent.purpleHover' : 'whiteAlpha.100',
            transform: 'scale(1.02)',
            transition: 'all 0.2s'
          }}
          onClick={() => onToggle(tag)}
          fontSize="xs"
        >
          {tag}
        </Badge>
      ))}
    </Flex>
  );
}