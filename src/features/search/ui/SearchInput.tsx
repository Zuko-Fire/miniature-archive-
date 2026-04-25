import { useState, KeyboardEvent, useEffect, useRef } from "react"
import { Input, Flex, Tag, Wrap, WrapItem, Box, Text } from "@chakra-ui/react"
import { Search, Hash } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onTagAdd?: (tag: string) => void
  onTagRemove?: (tag: string) => void
  activeTags: string[]
  availableTags?: string[]
  placeholder?: string
}

export function SearchInput({ 
  value, 
  onChange, 
  onTagAdd, 
  onTagRemove,
  activeTags,
  availableTags = [],
  placeholder = "Поиск... (#тег + Enter)" 
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Фильтрация подсказок при вводе #
  useEffect(() => {
    if (inputValue.startsWith("#")) {
      const query = inputValue.slice(1).toLowerCase()
      const filtered = availableTags
        .filter(tag => tag.toLowerCase().includes(query) && !activeTags.includes(tag))
        .slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }, [inputValue, availableTags, activeTags])

  // Закрытие подсказок при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmed = inputValue.trim()
      const tagMatch = trimmed.match(/#\S+/g)
      
      if (tagMatch && onTagAdd) {
        tagMatch.forEach(tag => {
          const cleanTag = tag.replace("#", "")
          if (cleanTag.length > 0) {
            onTagAdd(cleanTag)
          }
        })
        const newText = trimmed.replace(/#\S+/g, "").trim()
        setInputValue(newText)
        onChange(newText)
      } else {
        onChange(trimmed)
      }
      setShowSuggestions(false)
    }
    
    // Закрыть подсказки по Escape
    if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (!newValue.includes("#")) {
      onChange(newValue)
    }
  }

  const handleSuggestionClick = (tag: string) => {
    if (onTagAdd) {
      onTagAdd(tag)
    }
    // Добавляем тег и очищаем ввод
    const newText = inputValue.replace(/#\S*/, "").trim()
    setInputValue(newText)
    onChange(newText)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <Flex direction="column" gap={2} w={{ base: "full", md: "72" }} position="relative">
      {/* Поле ввода */}
      <Flex 
        align="center" 
        bg="card" 
        border="1px" 
        borderColor="border" 
        borderRadius="lg"
        px={3}
        py={2}
        _focusWithin={{ 
          borderColor: "accent.purple", 
          boxShadow: "0 0 0 1px {colors.accent.purple.value}" 
        }}
        transition="all 0.2s"
      >
        <Search color="#9ca3af" size={18} strokeWidth={2} style={{ marginRight: 8, flexShrink: 0 }} />
        <Input
          ref={inputRef}
          variant="unstyled"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.startsWith("#") && setShowSuggestions(suggestions.length > 0)}
          _placeholder={{ color: "text-muted" }}
          bg="transparent"
          px={0}
          fontSize="sm"
        />
      </Flex>

      {/* Подсказки тегов */}
      {showSuggestions && suggestions.length > 0 && (
        <Box
          ref={suggestionsRef}
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          bg="card"
          border="1px"
          borderColor="border"
          borderRadius="lg"
          zIndex={10}
          shadow="lg"
          overflow="hidden"
        >
          {suggestions.map(tag => (
            <Flex
              key={tag}
              align="center"
              gap={2}
              px={3}
              py={2}
              cursor="pointer"
              _hover={{ bg: "whiteAlpha.100" }}
              onClick={() => handleSuggestionClick(tag)}
            >
              <Hash color="#9ca3af" size={14} strokeWidth={2} />
              <Text fontSize="sm" color="text">{tag}</Text>
            </Flex>
          ))}
        </Box>
      )}

    </Flex>
  )
}