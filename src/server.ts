import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { Tool, Resource, ServerOptions, McpServerInstance } from "./types";

/**
 * Creates and initializes an MCP Server instance.
 * 
 * @param options Configurations for the server (name, version, description).
 * @returns An McpServerInstance with `add` and `start` methods.
 */
export function createServer(options: ServerOptions): McpServerInstance {
  const name = options.name;
  const version = options.version || "0.1.0";

  const mcpServer = new Server(
    { name, version },
    {
      capabilities: {
        tools: {},
        resources: {}
      }
    }
  );

  const tools = new Map<string, Tool<any>>();
  const resources = new Map<string, Resource>();

  const add = (item: Tool<any> | Resource): McpServerInstance => {
    if (item && item.type === "tool") {
      tools.set(item.name, item);
    } else if (item && item.type === "resource") {
      resources.set(item.name, item);
    } else {
      throw new Error(`Invalid item added to server: must be a tool() or resource()`);
    }
    return serverInstance;
  };

  // 1. List tools handler
  mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
    const list = Array.from(tools.values()).map(t => {
      const properties: Record<string, any> = {};
      const required: string[] = [];

      if (t.input) {
        for (const [key, propVal] of Object.entries(t.input)) {
          const prop = propVal as any;
          properties[key] = {
            type: prop.type,
            ...(prop.description ? { description: prop.description } : {})
          };
          if (prop.required !== false) {
            required.push(key);
          }
        }
      }

      return {
        name: t.name,
        description: t.description,
        inputSchema: {
          type: "object",
          properties,
          ...(required.length > 0 ? { required } : {})
        }
      };
    });

    return { tools: list };
  });

  // 2. Call tool handler
  mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name: toolName, arguments: args } = request.params;
    const tool = tools.get(toolName);
    
    if (!tool) {
      throw new Error(`Tool not found: ${toolName}`);
    }

    let validatedArgs = args || {};

    // Validate using Zod if schema is defined
    if (tool.input) {
      const shape: Record<string, z.ZodTypeAny> = {};
      for (const [key, propVal] of Object.entries(tool.input)) {
        const prop = propVal as any;
        let schema: z.ZodTypeAny;
        if (prop.type === "string") {
          schema = z.string();
        } else if (prop.type === "number") {
          schema = z.number();
        } else if (prop.type === "boolean") {
          schema = z.boolean();
        } else {
          schema = z.any();
        }

        if (prop.description) {
          schema = schema.describe(prop.description);
        }
        if (prop.required === false) {
          schema = schema.optional();
        }
        shape[key] = schema;
      }

      const zodSchema = z.object(shape);
      const parseResult = zodSchema.safeParse(args);
      if (!parseResult.success) {
        const errMsg = `Validation failed: ${parseResult.error.issues
          .map(e => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`;
        console.error(`[mcpcraft] Tool "${toolName}" validation error:`, errMsg);
        return {
          content: [{ type: "text", text: errMsg }],
          isError: true
        };
      }
      validatedArgs = parseResult.data;
    }

    try {
      const result = await tool.run(validatedArgs as any);

      // Return raw content if it fits the schema
      if (result && typeof result === "object" && "content" in result && Array.isArray(result.content)) {
        return result;
      }
      // Return text directly if string
      if (typeof result === "string") {
        return {
          content: [{ type: "text", text: result }]
        };
      }
      // Stringify object returns
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (err: any) {
      console.error(`[mcpcraft] Tool "${toolName}" execution error:`, err);
      return {
        content: [{ type: "text", text: `Error: ${err.message || String(err)}` }],
        isError: true
      };
    }
  });

  // 3. List resources handler (static only)
  mcpServer.setRequestHandler(ListResourcesRequestSchema, async () => {
    const list = Array.from(resources.values())
      .filter(r => !r.uri.includes("{"))
      .map(r => ({
        uri: r.uri,
        name: r.name,
        description: r.description,
        mimeType: r.mimeType
      }));
    return { resources: list };
  });

  // 4. List resource templates handler (dynamic parameterized only)
  mcpServer.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
    const list = Array.from(resources.values())
      .filter(r => r.uri.includes("{"))
      .map(r => ({
        uriTemplate: r.uri,
        name: r.name,
        description: r.description,
        mimeType: r.mimeType
      }));
    return { resourceTemplates: list };
  });

  // 5. Read resource handler
  mcpServer.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    for (const r of resources.values()) {
      const paramNames: string[] = [];
      const regexString = r.uri.replace(/\{([^}]+)\}/g, (_, pName) => {
        paramNames.push(pName);
        return "([^/]+)";
      });
      const regex = new RegExp(`^${regexString}$`);
      const match = uri.match(regex);

      if (match) {
        const params: Record<string, string> = {};
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });

        try {
          const result = await r.fetch(params);

          if (result && typeof result === "object" && "contents" in result && Array.isArray(result.contents)) {
            return result;
          }
          if (typeof result === "string") {
            return {
              contents: [{
                uri,
                mimeType: r.mimeType || "text/plain",
                text: result
              }]
            };
          }
          return {
            contents: [{
              uri,
              mimeType: r.mimeType || "application/json",
              text: JSON.stringify(result, null, 2)
            }]
          };
        } catch (err: any) {
          console.error(`[mcpcraft] Resource "${uri}" read error:`, err);
          throw new Error(`Failed to read resource ${uri}: ${err.message || String(err)}`);
        }
      }
    }

    throw new Error(`Resource not found: ${uri}`);
  });

  const start = async () => {
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
    console.error(`[mcpcraft] MCP server "${name}" running on stdio transport`);
  };

  const serverInstance: McpServerInstance = {
    add,
    start,
    server: mcpServer
  };

  return serverInstance;
}

