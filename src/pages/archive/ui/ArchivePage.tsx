import { View, Text } from '@gluestack-ui/themed';

import { MOCK_MINIATURES } from '@/entities/miniature/model/mock';
import { ArchiveTable } from '@/widgets/acrhive-table/ui/ArchiveTable';

export function ArchivePage() {
  return (
    <View className="min-h-screen bg-dark900">
      <View className="max-w-7xl mx-auto p-4 md:p-6">
        <Text className="text-2xl font-bold text-white mb-6">Архив миниатюр</Text>
        <ArchiveTable data={MOCK_MINIATURES} />
      </View>
    </View>
  );
}