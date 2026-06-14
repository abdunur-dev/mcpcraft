import { Resource, ResourceOptions } from "./types";

/**
 * Creates an MCP resource or resource template definition.
 * 
 * @param options Resource options including name, description, uri template, and fetch logic.
 * @returns A Resource definition object.
 */
export function resource(options: ResourceOptions): Resource {
  return {
    ...options,
    type: "resource"
  };
}
