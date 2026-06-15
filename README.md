# mcpcraft-sdk

[![npm version](https://img.shields.io/npm/v/mcpcraft-sdk.svg?style=flat-square)](https://www.npmjs.com/package/mcpcraft-sdk)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

A lightweight TypeScript SDK for building Model Context Protocol (MCP) servers — zero boilerplate, full type safety, automatic schema generation.

---

## What is MCP?

The **Model Context Protocol (MCP)** is an open standard that lets AI apps (Claude, Cursor, VS Code Copilot) call functions and read data from your server — the same way HTTP lets browsers talk to APIs. MCP is to AI what HTTP is to the web.

## Why mcpcraft-sdk?

The official `@modelcontextprotocol/sdk` requires ~100 lines of boilerplate per server. mcpcraft-sdk distills that down to ~10 lines — with automatic schema generation, type inference, and input validation.

```typescript
import { createServer, tool } from "mcpcraft-sdk"

const server = createServer({ name: "hello-world" })

server.add(tool({
  name: "greet",
  description: "Greets a user by name",
  input: {
    name: { type: "string", description: "The user's name" }
  },
  run: async ({ name }) => {
    return { message: `Hello, ${name}!` }
  }
}))

server.start()
```

## Install

```bash
npm install mcpcraft-sdk zod
```

```bash
pnpm add mcpcraft-sdk zod
```

```bash
yarn add mcpcraft-sdk zod
```

---

## Quick Start

### 1. Create your server

```typescript
import { createServer, tool } from "mcpcraft-sdk"

const server = createServer({ name: "my-first-server" })

server.add(tool({
  name: "get_weather",
  description: "Get the current weather for a location",
  input: {
    location: { type: "string", description: "City name" }
  },
  run: async ({ location }) => {
    return { temp: 22, condition: "Sunny", city: location }
  }
}))

server.start()
```

### 2. Run it

```bash
npx ts-node server.ts
```

### 3. Connect it

Add to your MCP client config:

```json
{
  "mcpServers": {
    "my-first-server": {
      "command": "node",
      "args": ["dist/server.js"]
    }
  }
}
```

---

## Architecture

```
AI Agent (Claude, Cursor)
  │
  ▼  JSON-RPC over stdio/SSE
MCP Client
  │
  ▼
Your MCP Server (mcpcraft-sdk)
  │
  ├── Tools (executable functions)
  └── Resources (read-only data)
```

---

## API Reference

### `createServer(options)`

Creates a new MCP server instance with automatic transport setup.

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | `string` | Yes | — | Server name (shown to MCP clients) |
| `version` | `string` | No | `"0.1.0"` | SemVer version |
| `description` | `string` | No | — | Human-readable description |

**Methods:**
- `server.add(item)` — Register a tool or resource (chainable)
- `server.start()` — Launch the server on stdio transport
- `server.server` — Access the underlying raw SDK `Server` instance

### `tool(options)`

Defines an executable function that LLMs can invoke.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Alphanumeric identifier |
| `description` | `string` | Yes | Explains the tool to the LLM |
| `input` | `InputSchema` | No | Parameter definitions |
| `run` | `(args) => any` | Yes | Execution handler (typed args) |

**Input Schema:**
```typescript
input: {
  query:   { type: "string",  description: "Search query" },
  limit:   { type: "number",  description: "Max results", required: false },
  verbose: { type: "boolean", description: "Detailed output", required: false }
}
```

### `resource(options)`

Defines a read-only data source identified by URI.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Resource identifier |
| `description` | `string` | Yes | Describes the data to the LLM |
| `uri` | `string` | Yes | URI or URI template (`users://{id}/profile`) |
| `mimeType` | `string` | No | MIME type (default: `application/json`) |
| `fetch` | `(params) => any` | Yes | Returns the resource data |

---

## Documentation

Full documentation is available at **[mcpcraft.org](https://mcpcraft.org)**:

- [Getting Started](https://mcpcraft.org/docs/installation)
- [Quick Start](https://mcpcraft.org/docs/quick-start)
- [Deployment](https://mcpcraft.org/docs/deployment)
- [API Reference](https://mcpcraft.org/docs/api/create-server)
- [Examples](https://mcpcraft.org/docs/examples/basic-server)

---

## License

MIT
