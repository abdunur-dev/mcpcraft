import { spawn } from "child_process";
import * as path from "path";

// Path to basic-server.ts execution
const serverPath = path.join(__dirname, "../examples/basic-server.ts");

console.log("Starting mock MCP client test...");
console.log(`Spawning basic-server at: ${serverPath}`);

const child = spawn("npx", ["ts-node", serverPath], {
  env: { ...process.env, FORCE_COLOR: "0" },
  shell: true
});

let buffer = "";

child.stdout.on("data", (data) => {
  buffer += data.toString();
  // Try to parse lines of JSON-RPC messages
  const lines = buffer.split("\n");
  buffer = lines.pop() || ""; // keep the last partial line

  for (const line of lines) {
    if (line.trim()) {
      try {
        const msg = JSON.parse(line.trim());
        console.log("\n[Client Received Response]:");
        console.log(JSON.stringify(msg, null, 2));
        handleResponse(msg);
      } catch (err) {
        console.error("[Client Error parsing stdout]:", line, err);
      }
    }
  }
});

child.stderr.on("data", (data) => {
  console.error(`[Server Log (stderr)]: ${data.toString().trim()}`);
});

child.on("close", (code) => {
  console.log(`Server process exited with code ${code}`);
  if (failedTests > 0) {
    console.error(`\n❌ Tests failed: ${failedTests}`);
    process.exit(1);
  } else {
    console.log("\n✅ All tests passed successfully!");
    process.exit(0);
  }
});

const requests = [
  // 1. List tools
  {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list",
    params: {}
  },
  // 2. Call tool successfully
  {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: {
      name: "get_weather",
      arguments: {
        location: "Tokyo",
        celsius: true
      }
    }
  },
  // 3. Call tool validation failure
  {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "get_weather",
      arguments: {
        location: "Berlin",
        celsius: "not-a-boolean" // should trigger Zod error
      }
    }
  },
  // 4. List resources (static)
  {
    jsonrpc: "2.0",
    id: 4,
    method: "resources/list",
    params: {}
  },
  // 5. Read static resource
  {
    jsonrpc: "2.0",
    id: 5,
    method: "resources/read",
    params: {
      uri: "info://system"
    }
  },
  // 6. List resource templates (dynamic)
  {
    jsonrpc: "2.0",
    id: 6,
    method: "resources/templates/list",
    params: {}
  },
  // 7. Read dynamic resource template
  {
    jsonrpc: "2.0",
    id: 7,
    method: "resources/read",
    params: {
      uri: "users://99/profile"
    }
  }
];

let currentRequestIndex = 0;
let failedTests = 0;

function sendNextRequest() {
  if (currentRequestIndex >= requests.length) {
    console.log("\nAll requests sent. Terminating server...");
    child.kill();
    return;
  }

  const req = requests[currentRequestIndex];
  console.log(`\n[Client Sending Request id=${req.id} method=${req.method}]:`);
  console.log(JSON.stringify(req, null, 2));
  child.stdin.write(JSON.stringify(req) + "\n");
}

function handleResponse(response: any) {
  const req = requests[currentRequestIndex];
  
  if (response.error) {
    console.error(`❌ Request ${req.id} failed with error:`, response.error);
    failedTests++;
  } else {
    // Assertions
    if (req.id === 1) {
      const tools = response.result?.tools;
      if (Array.isArray(tools) && tools.length === 2) {
        console.log("✅ tools/list matches description and length.");
      } else {
        console.error("❌ tools/list validation failed:", tools);
        failedTests++;
      }
    } else if (req.id === 2) {
      const text = response.result?.content?.[0]?.text;
      if (text && text.includes("Tokyo")) {
        console.log("✅ tools/call execution succeeded and returned custom object.");
      } else {
        console.error("❌ tools/call execution validation failed:", response);
        failedTests++;
      }
    } else if (req.id === 3) {
      const text = response.result?.content?.[0]?.text;
      const isError = response.result?.isError;
      if (isError && text && text.includes("Validation failed")) {
        console.log("✅ tools/call correctly returned validation error response.");
      } else {
        console.error("❌ tools/call error validation failed:", response);
        failedTests++;
      }
    } else if (req.id === 4) {
      const resources = response.result?.resources;
      if (Array.isArray(resources) && resources.some((r: any) => r.uri === "info://system")) {
        console.log("✅ resources/list contains static system info resource.");
      } else {
        console.error("❌ resources/list validation failed:", resources);
        failedTests++;
      }
    } else if (req.id === 5) {
      const text = response.result?.contents?.[0]?.text;
      if (text && text.includes("nodeVersion")) {
        console.log("✅ resources/read read static resource successfully.");
      } else {
        console.error("❌ resources/read validation failed:", response);
        failedTests++;
      }
    } else if (req.id === 6) {
      const templates = response.result?.resourceTemplates;
      if (Array.isArray(templates) && templates.some((t: any) => t.uriTemplate === "users://{userId}/profile")) {
        console.log("✅ resources/templates/list contains dynamic profile template.");
      } else {
        console.error("❌ resources/templates/list validation failed:", templates);
        failedTests++;
      }
    } else if (req.id === 7) {
      const text = response.result?.contents?.[0]?.text;
      if (text && text.includes("user_99") && text.includes("Standard User")) {
        console.log("✅ resources/read resolved dynamic template and fetched content.");
      } else {
        console.error("❌ resources/read dynamic template validation failed:", response);
        failedTests++;
      }
    }
  }

  currentRequestIndex++;
  // Add a tiny delay to ensure proper output sequencing
  setTimeout(sendNextRequest, 100);
}

// Start test sequence once server says it's ready on stderr
let serverReady = false;
child.stderr.on("data", (data) => {
  const logStr = data.toString();
  if (logStr.includes("running on stdio transport") && !serverReady) {
    serverReady = true;
    sendNextRequest();
  }
});
