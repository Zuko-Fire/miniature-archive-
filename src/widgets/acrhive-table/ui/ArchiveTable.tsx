import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { View, Text, Pressable } from '@gluestack-ui/themed';
import { Settings, ArrowUpDown } from 'lucide-react';
import { Miniature } from '@/entities/miniature/model/types';
import { SearchInput } from '@/features/search/ui/SearchInput';
import { TagFilter } from '@/features/tag-filter/ui/TagFilter';
import { cn } from '@/shared/lib/cn';

const columnHelper = createColumnHelper<Miniature>();

export function ArchiveTable({ data }: { data: Miniature[] }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => Array.from(new Set(data.flatMap(m => m.tags))), [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(globalFilter.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.every(t => item.tags.includes(t));
      return matchesSearch && matchesTags;
    });
  }, [data, globalFilter, selectedTags]);

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'thumbnail',
      cell: ({ row }) => (
        <View className="relative w-32 h-32 rounded-lg overflow-hidden bg-black shrink-0">
          <img src={row.original.imagePath} alt={row.original.name} className="w-full h-full object-cover opacity-80" />
          <View className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded">
            <Text className="text-xs font-bold text-white">+4</Text>
          </View>
        </View>
      ),
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <Pressable onPress={() => column.toggleSorting()} className="flex flex-row items-center gap-2">
          <Text className="text-sm font-medium text-gray-400">Имя</Text>
          <ArrowUpDown size={14} className="text-gray-400" />
        </Pressable>
      ),
      cell: ({ getValue }) => <Text className="text-lg font-bold text-white">{getValue()}</Text>,
    }),
    columnHelper.accessor('tags', {
      header: () => <Text className="text-sm font-medium text-gray-400">Теги</Text>,
      cell: ({ getValue }) => (
        <View className="flex flex-row flex-wrap gap-2">
          {getValue().map(tag => (
            <View key={tag} className="bg-accentPurple/20 border border-accentPurple/30 px-2 py-0.5 rounded-md">
              <Text className="text-xs text-accentPurple">{tag}</Text>
            </View>
          ))}
        </View>
      ),
    }),
    columnHelper.display({
      id: 'info',
      header: () => <Text className="text-sm font-medium text-gray-400">Инфо</Text>,
      cell: ({ row }) => (
        <View className="grid grid-cols-2 gap-x-6 gap-y-1">
          <InfoRow label="Добавлена" value={row.original.dateAdded} />
          <InfoRow label="Редактирована" value={row.original.dateEdited} />
          <InfoRow label="Вес файла" value={row.original.fileSize} />
          <InfoRow label="Сжатый" value={row.original.compressedSize} />
          <InfoRow label="Стоимость" value={row.original.cost} />
          <InfoRow label="Расход смолы" value={row.original.resinConsumption} />
        </View>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: () => (
        <Pressable className="p-2 rounded-lg hover:bg-dark700 transition-colors">
          <Settings size={20} className="text-gray-400" />
        </Pressable>
      ),
    }),
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <View className="space-y-6 p-4">
      {/* Панель управления */}
      <View className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <View className="flex flex-col gap-2 w-full md:w-auto">
          <Text className="text-sm font-medium text-gray-400 ml-1">Фильтр по тегам</Text>
          <TagFilter
            tags={allTags}
            selected={selectedTags}
            onToggle={(tag) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
          />
        </View>
        <SearchInput value={globalFilter} onChange={setGlobalFilter} />
      </View>

      {/* Список карточек (TanStack Table) */}
      <View className="flex flex-col gap-4">
        {table.getRowModel().rows.map(row => (
          <View key={row.id} className="bg-dark800 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center border border-dark700 hover:border-gray-500 transition-colors">
            {row.getVisibleCells().map(cell => (
              <View key={cell.id} className={cn(
                "w-full",
                cell.column.id === 'thumbnail' && "md:w-40 shrink-0",
                cell.column.id === 'name' && "flex-1 items-center md:items-start",
                cell.column.id === 'info' && "w-full md:w-auto",
                cell.column.id === 'actions' && "md:w-12 items-end"
              )}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </View>
            ))}
          </View>
        ))}
        
        {table.getRowModel().rows.length === 0 && (
          <View className="items-center py-10">
            <Text className="text-gray-500">Ничего не найдено</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <Text className="text-gray-400 text-sm">{label}</Text>
      <Text className="text-white text-sm text-right">{value}</Text>
    </>
  );
}