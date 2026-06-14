# mcpcraft

[![npm version](https://img.shields.io/npm/v/mcpcraft.svg?style=flat-square)](https://www.npmjs.com/package/mcpcraft)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

A lightweight and elegant SDK for building Model Context Protocol (MCP) servers fast.

---

## Why mcpcraft?

The official MCP SDK is powerful but requires significant JSON-RPC boilerplate and manual schema definitions. `mcpcraft` wraps it to provide a streamlined, zero-config API with automatic TypeScript type inference and Zod runtime schema validation.

## Install

```bash
npm install mcpcraft zod
```

## Quick Start

```typescript
import { createServer, tool } from "mcpcraft";

const server = createServer({ name: "my-mcp-server" });

server.add(tool({
  name: "get_weather",
  description: "Get the current weather for a location",
  input: {
    location: { type: "string", description: "City name" }
  },
  run: async ({ location }) => {
    return { temp: 22, condition: "Sunny", city: location };
  }
}));

server.start();
```

---

## API Reference

### `createServer(options)`
Creates a new server instance.

- **`options`**:
  - `name: string` (required) - Name of the server.
  - `version?: string` (optional) - Version of the server (default: `0.1.0`).
  - `description?: string` (optional) - Description of the server.

**Returns:** A server instance with:
- `add(item: Tool | Resource)`: Register a tool or a resource (chainable).
- `start()`: Starts the server listening on the standard input/output (stdio) transport.
- `server`: Access the underlying official `Server` instance if low-level control is needed.

---

### `tool(options)`
Defines an MCP tool with schema validation.

- **`options`**:
  - `name: string` - The name of the tool (alphanumeric and underscores).
  - `description: string` - A description explaining what the tool does (used by the LLM).
  - `input?: Record<string, { type: "string" | "number" | "boolean"; description?: string; required?: boolean }>` - Parameter schemas.
  - `run: (args) => Promise<any> | any` - The execution logic. The `args` parameter is fully typed and inferred automatically based on `input`.

---

### `resource(options)`
Defines an MCP resource or resource template.

- **`options`**:
  - `name: string` - The name of the resource.
  - `description: string` - Description of the resource.
  - `uri: string` - The URI (e.g. `info://system`) or URI Template (e.g. `users://{userId}/profile`).
  - `mimeType?: string` - The MIME type (e.g., `application/json`, `text/plain`).
  - `fetch: (params) => Promise<any> | any` - Handler that returns the resource content. If the URI is a template, `params` is populated with parsed dynamic variables.

---

## Built on top of the official MCP SDK

`mcpcraft` is designed to play nicely with the official ecosystem. It runs directly on top of `@modelcontextprotocol/sdk` and uses the standard stdio transport, meaning it works out-of-the-box with Cursor, Claude Desktop, and all other MCP hosts.

## License

MIT

