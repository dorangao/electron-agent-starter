# Agent Guide for Electron Agent Starter

This document provides context and guidelines for AI agents working on this codebase.

## 1. Project Architecture

This is an **Electron** desktop application integrating the **OpenAI Agents SDK**.

### Core Files
- **Main Process (`src/index.ts`)**: 
  - Entry point.
  - initializing `BrowserWindow`.
  - **Agent Logic**: The `assistantAgent` and `conversationHistory` live here.
  - **IPC Handlers**: `agent-message` (runs agent), `save-api-key`, `has-api-key`.
  - **Security**: Stores usage/keys in `process.env` (main process only).
- **Renderer Process (`src/renderer.ts`)**: 
  - Handles UI interactions (chat interface).
  - Uses `window.chat` API exposed via preload.
  - **Styling**: Imports `./index.css`.
- **Preload (`src/preload.ts`)**:
  - Exposes safe API via `contextBridge`.
- **Build Config**:
  - `forge.config.ts`: Electron Forge configuration (Builders, Makers, Plugins).
  - `webpack.rules.ts`: Webpack loaders (TS, CSS). **Note:** Do not add duplicate CSS rules in `webpack.renderer.config.ts`.

## 2. Agent Implementation Details

### OpenAI Agents SDK
- **Instantiation**: Agents are created in `src/index.ts`.
- **State**: `conversationHistory` stores the chat context.
- **Execution**: `run(agent, history)` is called per turn.
- **Token Tracking**: Usage data is extracted from the result object (currently under investigation).

### IPC Communication
- **Pattern**: Renderer `invoke` -> Main `handle` -> return result.
- **Security**: Never verify/store API keys in the renderer.

## 3. Development Workflow

### Commands
- `npm start`: Runs the app in dev mode (hot reload for renderer).
- `npm run make`: Builds production distributables (DMG, Zip).

### Common Pitfalls
- **Webpack Config**: `css-loader` is configured in `webpack.rules.ts`. Avoid adding it again in `webpack.renderer.config.ts`.
- **Type Safety**: Strictly define IPC return types in `renderer.ts`.

## 4. Current Status
- **Basic Chat**: Functional.
- **Packaging**: DMG building is enabled.
- **Known Issues**: Token usage display relies on correct property access of the agent result object (debugging in progress).
