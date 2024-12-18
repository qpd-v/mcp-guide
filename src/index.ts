#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

// Initialize server
const server = new Server({
  name: "mcp-guide",
  version: "0.1.3",
  author: "qpd-v"
}, {
  capabilities: {
    resources: {},
    tools: {},
    prompts: {}
  }
});

// Server categories and implementations
// Server categories and implementations
// Server categories and implementations
const serverCategories: Record<string, string[]> = {
  "browser": [
    "@executeautomation/playwright-mcp-server - Browser automation and webscraping",
    "@automatalabs/mcp-server-playwright - Browser automation with Playwright",
    "@modelcontextprotocol/server-puppeteer - Browser automation for web scraping",
    "@kimtaeyoon83/mcp-server-youtube-transcript - YouTube subtitles and transcripts",
    "@recursechat/mcp-server-apple-shortcuts - Apple Shortcuts integration"
  ],
  "cloud": [
    "Cloudflare MCP Server - Integration with Cloudflare services",
    "Kubernetes MCP Server - Kubernetes cluster operations",
    "@flux159/mcp-server-kubernetes - Kubernetes operations for pods and services"
  ],
  "command_line": [
    "g0t4/mcp-server-commands - Run any command with run_command and run_script tools",
    "MladenSU/cli-mcp-server - Command line interface with secure execution",
    "tumf/mcp-shell-server - Secure shell command execution"
  ],
  "communication": [
    "@modelcontextprotocol/server-slack - Slack workspace integration",
    "@modelcontextprotocol/server-bluesky - Bluesky instance integration",
    "MarkusPfundstein/mcp-gsuite - Integration with Gmail and Google Calendar"
  ],
  "customer_data": [
    "sergehuber/inoyu-mcp-unomi-server - Access and update profiles on Apache Unomi CDP",
    "OpenDataMCP/OpenDataMCP - Connect any Open Data to any LLM",
    "tinybirdco/mcp-tinybird - Interact with a Tinybird Workspace"
  ],
  "database": [
    "LucasHild/mcp-server-bigquery - BigQuery integration",
    "ergut/mcp-bigquery-server - Google BigQuery integration",
    "designcomputer/mysql_mcp_server - MySQL database integration",
    "@modelcontextprotocol/server-postgres - PostgreSQL integration",
    "@modelcontextprotocol/server-sqlite - SQLite operations",
    "@joshuarileydev/supabase-mcp-server - Supabase MCP Server",
    "ktanaka101/mcp-server-duckdb - DuckDB integration",
    "QuantGeekDev/mongo-mcp - MongoDB integration",
    "tinybirdco/mcp-tinybird - Tinybird integration",
    "kiliczsh/mcp-mongo-server - MongoDB integration",
    "KashiwaByte/vikingdb-mcp-server - VikingDB integration",
    "neo4j-contrib/mcp-neo4j - Neo4j integration"
  ],
  "developer": [
    "QuantGeekDev/docker-mcp - Docker container management",
    "snaggle-ai/openapi-mcp-server - OpenAPI integration",
    "jetbrains/mcpProxy - JetBrains IDE integration"
  ],
  "data_science": [
    "@reading-plus-ai/mcp-server-data-exploration - Autonomous data exploration on .csv datasets"
  ],
  "filesystem": [
    "@modelcontextprotocol/server-filesystem - Local file system access",
    "@modelcontextprotocol/server-google-drive - Google Drive integration",
    "mark3labs/mcp-filesystem-server - Golang file system implementation"
  ],
  "finance": [
    "QuantGeekDev/coincap-mcp - Real-time cryptocurrency market data",
    "anjor/coinmarket-mcp-server - Coinmarket API integration"
  ],
  "knowledge": [
    "@modelcontextprotocol/server-memory - Knowledge graph-based persistent memory",
    "/CheMiguel23/MemoryMesh - Enhanced graph-based memory"
  ],
  "location": [
    "@modelcontextprotocol/server-google-maps - Google Maps integration"
  ],
  "monitoring": [
    "@modelcontextprotocol/server-sentry - Sentry.io integration",
    "@modelcontextprotocol/server-raygun - Raygun API V3 integration",
    "metoro-io/metoro-mcp-server - Interact with Kubernetes environments"
  ],
  "search": [
    "@modelcontextprotocol/server-brave-search - Brave Search API",
    "@angheljf/nyt - NYTimes article search",
    "@modelcontextprotocol/server-fetch - Web content fetching",
    "ac3xx/mcp-servers-kagi - Kagi search integration",
    "exa-labs/exa-mcp-server - Exa AI Search API",
    "fatwang2/search1api-mcp - Search via search1api",
    "Tomatio13/mcp-server-tavily - Tavily AI search API",
    "blazickjp/arxiv-mcp-server - Search ArXiv research papers",
    "mzxrai/mcp-webresearch - Search Google and do deep web research",
    "andybrandt/mcp-simple-arxiv - Search and read papers from arXiv",
    "andybrandt/mcp-simple-pubmed - Search and read medical papers from PubMed",
    "apify/mcp-server-rag-web-browser - Apify's RAG Web Browser Actor"
  ],
  "travel": [
    "NS Travel Information MCP Server - Access Dutch Railways travel information"
  ],
  "version_control": [
    "@modelcontextprotocol/server-github - GitHub API integration",
    "@modelcontextprotocol/server-gitlab - GitLab platform integration",
    "@modelcontextprotocol/server-git - Direct Git repository operations"
  ],
  "other": [
    "mzxrai/mcp-openai - Chat with OpenAI's models",
    "mrjoshuak/godoc-mcp - Go documentation server",
    "pierrebrunelle/mcp-server-openai - Query OpenAI models",
    "@modelcontextprotocol/server-everything - MCP server with all features",
    "baba786/phabricator-mcp-server - Interacting with Phabricator API",
    "MarkusPfundstein/mcp-obsidian - Interacting with Obsidian",
    "calclavia/mcp-obsidian - Read and search Markdown notes",
    "anaisbetts/mcp-youtube - Fetch YouTube subtitles",
    "danhilse/notion_mcp - Integrates with Notion's API",
    "rusiaaman/wcgw - Autonomous shell execution",
    "reeeeemo/ancestry-mcp - Read .ged files and genetic data",
    "sirmews/apple-notes-mcp - Read from Apple Notes database",
    "anjor/coinmarket-mcp-server - Coinmarket API integration",
    "suekou/mcp-notion-server - Interacting with Notion API",
    "amidabuddha/unichat-mcp-server - Send requests to various AI models",
    "evalstate/mcp-miro - Access MIRO whiteboards",
    "sooperset/mcp-atlassian - Search and access Confluence workspaces",
    "pyroprompts/any-chat-completions-mcp - Chat with OpenAI SDK Compatible APIs",
    "anaisbetts/mcp-installer - Installs other MCP servers",
    "tanigami/mcp-server-perplexity - Interacting with Perplexity API",
    "future-audiences/wikimedia-enterprise-model-context-protocol - Wikipedia Article lookup",
    "andybrandt/mcp-simple-timeserver - Check local or UTC time",
    "andybrandt/mcp-simple-openai-assistant - Talk to OpenAI assistants",
    "@llmindset/mcp-hfspace - Use HuggingFace Spaces",
    "zueai/mcp-manager - Web UI to manage MCP servers",
    "wong2/mcp-cli - CLI tool for testing MCP servers",
    "isaacwasserman/mcp-vegalite-server - Generate visualizations with VegaLite"
  ]
};

