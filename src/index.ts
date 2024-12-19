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
  version: "0.1.5",
  author: "qpd-v"
}, {
  capabilities: {
    resources: {},
    tools: {},
    prompts: {}
  }
});

// Server categories and implementations
const serverCategories: Record<string, string[]> = {
  "browser": [
    "@automatalabs/mcp-server-playwright - Browser automation with Playwright",
    "@browserbase/mcp-server-browserbase - Browser automation and web interaction",
    "@browserbasehq/mcp-stagehand - Cloud browser automation capabilities",
    "@executeautomation/playwright-mcp-server - Browser automation and webscraping",
    "@it-beard/exa-server - Intelligent code search using Exa API",
    "@kimtaeyoon83/mcp-server-youtube-transcript - YouTube subtitles and transcripts",
    "@kimtth/mcp-aoai-web-browsing - Azure OpenAI and web browsing integration",
    "@modelcontextprotocol/server-puppeteer - Browser automation for web scraping",
    "@recursechat/mcp-server-apple-shortcuts - Apple Shortcuts integration"
  ],
  "cloud": [
    "@aws/kb-retrieval-mcp - Retrieval from AWS Knowledge Base using Bedrock Agent Runtime",
    "@cloudflare/mcp-server-cloudflare - Integration with Cloudflare services",
    "@flux159/mcp-server-kubernetes - Kubernetes operations for pods and services",
    "@rishikavikondala/mcp-server-aws - AWS resource operations using LLM",
    "@SmallCloudCo/smallcloud-mcp-server - Cloud service integration demonstration",
    "@strowk/mcp-k8s-go - Kubernetes cluster operations through MCP"
  ],
  "command_line": [
    "@g0t4/mcp-server-commands - Run any command with run_command and run_script tools",
    "@mladensu/cli-mcp-server - Command line interface with secure execution",
    "@PhialsBasement/CMD-MCP-Server - Secure command execution with analytics",
    "@simonb97/win-cli-mcp-server - Windows-specific CLI operations",
    "@tumf/mcp-shell-server - Secure shell command execution"
  ],
  "communication": [
    "@enescinr/twitter-mcp - Interact with Twitter API",
    "@hannesrudolph/imessage-query-fastmcp - iMessage database access and search",
    "@keturiosakys/bluesky-context-server - Bluesky integration with feed search",
    "@markelaugust74/mcp-google-calendar - Google Calendar event management",
    "@markuspfundstein/mcp-gsuite - Gmail and Google Calendar integration",
    "@modelcontextprotocol/server-bluesky - Bluesky instance integration",
    "@modelcontextprotocol/server-slack - Slack workspace integration",
    "@vidhupv/x-mcp - Create and manage X/Twitter posts"
  ],
  "customer_data": [
    "@ivo-toby/contentful-mcp - Content management in Contentful spaces",
    "@opendatamcp/opendatamcp - Connect Open Data to LLMs",
    "@sergehuber/inoyu-mcp-unomi-server - Apache Unomi CDP integration",
    "@tinybirdco/mcp-tinybird - Tinybird Workspace interaction"
  ],
  "database": [
    "@aekanun2020/mcp-server - MSSQL database integration",
    "@benborla/mcp-server-mysql - MySQL database integration (NodeJS)",
    "@cyanheads/atlas-mcp-server - Atlas database integration",
    "@designcomputer/mysql_mcp_server - MySQL database integration",
    "@ergut/mcp-bigquery-server - Google BigQuery integration",
    "@isaacwasserman/mcp-snowflake-server - Snowflake database integration",
    "@joshuarileydev/supabase-mcp-server - Supabase integration",
    "@kashiwabyte/vikingdb-mcp-server - VikingDB vector store integration",
    "@kiliczsh/mcp-mongo-server - MongoDB integration server",
    "@ktanaka101/mcp-server-duckdb - DuckDB integration",
    "@lucashild/mcp-server-bigquery - BigQuery integration",
    "@modelcontextprotocol/server-postgres - PostgreSQL integration",
    "@modelcontextprotocol/server-sqlite - SQLite operations",
    "@neo4j-contrib/mcp-neo4j - Neo4j graph database integration",
    "@quantgeekdev/mongo-mcp - MongoDB LLM integration",
    "@qdrant/mcp-server-qdrant - Qdrant vector database",
    "@surrealdb/surrealist-mcp - SurrealDB database integration",
    "@tinybirdco/mcp-tinybird - Tinybird integration"
  ],
  "developer": [
    "@Alec2435/python_mcp - Run Python code locally",
    "@dabouelhassan/mcp-server-example-v2 - FastAPI example server",
    "@e2b-dev/mcp-server - Code execution with E2B",
    "@emiryasar/mcp_code_analyzer - Code analysis tools",
    "@ggoodman/mcp - CLI and UI for MCP servers",
    "@jetbrains/mcpproxy - JetBrains IDE integration",
    "@joshuarileydev/ios-simulator-controller - iOS simulator control",
    "@joshrutkowski/applescript-mcp - macOS AppleScript integration",
    "@justjoehere/mcp_gradio_client - Gradio integration",
    "@mcp-get/server-curl - HTTP request interface",
    "@mcp-get/server-llm-txt - LLM.txt content search",
    "@mcp-get/server-macos - macOS system operations",
    "@mkearl/dependency-mcp - Dependency graph analysis",
    "@nguyenvanduocit/all-in-one-devtools - Development tools collection",
    "@oatpp/oatpp-mcp - C++ MCP integration",
    "@quantgeekdev/docker-mcp - Docker management",
    "@rmrf2020/decision-mind - Decision making demo",
    "@seanivore/mcp-code-analyzer - Python code analysis",
    "@shanejonas/openrpc-mpc-server - JSON-RPC API integration",
    "@snaggle-ai/openapi-mcp-server - OpenAPI integration",
    "@szeider/mcp-solver - MiniZinc constraint solving",
    "@tumf/mcp-text-editor - Text editor integration",
    "@vijayk-213/model-context-protocol - LLaMA integration",
    "@zeparhyfar/mcp-datetime - DateTime handling"
  ],
  "data_science": [
    "@reading-plus-ai/mcp-server-data-exploration - CSV data exploration",
    "@vivekvells/mcp-pandoc - Document format conversion"
  ],
  "filesystem": [
    "@apeyroux/mcp-xmind - XMind file operations",
    "@isaacphi/mcp-gdrive - Google Drive integration",
    "@kazuph/mcp-pocket - Pocket articles integration",
    "@mark3labs/mcp-filesystem-server - Golang filesystem implementation",
    "@modelcontextprotocol/server-filesystem - Local filesystem access",
    "@modelcontextprotocol/server-google-drive - Google Drive integration",
    "@RafalWilinski/mcp-apple-notes - Apple Notes RAG integration"
  ],
  "finance": [
    "@9nate-drake/mcp-yfinance - Yahoo Finance integration",
    "@Alec2435/amazon-fresh-server - Amazon Fresh integration",
    "@anjor/coinmarket-mcp-server - Coinmarket API integration",
    "@calvernaz/alphavantage - AlphaVantage market data",
    "@quantgeekdev/coincap-mcp - CoinCap cryptocurrency data",
    "@sammcj/bybit-mcp - Bybit exchange integration"
  ],
  "knowledge": [
    "@chemiguel23/memorymesh - Enhanced graph-based memory",
    "@modelcontextprotocol/server-memory - Knowledge graph system",
    "@run-llama/mcp-server-llamacloud - LlamaCloud integration",
    "@shaneholloman/mcp-knowledge-graph - Local knowledge graph",
    "@Synaptic-Labs-AI/claudesidian - Second brain integration",
    "@topoteretes/cognee-mcp-server - GraphRAG memory server"
  ],
  "location": [
    "@modelcontextprotocol/server-google-maps - Google Maps integration",
    "@mstfe/google-task-mcp - Google Tasks integration"
  ],
  "monitoring": [
    "@macrat/mcp-ayd-server - Ayd monitoring service",
    "@metoro-io/metoro-mcp-server - Kubernetes monitoring",
    "@modelcontextprotocol/server-raygun - Raygun monitoring",
    "@modelcontextprotocol/server-sentry - Sentry.io integration",
    "@ruchernchong/mcp-server-google-analytics - Analytics integration",
    "@Sladey01/mcp-snyk - Snyk security scanning",
    "@sunsetcoder/flightradar24-mcp-server - Flight tracking",
    "@tevonsb/homeassistant-mcp - Home Assistant control"
  ],
  "search": [
    "@ac3xx/mcp-servers-kagi - Kagi search integration",
    "@ahonn/mcp-server-gsc - Google Search Console access",
    "@andybrandt/mcp-simple-arxiv - ArXiv paper search",
    "@andybrandt/mcp-simple-pubmed - PubMed paper search",
    "@angheljf/nyt - NYTimes article search",
    "@apify/mcp-server-rag-web-browser - Web content search",
    "@blazickjp/arxiv-mcp-server - ArXiv research papers",
    "@dmayboroda/minima - Local RAG implementation",
    "@exa-labs/exa-mcp-server - Exa AI Search",
    "@fatwang2/search1api-mcp - Search1API integration",
    "@it-beard/tavily-server - Tavily AI search",
    "@laksh-star/mcp-server-tmdb - Movie and TV data",
    "@modelcontextprotocol/server-brave-search - Brave Search",
    "@modelcontextprotocol/server-fetch - Web content fetching",
    "@mzxrai/mcp-webresearch - Google search integration",
    "@secretiveshell/searxng-search - SearXNG integration",
    "@tomatio13/mcp-server-tavily - Tavily search API",
    "@vrknetha/mcp-server-firecrawl - Web scraping",
    "@wong2/mcp-jina-reader - URL to Markdown conversion"
  ],
  "security": [
    "@axiomhq/mcp-server-axiom - Axiom platform integration",
    "@burtthecoder/maigret - OSINT username search",
    "@burtthecoder/shodan - Shodan security search",
    "@burtthecoder/virustotal - VirusTotal analysis"
  ],
  "compliance": [
    "@dynamicendpoints/bod-25-01-cisa-mcp - CISA security requirements"
  ],
  "travel": [
    "@r-huijts/ns-mcp-server - Dutch Railways information"
  ],
  "version_control": [
    "@block/goose-mcp - GitHub operations automation",
    "@modelcontextprotocol/server-git - Git operations",
    "@modelcontextprotocol/server-github - GitHub API integration",
    "@modelcontextprotocol/server-gitlab - GitLab integration"
  ],
  "other": [
    "@aliargun/mcp-server-gemini - Google Gemini integration",
    "@amidabuddha/unichat-mcp-server - Multi-provider LLM integration",
    "@anaisbetts/mcp-installer - MCP server installer",
    "@anaisbetts/mcp-youtube - YouTube subtitles",
    "@andybrandt/mcp-simple-openai-assistant - OpenAI assistants",
    "@andybrandt/mcp-simple-timeserver - Time service",
    "@baba786/phabricator-mcp-server - Phabricator integration",
    "@bartolli/mcp-llm-bridge - OpenAI-compatible LLMs",
    "@calclavia/mcp-obsidian - Markdown notes",
    "@ccabanillas/notion-mcp - Notion API integration",
    "@chatmcp/mcp-server-chatsum - Chat analysis",
    "@danhilse/notion_mcp - Notion API integration",
    "@dgormly/mcp-financial-advisor - Financial advisory",
    "@DMontgomery40/mcp-canvas-lms - Canvas LMS integration",
    "@domdomegg/airtable-mcp-server - Airtable integration",
    "@evalstate/mcp-miro - MIRO whiteboard access",
    "@felores/airtable-mcp - Airtable integration",
    "@future-audiences/wikimedia-enterprise-mcp - Wikipedia lookup",
    "@isaacwasserman/mcp-vegalite-server - Data visualization",
    "@jerhadf/linear-mcp-server - Linear project management",
    "@jimpick/fireproof-todo-mcp - Fireproof todo list",
    "@joshuarileydev/app-store-connect - App Store integration",
    "@lightconetech/mcp-gateway - SSE Server gateway",
    "@llmindset/mcp-hfspace - HuggingFace Spaces",
    "@markuspfundstein/mcp-obsidian - Obsidian REST API",
    "@MCP-Club/mcpm - MCP server manager",
    "@mikeskarl/mcp-prompt-templates - Analysis templates",
    "@modelcontextprotocol/server-everything - MCP features demo",
    "@mrjoshuak/godoc-mcp - Go documentation",
    "@mzxrai/mcp-openai - OpenAI chat integration",
    "@navisbio/clinicaltrials-mcp - ClinicalTrials.gov data",
    "@patruff/claude-mcp-setup - Windows MCP setup",
    "@patruff/ollama-mcp-bridge - Ollama LLM integration",
    "@pierrebrunelle/mcp-server-openai - OpenAI integration",
    "@pyroprompts/any-chat-completions-mcp - OpenAI API",
    "@reeeeemo/ancestry-mcp - Genealogy data",
    "@rusiaaman/wcgw - Shell execution (Mac)",
    "@sammcj/package-version - Package management",
    "@sirmews/apple-notes-mcp - Apple Notes access",
    "@sirmews/mcp-pinecone - Pinecone vector DB",
    "@skydeckai/mcp-server-rememberizer - Knowledge retrieval",
    "@smithery-ai/mcp-obsidian - Obsidian vault integration",
    "@sooperset/mcp-atlassian - Confluence integration",
    "@suekou/mcp-notion-server - Notion integration",
    "@tanigami/mcp-server-perplexity - Perplexity API",
    "@v-3/notion-server - Notion management",
    "@varunneal/spotify-mcp - Spotify playback",
    "@wong2/litemcp - TypeScript MCP framework",
    "@wong2/mcp-cli - MCP testing tool",
    "@zueai/mcp-manager - MCP server management UI"
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
              description: "Server category to list (e.g., 'browser', 'cloud', 'command_line', 'communication', 'database', 'developer', 'filesystem', 'search', 'all')",
              enum: ["browser", "cloud", "command_line", "communication", "customer_data", "database", "developer", "data_science", "filesystem", "finance", "knowledge", "location", "monitoring", "search", "security", "compliance", "travel", "version_control", "other", "all"]
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
      security: "🔐",
      compliance: "🔒",
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
server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [{
    name: "create_tool",
    description: "Guide for creating your first MCP tool",
    arguments: [{
      name: "tool_name",
      description: "Name of the tool to create",
      required: true
    }, {
      name: "description",
      description: "What the tool will do",
      required: true
    }]
  }, {
    name: "create_resource",
    description: "Guide for creating your first MCP resource",
    arguments: [{
      name: "resource_type",
      description: "Type of resource (file, api, database)",
      required: true
    }]
  }]
}));

