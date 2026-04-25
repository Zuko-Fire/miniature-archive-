import { GluestackUIProvider } from '@gluestack-ui/themed';
import { gluestackConfig } from '@/shared/config/gluestack.config';
import { ArchivePage } from '@/pages/archive/ui/ArchivePage';


function App() {
  return (
    <GluestackUIProvider config={gluestackConfig} colorMode="dark">
      <ArchivePage />
    </GluestackUIProvider>
  );
}

export default App;