// Tools to help understand MCP concepts
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "explain_concept",
        description: "Get a beginner-friendly explanation of an MCP concept",
        inputSchema: {
          type: "object",
          properties: {
            concept: {
              type: "string",
              description: "The MCP concept to explain (e.g., 'tools', 'resources', 'prompts', 'server', 'client', 'server_types', 'frameworks', 'clients')",
            }
          },
          required: ["concept"]
        }
      },
      {
        name: "show_example",
        description: "Show a practical example of an MCP feature",
        inputSchema: {
          type: "object",
          properties: {
            feature: {
              type: "string",
              description: "The MCP feature to demonstrate (e.g., 'tool_call', 'resource_read', 'prompt_template')",
            }
          },
          required: ["feature"]
        }
      },
      {
        name: "list_servers",
        description: "List available MCP servers by category",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Server category to list (e.g., 'browser', 'cloud', 'database', 'developer', 'filesystem', 'search', 'all')",
              enum: ["browser", "cloud", "database", "developer", "filesystem", "search", "all"]
            }
          },
          required: ["category"]
        }
      }
    ]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "explain_concept" && args) {
    const concept = (args.concept as string).toLowerCase();
    const explanations: Record<string, string> = {
      "tools": "Tools are functions that LLMs can call to perform actions. Think of them like special commands that Claude can use to do things like search data, make API calls, or perform calculations. Every tool has a name, description, and a schema that defines what information it needs.\n\nFor example, a weather tool might need a city name to fetch the forecast. The LLM reads the tool descriptions and decides when to use them based on the user's requests. For safety, tools always require user approval before executing.",
      "resources": "Resources are pieces of data that can be read by LLMs, like files, API responses, or database records. Each resource has a unique URI (like a web address) that identifies it. Resources can contain text (like code or documents) or binary data (like images).\n\nUnlike tools which perform actions, resources just provide information. They're great for giving LLMs access to documentation, configuration files, or other reference material.",
      "prompts": "Prompts are pre-written templates that help guide conversations with LLMs. They can include dynamic parts that get filled in with specific information. Prompts often show up as slash commands or menu options in chat interfaces.\n\nFor example, a code review prompt might have placeholders for the programming language and code to review. This helps ensure consistent and effective interactions.",
      "server": "An MCP server is a program that provides tools, resources, and prompts to LLMs. It's like a bridge between AI models and your data or systems. Servers can be simple (like providing access to local files) or complex (like connecting to databases or APIs).\n\nServers use a standard protocol (MCP) to communicate, which means they work with any MCP-compatible client like Claude Desktop.",
      "client": "An MCP client is a program that connects to MCP servers and coordinates interactions with LLMs. Claude Desktop is an example of a client - it manages connections to servers, handles user permissions, and presents tools and resources in its interface.\n\nClients act as middlemen, ensuring secure and controlled access to server capabilities.",
      "server_types": "MCP servers come in many specialized types:\n\n" +
        "📂 Browser Automation: Web scraping and interaction\n" +
        "☁️ Cloud Platforms: Manage cloud infrastructure\n" +
        "🖥️ Command Line: Execute shell commands securely\n" +
        "💬 Communication: Integrate with messaging platforms\n" +
        "🗄️ Databases: Query and analyze data\n" +
        "🛠️ Developer Tools: Enhance development workflows\n" +
        "📂 File Systems: Access and manage files\n" +
        "🧠 Knowledge & Memory: Maintain persistent context\n" +
        "🔎 Search: Web and data search capabilities\n" +
        "🔄 Version Control: Git and repository management",
      "frameworks": "MCP has several frameworks for building servers:\n\n" +
        "- TypeScript SDK: Official TypeScript implementation\n" +
        "- Python SDK: Official Python implementation\n" +
        "- Kotlin SDK: Official Kotlin implementation\n" +
        "- FastMCP: High-level Python framework\n" +
        "- LiteMCP: High-level TypeScript framework\n" +
        "- MCP-Go: Golang SDK\n\n" +
        "These frameworks provide tools and utilities for building MCP servers efficiently.",
      "clients": "Popular MCP clients include:\n\n" +
        "- Claude Desktop: Official Anthropic client\n" +
        "- Zed: Multiplayer code editor\n" +
        "- Continue: VSCode extension\n" +
        "- Firebase Genkit: Agent framework\n" +
        "- MCP-Bridge: OpenAI middleware proxy\n\n" +
        "Clients can connect to multiple servers and manage their capabilities."
    };

    const explanation = explanations[concept];
    if (!explanation) {
      return {
        content: [{
          type: "text",
          text: `I don't have an explanation for "${concept}" yet. Available concepts: ${Object.keys(explanations).join(", ")}`
        }]
      };
    }

    return {
      content: [{
        type: "text",
        text: explanation
      }]
    };
  }

  if (name === "show_example" && args) {
    const feature = (args.feature as string).toLowerCase();
    const examples: Record<string, string> = {
      "tool_call": `Here's an example of defining and using a tool:

// Define the tool
{
  name: "calculate_sum",
  description: "Add two numbers together",
  inputSchema: {
    type: "object",
    properties: {
      a: { type: "number" },
      b: { type: "number" }
    },
    required: ["a", "b"]
  }
}

// Use the tool
const result = await server.callTool("calculate_sum", { a: 5, b: 3 });
// Result: 8`,

      "resource_read": `Here's an example of exposing and reading a resource:

// Define the resource
{
  uri: "file:///docs/guide.md",
  name: "MCP Guide",
  description: "Documentation for MCP concepts",
  mimeType: "text/markdown"
}

// Read the resource
const content = await server.readResource("file:///docs/guide.md");`,

      "prompt_template": `Here's an example of a prompt template:

{
  name: "code_review",
  description: "Review code for best practices",
  arguments: [
    {
      name: "language",
      description: "Programming language",
      required: true
    },
    {
      name: "code",
      description: "Code to review",
      required: true
    }
  ]
}

// Generated prompt:
"Please review this {language} code:\n{code}"`
    };

    const example = examples[feature];
    if (!example) {
      return {
        content: [{
          type: "text",
          text: `I don't have an example for "${feature}" yet. Available examples: ${Object.keys(examples).join(", ")}`
        }]
      };
    }

    return {
      content: [{
        type: "text",
        text: example
      }]
    };
  }

  if (name === "list_servers" && args) {
    const category = (args.category as string).toLowerCase();
    const categoryEmojis: Record<string, string> = {
      browser: "📂",
      cloud: "☁️",
      command_line: "🖥️",
      communication: "💬",
      customer_data: "👤",
      database: "🗄️",
      developer: "🛠️",
      data_science: "🧮",
      filesystem: "📂",
      finance: "💰",
      knowledge: "🧠",
      location: "🗺️",
      monitoring: "📊",
      search: "🔎",
      travel: "🚆",
      version_control: "🔄",
      other: "🛠️"
    };
    
    if (category === "all") {
      const allServers = Object.entries(serverCategories)
        .map(([cat, servers]) => {
          const emoji = categoryEmojis[cat] || "📦";
          const formattedCategory = cat
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          
          const serverList = servers
            .map(server => `- ${server}`)
            .join('\n');

          return `\n## ${emoji} ${formattedCategory}\n\n${serverList}`;
        })
        .join('\n');
      
      return {
        content: [{
          type: "text",
          text: `# Available MCP Servers by Category${allServers}`
        }]
      };
    }

    const servers = serverCategories[category];
    if (!servers) {
      return {
        content: [{
          type: "text",
          text: `Unknown category: "${category}". Available categories: ${Object.keys(serverCategories).join(", ")}`
        }]
      };
    }

    const emoji = categoryEmojis[category] || "📦";
    const formattedCategory = category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    return {
      content: [{
        type: "text",
        text: `# ${emoji} ${formattedCategory} Servers\n\n${servers.map(server => `- ${server}`).join('\n')}`
      }]
    };
  }

  throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
});

