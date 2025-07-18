#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ComponentGenerator } from './dist/index.js';

class ClaudeMagicUIMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'claude-magic-ui',
        version: '1.0.0',
        description: 'Natural language UI component generator for Claude Code'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );
    
    this.generator = new ComponentGenerator();
    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generate-component',
            description: 'Generate UI components from natural language descriptions',
            inputSchema: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                  description: 'Natural language description of the component to generate'
                },
                framework: {
                  type: 'string',
                  enum: ['react', 'vue', 'svelte'],
                  description: 'Target framework (optional, will be auto-detected)'
                },
                styling: {
                  type: 'string',
                  enum: ['tailwind', 'css', 'styled-components'],
                  description: 'Styling system (optional, defaults to tailwind)'
                }
              },
              required: ['description']
            }
          },
          {
            name: 'list-components',
            description: 'List all available component types and their variants',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  enum: ['core', 'composite', 'layout'],
                  description: 'Filter by component category (optional)'
                }
              }
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      if (name === 'generate-component') {
        try {
          const result = await this.generator.quickGenerate(args.description);
          
          return {
            content: [
              {
                type: 'text',
                text: this.formatComponentResponse(result)
              }
            ]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error generating component: ${error.message}`
              }
            ],
            isError: true
          };
        }
      }
      
      if (name === 'list-components') {
        try {
          const components = this.generator.getAllComponents();
          const filtered = args.category 
            ? components.filter(c => c.category === args.category)
            : components;
            
          return {
            content: [
              {
                type: 'text',
                text: this.formatComponentList(filtered)
              }
            ]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error listing components: ${error.message}`
              }
            ],
            isError: true
          };
        }
      }
      
      throw new Error(`Unknown tool: ${name}`);
    });
  }

  formatComponentResponse(result) {
    const { variants, metadata, integrationInstructions } = result;
    
    let output = `# 🎨 Generated ${metadata.componentType} Component\n\n`;
    output += `**Framework**: ${metadata.framework} | **Styling**: ${metadata.styling}\n`;
    output += `**Features**: ${metadata.features.join(', ') || 'standard'}\n\n`;
    
    // Show all variants
    output += `## 🔧 ${variants.length} Variants Generated:\n\n`;
    variants.forEach((variant, index) => {
      output += `### ${index + 1}. ${variant.name}\n`;
      output += `*${variant.description}*\n\n`;
      output += `\`\`\`${metadata.framework === 'vue' ? 'vue' : metadata.framework === 'svelte' ? 'svelte' : 'typescript'}\n`;
      output += `${variant.code}\n`;
      output += `\`\`\`\n\n`;
    });
    
    // Integration instructions
    output += `## 📦 Integration Instructions:\n\n`;
    integrationInstructions.forEach((instruction, index) => {
      output += `${index + 1}. ${instruction}\n`;
    });
    
    return output;
  }

  formatComponentList(components) {
    let output = `# 📚 Available Components\n\n`;
    
    const categories = [...new Set(components.map(c => c.category))];
    
    categories.forEach(category => {
      const categoryComponents = components.filter(c => c.category === category);
      output += `## 🏗️ ${category.charAt(0).toUpperCase() + category.slice(1)} Components\n\n`;
      
      categoryComponents.forEach(component => {
        output += `### ${component.name}\n`;
        output += `*${component.description}*\n\n`;
        output += `**Keywords**: ${component.keywords.join(', ')}\n`;
        output += `**Frameworks**: ${component.frameworks.join(', ')}\n`;
        output += `**Variants**: ${component.variants.map(v => v.name).join(', ')}\n\n`;
      });
    });
    
    return output;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Claude Magic UI MCP Server started');
  }
}

// Start the server
const server = new ClaudeMagicUIMCPServer();
server.run().catch(console.error);