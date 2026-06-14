import { Server } from "@modelcontextprotocol/sdk/server/index.js";

export interface InputProperty {
  type: "string" | "number" | "boolean";
  description?: string;
  required?: boolean;
}

export type InputSchema = Record<string, InputProperty>;

export type InferInputType<T extends InputSchema | undefined> = T extends InputSchema
  ? {
      [K in keyof T]: T[K]["required"] extends false
        ? (T[K]["type"] extends "string" ? string : T[K]["type"] extends "number" ? number : boolean) | undefined
        : (T[K]["type"] extends "string" ? string : T[K]["type"] extends "number" ? number : boolean)
    }
  : Record<string, never>;

export interface ToolOptions<T extends InputSchema = InputSchema> {
  name: string;
  description: string;
  input?: T;
  run: (args: InferInputType<T>) => Promise<any> | any;
}

export interface Tool<T extends InputSchema = InputSchema> extends ToolOptions<T> {
  type: "tool";
}

export interface ResourceOptions {
  name: string;
  description: string;
  uri: string;
  mimeType?: string;
  fetch: (params: Record<string, string>) => Promise<any> | any;
}

export interface Resource extends ResourceOptions {
  type: "resource";
}

export interface ServerOptions {
  name: string;
  version?: string;
  description?: string;
}

export interface McpServerInstance {
  add(item: Tool<any> | Resource): McpServerInstance;
  start(): Promise<void>;
  server: Server;
}