// Handle prompt retrieval
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "create_tool") {
    const toolName = args?.tool_name || "example_tool";
    const description = args?.description || "an example tool";

    return {
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Let's create a new MCP tool called "${toolName}" that will ${description}. Here's a step-by-step guide:\n\n1. First, we'll define the tool's schema:\n\n\`\`\`typescript\n{\n  name: "${toolName}",\n  description: "${description}",\n  inputSchema: {\n    type: "object",\n    properties: {\n      // Add your parameters here\n    },\n    required: []\n  }\n}\n\`\`\`\n\n2. Then implement the tool handler:\n\n\`\`\`typescript\nserver.setRequestHandler(CallToolRequestSchema, async (request) => {\n  if (request.params.name === "${toolName}") {\n    // Add your tool logic here\n    return {\n      content: [{\n        type: "text",\n        text: "Tool result"\n      }]\n    };\n  }\n});\n\`\`\`\n\n3. Test your tool:\n   - Use the MCP Inspector to verify the tool appears\n   - Try calling it with different inputs\n   - Check error handling\n\nNeed help? Try the explain_concept tool with "tools" as the concept!`
        }
      }]
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
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Let's create a new MCP resource of type "${resourceType}". Here's how:\n\n1. Define the resource:\n\n\`\`\`typescript\n{\n  uri: "${examples[resourceType]}",\n  name: "My Resource",\n  description: "Description of what this resource provides",\n  mimeType: "application/json"  // Adjust based on content type\n}\n\`\`\`\n\n2. Implement the resource handler:\n\n\`\`\`typescript\nserver.setRequestHandler(ReadResourceRequestSchema, async (request) => {\n  if (request.params.uri === "${examples[resourceType]}") {\n    return {\n      contents: [{\n        uri: request.params.uri,\n        mimeType: "application/json",\n        text: JSON.stringify({ /* your data here */ })\n      }]\n    };\n  }\n});\n\`\`\`\n\n3. Test your resource:\n   - Use the MCP Inspector to verify the resource appears\n   - Try reading it\n   - Check error handling\n\nNeed help? Try the explain_concept tool with "resources" as the concept!`
        }
      }]
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