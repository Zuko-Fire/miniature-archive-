import { ChakraProvider } from "@chakra-ui/react"

import { ArchivePage } from "@/pages/archive/ui/ArchivePage"
import { system } from "@/shared/config/chakra-theme"

function App() {
  return (
    <ChakraProvider value={system}>
      <ArchivePage />
    </ChakraProvider>
  )
}

export default App