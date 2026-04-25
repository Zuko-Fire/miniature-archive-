import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Твоя цветовая схема из скриншота
        dark900: { value: '#1e1e2e' },    // Основной фон (темно-синий/серый)
        dark800: { value: '#252537' },    // Фон карточек
        dark700: { value: '#2d2d44' },    // Границы/ховеры
        dark600: { value: '#3a3a55' },    // Дополнительные элементы
        
        // Акцентный фиолетовый (как на скриншоте)
        accent: {
          purple: { value: '#7c3aed' },      // Основной фиолетовый
          purpleHover: { value: '#6d28d9' }, // При наведении
          purpleLight: { value: '#8b5cf6' }, // Светлый оттенок
          purpleDark: { value: '#5b21b6' },  // Тёмный оттенок
        },
        
        // Текст
        text: {
          primary: { value: '#ffffff' },
          secondary: { value: '#a1a1aa' },
          muted: { value: '#71717a' },
        },
        
        // Семантика
        bg: { value: '#1e1e2e' },
        card: { value: '#252537' },
        border: { value: '#2d2d44' },
        
        // Стандартные серые
        gray: {
          50: { value: '#fafafa' },
          100: { value: '#f4f4f5' },
          200: { value: '#e4e4e7' },
          300: { value: '#d4d4d8' },
          400: { value: '#a1a1aa' },
          500: { value: '#71717a' },
          600: { value: '#52525b' },
          700: { value: '#3f3f46' },
          800: { value: '#27272a' },
          900: { value: '#18181b' },
        },
      },
      fonts: {
        heading: { value: `'Inter', system-ui, -apple-system, sans-serif` },
        body: { value: `'Inter', system-ui, -apple-system, sans-serif` },
      },
      spacing: {
        '4.5': { value: '1.125rem' },
        '18': { value: '4.5rem' },
      },
      radii: {
        sm: { value: '0.375rem' },
        md: { value: '0.5rem' },
        lg: { value: '0.75rem' },
        xl: { value: '1rem' },
        '2xl': { value: '1.25rem' },
        full: { value: '9999px' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          default: { value: '{colors.dark900.value}' },
        },
        card: {
          default: { value: '{colors.dark800.value}' },
        },
        border: {
          default: { value: '{colors.dark700.value}' },
        },
        text: {
          default: { value: '{colors.text.primary.value}' },
        },
        'text-muted': {
          default: { value: '{colors.text.muted.value}' },
        },
        'text-secondary': {
          default: { value: '{colors.text.secondary.value}' },
        },
      },
    },
    components: {
      Button: {
        baseStyle: {
          borderRadius: 'lg',
          fontWeight: 'medium',
          transitionProperty: 'common',
          transitionDuration: 'normal',
        },
        variants: {
          solid: {
            bg: 'accent.purple',
            color: 'white',
            _hover: { bg: 'accent.purpleHover' },
            _active: { bg: 'accent.purpleDark' },
          },
          ghost: {
            color: 'text-secondary',
            _hover: { bg: 'whiteAlpha.100', color: 'text' },
          },
          outline: {
            borderColor: 'border',
            color: 'text',
            _hover: { bg: 'whiteAlpha.50', borderColor: 'accent.purple' },
          },
        },
      },
      Input: {
        baseStyle: {
          field: {
            bg: 'card',
            borderColor: 'border',
            color: 'text',
            _placeholder: { color: 'text-muted' },
            _hover: { borderColor: 'dark600' },
            _focus: { 
              borderColor: 'accent.purple', 
              boxShadow: '0 0 0 1px {colors.accent.purple.value}',
            },
          },
        },
      },
      Tag: {
        baseStyle: {
          container: {
            borderRadius: 'full',
            fontWeight: 'medium',
          },
        },
        variants: {
          subtle: {
            container: {
              bg: 'accent.purple',
              color: 'white',
            },
          },
          outline: {
            container: {
              borderColor: 'accent.purple',
              color: 'accent.purpleLight',
            },
          },
        },
      },
      Card: {
        baseStyle: {
          container: {
            bg: 'card',
            borderRadius: 'xl',
            borderWidth: '1px',
            borderColor: 'border',
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
export type AppSystem = typeof system