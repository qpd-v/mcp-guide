# MCP Guide Server (v0.1.5)

A beginner-friendly Model Context Protocol (MCP) server that helps users understand MCP concepts, provides interactive examples, and lists available MCP servers. This server is designed to be a helpful companion for developers working with MCP.

Author: qpd-v

## Features

- 📚 **Concept Explanations**: Get clear, beginner-friendly explanations of MCP concepts like tools, resources, prompts, and more
- 🔍 **Server Directory**: Browse a comprehensive list of available MCP servers organized by category
- 💡 **Interactive Examples**: See practical examples of MCP features in action
- 🛠️ **Tutorial Prompts**: Step-by-step guides for creating your first MCP tools and resources

## Installation

```bash
# Using npm
npm install -g mcp-guide

# Using yarn
yarn global add mcp-guide
```

## Usage

### With Claude Desktop

1. Add the server to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "mcp-guide": {
      "command": "node",
      "args": ["path/to/mcp-guide/dist/index.js"]
    }
  }
}
```

2. Restart Claude Desktop
3. Use the available tools:
   - `explain_concept`: Get explanations of MCP concepts
   - `show_example`: See practical examples of MCP features
   - `list_servers`: Browse available MCP servers by category

### Standalone

```bash
# Start the server
mcp-guide

# Or if installed locally
npx mcp-guide
```

## Available Tools

### explain_concept
Get a beginner-friendly explanation of an MCP concept.

Example concepts:
- tools
- resources
- prompts
- server
- client
- server_types
- frameworks
- clients

### show_example
Show a practical example of an MCP feature.

Example features:
- tool_call
- resource_read
- prompt_template

### list_servers
List available MCP servers by category.

Categories:
- browser
- cloud
- command_line
- communication
- customer_data
- database
- developer
- data_science
- filesystem
- finance
- knowledge
- location
- monitoring
- search
- travel
- version_control
- other

## Development

```bash
# Clone the repository
git clone https://github.com/qpd-v/mcp-guide.git
cd mcp-guide

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Interactive server installation from the server list
- [ ] More interactive examples and tutorials
- [ ] Enhanced server categorization and search