// Resources for documentation
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "guide://concepts/overview",
        name: "MCP Overview",
        description: "High-level introduction to MCP concepts",
        mimeType: "text/markdown"
      },
      {
        uri: "guide://concepts/tools",
        name: "Understanding Tools",
        description: "Deep dive into MCP tools",
        mimeType: "text/markdown"
      },
      {
        uri: "guide://concepts/resources",
        name: "Understanding Resources",
        description: "Deep dive into MCP resources",
        mimeType: "text/markdown"
      },
      {
        uri: "guide://concepts/prompts",
        name: "Understanding Prompts",
        description: "Deep dive into MCP prompts",
        mimeType: "text/markdown"
      }
    ]
  };
});

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  
  const content: Record<string, string> = {
    "guide://concepts/overview": `# Understanding MCP

The Model Context Protocol (MCP) is like a universal translator between AI models and data sources. It helps AI assistants like Claude access the information and tools they need in a standardized way.

## Key Components

1. **Servers** - Programs that provide:
   - Tools (functions the AI can call)
   - Resources (data the AI can read)
   - Prompts (templates for common tasks)

2. **Clients** - Programs that:
   - Connect to servers
   - Manage permissions
   - Handle user interaction

3. **Protocol** - The rules for how everything communicates

## How It Works

1. You run an MCP server that connects to your data
2. You connect the server to a client like Claude Desktop
3. The AI can now use your server's capabilities!`,

    "guide://concepts/tools": `# Understanding MCP Tools

Tools are functions that LLMs can call to perform actions. They're perfect for tasks like:
- Fetching data from APIs
- Performing calculations
- Manipulating files
- Running system commands

## Anatomy of a Tool

Every tool has:
1. A unique name
2. A description that helps the LLM understand when to use it
3. An input schema that defines what parameters it accepts

## Example Tool

\`\`\`typescript
{
  name: "get_weather",
  description: "Get weather for a location",
  inputSchema: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "City name"
      }
    },
    required: ["location"]
  }
}
\`\`\`

## Security

Tools always require user approval before executing. This ensures safety and control.`,

    "guide://concepts/resources": `# Understanding MCP Resources

Resources are pieces of data that LLMs can read. They're great for providing:
- Documentation
- Configuration files
- API responses
- Database records
- And more!

## Resource Structure

Every resource has:
1. A unique URI
2. A name and description
3. A MIME type
4. Content (text or binary)

## Example Resource

\`\`\`typescript
{
  uri: "file:///config.json",
  name: "Configuration",
  description: "System settings",
  mimeType: "application/json"
}
\`\`\`

## Types of Resources

1. Static Resources - Fixed content
2. Dynamic Resources - Content generated on demand
3. Template Resources - Parameterized URIs`,

    "guide://concepts/prompts": `# Understanding MCP Prompts

Prompts are pre-written templates that help standardize LLM interactions. They're useful for:
- Common tasks
- Guided workflows
- Consistent formatting

## Prompt Structure

Every prompt has:
1. A unique name
2. A description
3. Optional arguments
4. Message templates

## Example Prompt

\`\`\`typescript
{
  name: "analyze_code",
  description: "Review code for improvements",
  arguments: [
    {
      name: "language",
      description: "Programming language",
      required: true
    },
    {
      name: "code",
      description: "Code to analyze",
      required: true
    }
  ]
}
\`\`\`

## Using Prompts

Prompts often appear as:
- Slash commands
- Menu options
- Quick actions`
  };

  const resourceContent = content[uri];
  if (!resourceContent) {
    throw new McpError(ErrorCode.InvalidRequest, `Resource not found: ${uri}`);
  }

  return {
    contents: [{
      uri,
      mimeType: "text/markdown",
      text: resourceContent
    }]
  };
});

