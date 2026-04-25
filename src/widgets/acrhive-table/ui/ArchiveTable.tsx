import { useMemo, useState } from "react"
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table"
import { 
  Box, Text, Flex, IconButton, Image, Tag as ChakraTag,
  VStack, HStack, Container, Wrap, WrapItem,
  Tag
} from "@chakra-ui/react"
import { Settings, ArrowUpDown, Hash } from "lucide-react"
import { Miniature } from "@/entities/miniature/model/types"
import { SearchInput } from "@/features/search/ui/SearchInput"

const columnHelper = createColumnHelper<Miniature>()

export function ArchiveTable({ data }: { data?: Miniature[] }) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dynamicTags, setDynamicTags] = useState<string[]>([])

  const safeData = data || []

  const filterTags = dynamicTags

  const filteredData = useMemo(() => {
    return safeData.filter(item => {
      const searchWithoutTags = globalFilter.replace(/#\S+/g, "").trim().toLowerCase()
      const matchesSearch = searchWithoutTags === "" || 
        item.name.toLowerCase().includes(searchWithoutTags)

      const itemTags = item.tags.map(t => t.replace(/^#/, ""))
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(t => itemTags.includes(t))

      return matchesSearch && matchesTags
    })
  }, [safeData, globalFilter, selectedTags])

  const handleTagAdd = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag])
    }
    if (!dynamicTags.includes(tag)) {
      setDynamicTags(prev => [...prev, tag])
    }
  }

  const handleTagRemove = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
    setDynamicTags(prev => prev.filter(t => t !== tag))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }

  const columns = useMemo(() => [
    columnHelper.display({
      id: "thumbnail",
      cell: ({ row }) => (
        <Box 
          position="relative" 
          w="128px" 
          h="128px" 
          rounded="lg" 
          overflow="hidden" 
          bg="black"
          flexShrink={0}
          _hover={{ shadow: "2xl" }}
          transition="all 0.2s"
          borderWidth="1px"
          borderColor="dark700"
        >
          <Image 
            src={row.original.imagePath} 
            alt={row.original.name} 
            w="full" 
            h="full" 
            objectFit="cover"
            opacity={0.9}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
          />
          <Box 
            position="absolute" 
            top={2} 
            right={2} 
            bg="blackAlpha.800" 
            px={2} 
            py={1} 
            rounded="md"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
          >
            <Text fontSize="xs" fontWeight="bold" color="white">+4</Text>
          </Box>
        </Box>
      ),
    }),

    columnHelper.accessor("name", {
      header: ({ column }) => (
        <Flex align="center" gap={1} cursor="pointer" onClick={() => column.toggleSorting()}>
          <Text fontSize="sm" fontWeight="medium" color="text-muted">Имя</Text>
          <ArrowUpDown size={14} color="#71717a" strokeWidth={2} />
        </Flex>
      ),
      cell: ({ getValue }) => (
        <Text fontSize="lg" fontWeight="semibold" color="text" textAlign={{ base: "center", md: "left" }}>
          {getValue()}
        </Text>
      ),
    }),

    columnHelper.accessor("tags", {
      header: () => <Text fontSize="sm" fontWeight="medium" color="text-muted">Теги</Text>,
      cell: ({ getValue }) => (
        <Wrap gap={1.5} justify={{ base: "center", md: "flex-start" }}>
          {getValue().map(tag => (
            <WrapItem key={tag}>
              <ChakraTag.Root 
                variant="subtle" 
                colorScheme="purple"
                size="sm"
                borderRadius="full"
              >
                <ChakraTag.StartElement>
                  <Hash color="currentColor" size={12} strokeWidth={2} />
                </ChakraTag.StartElement>
                <ChakraTag.Label fontSize="xs">{tag}</ChakraTag.Label>
              </ChakraTag.Root>
            </WrapItem>
          ))}
        </Wrap>
      ),
    }),

    columnHelper.display({
      id: "info",
      header: () => <Text fontSize="sm" fontWeight="medium" color="text-muted">Инфо</Text>,
      cell: ({ row }) => (
        <VStack align="stretch" gap={1} fontSize="sm">
          <InfoRow label="Добавлена" value={row.original.dateAdded} />
          <InfoRow label="Редактирована" value={row.original.dateEdited} />
          <InfoRow label="Вес файла" value={row.original.fileSize} />
          <InfoRow label="Сжатый" value={row.original.compressedSize} />
          <InfoRow label="Стоимость" value={row.original.cost} />
          <InfoRow label="Расход смолы" value={row.original.resinConsumption} />
        </VStack>
      ),
    }),

    columnHelper.display({
      id: "actions",
      cell: () => (
        <IconButton
          aria-label="Settings"
          variant="ghost"
          color="text-muted"
          _hover={{ color: "text", bg: "whiteAlpha.100" }}
          size="sm"
          borderRadius="lg"
        >
          <Settings size={20} strokeWidth={2} />
        </IconButton>
      ),
    }),
  ], [])

  const table = useReactTable({
     data:filteredData || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <Container maxW="7xl" px={{ base: 4, md: 6 }} py={6}>
      <Box>
        <Flex 
        direction={{base: 'row'}}
        justify="end"
        
        >
         <SearchInput 
            value={globalFilter} 
            onChange={setGlobalFilter}
            onTagAdd={handleTagAdd}
            onTagRemove={handleTagRemove}
            activeTags={selectedTags}
            placeholder="Поиск..."
          />
          </Flex>
          </Box>
      <Box className="space-y-6">
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align={{ base: "stretch", md: "center" }} 
          gap={4}
          mb={6}
        >
              {selectedTags.length > 0 && (
        <Wrap gap={2} mt={1}>
          {selectedTags.map(tag => (
            <WrapItem key={tag}>
              <Tag.Root 
                size="sm" 
                variant="subtle" 
                colorScheme="purple"
                borderRadius="full"
                animation="fadeIn 0.2s ease-out"
                sx={{
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "scale(0.9)" },
                    to: { opacity: 1, transform: "scale(1)" }
                  }
                }}
              >
                <Tag.StartElement>
                  <Hash color="currentColor" size={12} strokeWidth={2} />
                </Tag.StartElement>
                <Tag.Label fontSize="xs">{tag}</Tag.Label>
                {handleTagRemove && (
                  <Tag.EndElement>
                    <Tag.CloseTrigger 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTagRemove(tag)
                      }} 
                    />
                  </Tag.EndElement>
                )}
              </Tag.Root>
            </WrapItem>
          ))}
        </Wrap>
      )}
          
        </Flex>

        <Flex direction="column" gap={4}>
          {table.getRowModel().rows.map(row => (
            <Flex
              key={row.id}
              bg="card"
              rounded="xl"
              p={4}
              direction={{ base: "column", md: "row" }}
              gap={6}
              align="center"
              border="1px"
              borderColor="border"
              _hover={{ borderColor: "accent.purple", shadow: "lg" }}
              transition="all 0.2s"
            >
              {row.getVisibleCells().map(cell => (
                <Box 
                  key={cell.id} 
                  w="full"
                  {...(cell.column.id === "thumbnail" && { w: { base: "full", md: "128px" }, flexShrink: 0 })}
                  {...(cell.column.id === "name" && { flex: 1, textAlign: { base: "center", md: "left" } })}
                  {...(cell.column.id === "info" && { w: { base: "full", md: "auto" } })}
                  {...(cell.column.id === "actions" && { w: { base: "full", md: "auto" }, textAlign: "right" })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Flex>
          ))}
          
          {table.getRowModel().rows.length === 0 && (
            <Flex justify="center" py={10}>
              <Text color="text-muted">Ничего не найдено</Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </Container>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <HStack justify="space-between">
      <Text color="text-muted" fontSize="sm">{label}</Text>
      <Text color="text-secondary" fontSize="sm" fontWeight="medium">{value}</Text>
    </HStack>
  )
}