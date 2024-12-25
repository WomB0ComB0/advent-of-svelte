import { $ } from "bun";
import * as cheerio from "cheerio";
import { spawn } from "child_process";
import { mkdirSync, writeFileSync } from 'fs';
import { existsSync } from 'fs';
import { join } from 'path';
import type { CheerioAPI } from 'cheerio';

interface ProjectConfig {
  day: number;
  topic: string;
  description: string;
}

// Constants
const BLOG_URL = "https://svelte.dev/blog/advent-of-svelte";
const MAX_CONCURRENT_PROJECTS = 3;

// Fetch and parse the blog content
const fetchAndParse = async (): Promise<CheerioAPI> => {
  try {
    const response = await fetch(BLOG_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
    }
    const html = await response.text();
    return cheerio.load(html);
  } catch (error) {
    throw new Error(`Failed to fetch and parse blog: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Get the current day in December or 25 if not December
const getCurrentDay = (): number => {
  const now = new Date();
  return now.getMonth() === 11 ? now.getDate() : 25;
};

// Create a standardized project name
const createProjectName = (day: number, topic: string): string => {
  return `${day}-${topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')}`;
};

// Execute a command in a specific directory
const executeCommand = async (
  command: string,
  args: string[],
  cwd: string,
  silent = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { 
      stdio: silent ? 'ignore' : 'inherit', 
      cwd 
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "${command} ${args.join(' ')}" failed with code ${code}`));
      }
    });

    process.on('error', reject);
  });
};

// Set up additional project configuration
const setupProjectConfig = (projectDir: string, config: ProjectConfig): void => {
  const readmeContent = `# Day ${config.day}: ${config.topic}\n\n${config.description}\n`;
  writeFileSync(join(projectDir, 'README.md'), readmeContent);

  // Create a basic test setup
  const testDir = join(projectDir, 'src', 'tests');
  mkdirSync(testDir, { recursive: true });
  writeFileSync(
    join(testDir, 'basic.test.ts'),
    `import { describe, it, expect } from 'vitest';\n\ndescribe('Basic test', () => {\n  it('should pass', () => {\n    expect(true).toBe(true);\n  });\n});\n`
  );
};

// Create a single Svelte project
const createSvelteProject = async (config: ProjectConfig): Promise<void> => {
  const projectName = createProjectName(config.day, config.topic);

  try {
    if (existsSync(projectName)) {
      console.log(`⏭️  Skipping existing project: ${projectName}`);
      return;
    }

    console.log(`🚀 Creating project: ${projectName}`);
    mkdirSync(projectName, { recursive: true });

    // Create project using Vite
    await executeCommand('npm', [
      'create',
      'vite@latest',
      projectName,
      '--template',
      'svelte-ts',
      '--no-interactive'
    ], process.cwd(), true);

    // Install dependencies
    await executeCommand('bun', ['install'], projectName);

    // Install development dependencies
    await executeCommand('bun', [
      'add',
      '-d',
      'vitest',
      '@testing-library/svelte',
      'jsdom'
    ], projectName);

    // Set up project configuration
    setupProjectConfig(projectName, config);

    console.log(`✅ Successfully created project: ${projectName}`);
  } catch (error) {
    console.error(`❌ Failed to create project ${projectName}:`, 
      error instanceof Error ? error.message : 'Unknown error'
    );
    throw error;
  }
};

// Parse the blog content and extract project configurations
const parseProjectConfigs = ($: CheerioAPI, maxDay: number): ProjectConfig[] => {
  const configs: ProjectConfig[] = [];

  $('h2').each((_, element) => {
    const titleText = $(element).find('span').first().text();
    if (!titleText.startsWith('Day')) return;

    const dayMatch = titleText.match(/Day (\d+):/);
    if (!dayMatch) return;

    const day = parseInt(dayMatch[1]);
    if (day > maxDay) return;

    const topic = titleText.replace(/Day \d+: /, '').trim();
    if (topic === '') return;

    const nextParagraph = $(element).next('p');
    if (nextParagraph.text().includes('Coming soon')) return;

    configs.push({
      day,
      topic,
      description: nextParagraph.text().trim()
    });
  });

  return configs;
};

// Process projects in batches
const processBatch = async (configs: ProjectConfig[]): Promise<void> => {
  for (let i = 0; i < configs.length; i += MAX_CONCURRENT_PROJECTS) {
    const batch = configs.slice(i, i + MAX_CONCURRENT_PROJECTS);
    await Promise.all(batch.map(config => createSvelteProject(config)));
  }
};

// Main execution function
const main = async (): Promise<void> => {
  console.log('🎄 Starting Advent of Svelte project generator...');
  
  try {
    const $ = await fetchAndParse();
    const maxDay = getCurrentDay();
    const configs = parseProjectConfigs($, maxDay);

    if (configs.length === 0) {
      console.log('No projects to create.');
      return;
    }

    console.log(`Found ${configs.length} projects to create`);
    await processBatch(configs);
    
    console.log('🎉 All projects created successfully!');
  } catch (error) {
    console.error('❌ Failed to complete project generation:', 
      error instanceof Error ? error.message : 'Unknown error'
    );
    process.exit(1);
  }
};

if (import.meta.main) {
  main().catch(console.error);
}