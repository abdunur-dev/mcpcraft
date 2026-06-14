import { Tool, ToolOptions, InputSchema } from "./types";

/**
 * Creates an MCP tool definition.
 * 
 * @param options Tool options including name, description, input schema, and execution logic.
 * @returns A Tool definition object.
 */
export function tool<T extends InputSchema>(options: ToolOptions<T>): Tool<T> {
  return {
    ...options,
    type: "tool"
  };
}
