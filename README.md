# Electron OpenAI Agent Starter

A modern, desktop-based AI chat application built with Electron and the OpenAI Agents SDK. This project demonstrates how to integrate OpenAI's agentic workflows directly into a desktop app without relying on the hosted ChatKit UI.

## Features

- **Custom Agent Backend:** directly uses `@openai/agents` in the Electron main process.
- **Modern UI:** Clean, responsive chat interface built with HTML/CSS/TypeScript.
- **Secure API Key Management:** User-provided keys are stored securely in memory (process context) and never exposed to the renderer code.
- **Token Usage Tracking:** Real-time display of token consumption per turn and usage accumulation.
- **Cross-Platform:** Builds for macOS (DMG/Zip), Windows, and Linux.

## Prerequisites

- Node.js (v18 or higher)
- OpenAI API Key

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/electron-agent-starter.git
    cd electron-agent-starter
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

### Development

To start the app in development mode:

```bash
npm start
```

### Building for Production

To create a distributable package (e.g., `.dmg` on macOS):

```bash
npm run make
```

The output will be available in the `out/make` directory.

## Configuration

The application authenticates using your OpenAI API Key. On first launch, you will be prompted to enter your key in the settings modal. This key is used for the current session and stored in the main process environment variables.

## Technology Stack

- **Electron:** Desktop framework
- **TypeScript:** Type-safe code
- **Webpack:** Bundling
- **OpenAI Agents SDK:** Agent logic and execution
- **Zod:** Schema validation

## License

MIT
