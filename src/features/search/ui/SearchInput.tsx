import { Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import { Search } from 'lucide-react';

export function SearchInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <Input className="w-full md:w-72 bg-dark800 border-dark700 focus:border-accentPurple">
      <InputSlot className="pl-3">
        <InputIcon as={Search} className="text-gray-400" />
      </InputSlot>
      <InputField
        className="text-white placeholder:text-gray-400"
        placeholder="Поиск по названию..."
        value={value}
        onChangeText={onChange}
      />
    </Input>
  );
}