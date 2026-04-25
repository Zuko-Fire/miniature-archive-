import { Box, Text, Container } from '@chakra-ui/react';

import { MOCK_MINIATURES } from '@/entities/miniature/model/mock';
import { ArchiveTable } from '@/widgets/acrhive-table/ui/ArchiveTable';

export function ArchivePage() {
  return (
    <Box minH="100vh" bg="dark900">
      <Container maxW="7xl" px={{ base: 4, md: 6 }} py={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Архив миниатюр
        </Text>
        <ArchiveTable data={MOCK_MINIATURES} />
      </Container>
    </Box>
  );
}