// Tutorial prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "create_tool",
        description: "Guide for creating your first MCP tool",
        arguments: [
          {
            name: "tool_name",
            description: "Name of the tool to create",
            required: true
          },
          {
            name: "description",
            description: "What the tool will do",
            required: true
          }
        ]
      },
      {
        name: "create_resource",
        description: "Guide for creating your first MCP resource",
        arguments: [
          {
            name: "resource_type",
            description: "Type of resource (file, api, database)",
            required: true
          }
        ]
      }
    ]
  };
});

// Handle prompt retrieval
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "create_tool") {
    const toolName = args?.tool_name || "example_tool";
    const description = args?.description || "an example tool";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Let's create a new MCP tool called "${toolName}" that will ${description}. Here's a step-by-step guide:

1. First, we'll define the tool's schema:

\`\`\`typescript
{
  name: "${toolName}",
  description: "${description}",
  inputSchema: {
    type: "object",
    properties: {
      // Add your parameters here
    },
    required: []
  }
}
\`\`\`

2. Then implement the tool handler:

\`\`\`typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "${toolName}") {
    // Add your tool logic here
    return {
      content: [{
        type: "text",
        text: "Tool result"
      }]
    };
  }
});
\`\`\`

3. Test your tool:
   - Use the MCP Inspector to verify the tool appears
   - Try calling it with different inputs
   - Check error handling

Need help? Try the explain_concept tool with "tools" as the concept!`
          }
        }
      ]
    };
  }

  if (name === "create_resource") {
    const resourceType = args?.resource_type?.toLowerCase() || "file";
    const examples: Record<string, string> = {
      "file": "file:///data/config.json",
      "api": "api://weather/current",
      "database": "db://users/schema"
    };

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Let's create a new MCP resource of type "${resourceType}". Here's how:

1. Define the resource:

\`\`\`typescript
{
  uri: "${examples[resourceType]}",
  name: "My Resource",
  description: "Description of what this resource provides",
  mimeType: "application/json"  // Adjust based on content type
}
\`\`\`

2. Implement the resource handler:

\`\`\`typescript
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "${examples[resourceType]}") {
    return {
      contents: [{
        uri: request.params.uri,
        mimeType: "application/json",
        text: JSON.stringify({ /* your data here */ })
      }]
    };
  }
});
\`\`\`

3. Test your resource:
   - Use the MCP Inspector to verify the resource appears
   - Try reading it
   - Check error handling

Need help? Try the explain_concept tool with "resources" as the concept!`
          }
        }
      ]
    };
  }

  throw new McpError(ErrorCode.InvalidRequest, `Unknown prompt: ${name}`);
});

// Run the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Guide server running on stdio');
}

main().catch(console.error);