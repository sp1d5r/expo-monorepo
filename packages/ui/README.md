# @acme/ui

A comprehensive collection of reusable React Native components styled with Tamagui. This package serves as a shared UI component library that can be used across different projects in the monorepo or as a standalone package.

## Features

- 🎨 Built with [Tamagui](https://tamagui.dev/)
- 📱 Cross-platform support (iOS, Android, Web)
- 🔧 Fully customizable components
- 🎯 TypeScript support
- ♿️ Accessibility-focused
- 🔄 Regular updates with new components

## Installation

```bash
# If using the monorepo
pnpm add @acme/ui

# If using as a standalone package
npm install @acme/ui
# or
yarn add @acme/ui
# or
pnpm add @acme/ui
```

## Usage

```tsx
import { Button } from '@acme/ui'

export default function MyComponent() {
  return (
    <Button 
      variant="primary" 
      onPress={() => console.log('Pressed!')}
    >
      Click me
    </Button>
  )
}
```

## Available Components

Currently, this library includes the following components:

- `Button` - Customizable button component with various styles and states
- _(More components will be added as the library grows)_

## Contributing

1. Create a new component in `src/[component-name]`
2. Add tests in `src/__tests__`
3. Export the component in `src/index.ts`
4. Update documentation
5. Submit a PR

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test

# Watch mode for development
pnpm dev
```

## Configuration

This package uses Tamagui for styling. You can customize the theme by modifying `src/tamagui.config.ts`.

