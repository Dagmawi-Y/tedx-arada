---
name: reacticx
description: Skill for discovering, adding, and implementing Reacticx UI components for React Native.
---

# Reacticx UI Skill

Reacticx is a premium UI component library for React Native (Expo) that provides motion-driven, animated components. Components are added directly to the project as source files, allowing for total control and deep customization.

## Capabilities

### 1. Discover Components
To see the full library of 100+ components, run:
```bash
npx reacticx list
```
Components are categorized into:
- **ai**: AI-specific UI like thinking states and input bars.
- **atoms**: Basic building blocks (horizontal/vertical views, pressables).
- **base**: Essential UI elements (ActionCard, Avatar, Button, Glow, Ripple).
- **micro-interactions**: Animated switches, sliders, and buttons.
- **molecules**: Complex UI patterns (Carousel, Accordion, List, Dynamic Island).
- **organisms**: Interactive sections (Infinite Menu, Segmented Control, Liquid Metal).
- **templates**: High-level screen patterns (Chat, Sign-up, Property Detail).

### 2. Add Components to Project
When you need a component, add it to the project using the CLI. Always specify a clear destination directory to maintain organization.

**Standard Pattern:**
```bash
npx reacticx add <component-name> --dir components/ui/<category>/<component-name>
```

**Example:**
To add the 'glow' effect:
```bash
npx reacticx add glow --dir components/ui/base/glow
```

### 3. Usage & Implementation
Once added, the component can be imported and utilized like any other local component.

**Typical Import:**
```tsx
import { Glow } from "@/components/ui/base/glow";

export default function MyComponent() {
  return (
    <Glow size={4} color="#8b5cf6">
      <View style={styles.card}>
        <Text>Premium Animated Content</Text>
      </View>
    </Glow>
  );
}
```

## Implementation Guidelines

- **Search First**: If a user asks for a premium UI effect, check `npx reacticx list` before building from scratch.
- **Direct Customization**: Since you own the source code after adding it, feel free to modify the internal Reanimated/Skia logic to perfectly fit the project's requirements.
- **Peer Dependencies**: Reacticx components rely on:
  - `react-native-reanimated`
  - `react-native-gesture-handler`
  - `@shopify/react-native-skia` (for advanced effects)
  - `expo-haptics`
  - `expo-blur`
  Ensure these are present in `package.json`. In this project, they are mostly pre-configured.
- **File Structure**: By default, Reacticx might add files to the root of the `--dir` path. Use the sub-folder pattern (e.g., `--dir components/ui/base/button`) to keep the components isolated.

## Examples

### Adding a Morphing Tabbar
```bash
npx reacticx add morphing-tabbar --dir components/ui/molecules/morphing-tabbar
```

### Adding a Liquid Metal Switch
```bash
npx reacticx add liquid-metal --dir components/ui/organisms/liquid-metal
```

## Project Specific Examples
Refer to the following files in this project for working implementations:
- [demo.tsx](file:///Users/dagmawiyohannes/D/Projects/tedx-arada/app/app/demo.tsx): A screen demonstrating `Glow`, `Button`, and `TouchableRipple`.
- [index.tsx](file:///Users/dagmawiyohannes/D/Projects/tedx-arada/app/app/index.tsx): Shows how to link to the demo screen.
