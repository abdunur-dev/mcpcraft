import { createServer, tool, resource } from "../src";

// Initialize the MCP server
const server = createServer({
  name: "basic-example-server",
  version: "1.0.0",
  description: "A basic example MCP server built with mcpcraft"
});

// Register the get_weather tool
server.add(
  tool({
    name: "get_weather",
    description: "Retrieves the current weather forecast for a given location",
    input: {
      location: { type: "string", description: "The city name, e.g. London, San Francisco" },
      celsius: { type: "boolean", description: "Whether to return temperature in Celsius (default: true)", required: false }
    },
    run: async ({ location, celsius }) => {
      // Logic for retrieving weather data goes here
      const temp = Math.floor(Math.random() * 15) + 15; // Random temp between 15 and 30
      const isCelsius = celsius !== false;
      const unit = isCelsius ? "°C" : "°F";
      const displayTemp = isCelsius ? temp : Math.round((temp * 9) / 5 + 32);

      return {
        location,
        temperature: `${displayTemp}${unit}`,
        condition: "Sunny with light breeze",
        humidity: "45%"
      };
    }
  })
);

// Register the send_notification tool
server.add(
  tool({
    name: "send_notification",
    description: "Sends a notification to a specific channel",
    input: {
      channel: { type: "string", description: "The destination channel (e.g. slack, email, system)" },
      message: { type: "string", description: "The text message content to send" }
    },
    run: async ({ channel, message }) => {
      // Logic for sending notification goes here
      console.error(`[basic-server] Sending to ${channel}: "${message}"`);
      return {
        success: true,
        sentTo: channel,
        timestamp: new Date().toISOString()
      };
    }
  })
);

// Register a static resource
server.add(
  resource({
    name: "system_info",
    description: "Returns general system info and node version",
    uri: "info://system",
    mimeType: "application/json",
    fetch: async () => {
      return {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        uptime: `${process.uptime().toFixed(1)}s`
      };
    }
  })
);

// Register a dynamic resource template
server.add(
  resource({
    name: "user_profile",
    description: "Fetches information about a user profile by ID",
    uri: "users://{userId}/profile",
    mimeType: "application/json",
    fetch: async (params) => {
      const { userId } = params;
      return {
        id: userId,
        username: `user_${userId}`,
        role: userId === "1" ? "Administrator" : "Standard User",
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
      };
    }
  })
);

// Start the server on stdio transport
server.start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

