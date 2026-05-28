# Video Capture App

A React + TypeScript application that captures a photo from the user's camera after a countdown using the MediaDevices API (`getUserMedia`).

## Demo

Demo video:
[Google Drive Demo Link](https://drive.google.com/file/d/1amy2kLPjOPC2tFPQgZBBb5wX7WprN-3P/view)

---

## Overview

The application provides:

- live camera preview
- automatic photo capture after a 5-second countdown
- canvas-based image snapshot generation
- camera permission and error handling
- responsive layout
- unit and integration testing
- GitHub Actions CI workflow

---

## Tech Stack

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- Plain CSS

---

## Project Structure

```text
src/
├── app/
├── components/
│   └── ui/
├── features/
│   └── video-capture/
│       ├── components/
│       ├── hooks/
│       ├── utils/
│       └── tests/
├── test/
└── styles/
```

---

## Browser Requirements

This application uses:

```ts
navigator.mediaDevices.getUserMedia()
```

Camera access requires a secure context:

- HTTPS
- localhost

If camera access is blocked:

1. Open browser/site permissions
2. Allow camera access
3. Retry the action or refresh the page

---

## Continuous Integration

GitHub Actions workflow automatically runs:

- linting
- tests
- production build

on every push and pull request.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3003
```

### Run Tests

Run all tests once:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Run Linter

```bash
npm run lint
```

### Build Project

```bash
npm run build
```
