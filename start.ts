import { $ } from "bun";
import * as cheerio from "cheerio";
import { spawn } from "child_process";
import { mkdirSync } from 'fs';

const fetchAndParse = async () => {
  const response = await fetch("https://svelte.dev/blog/advent-of-svelte");
  const html = await response.text();
  return cheerio.load(html);
};

const getCurrentDay = () => {
  const now = new Date();
  const isDecember = now.getMonth() === 11;
  const currentDay = now.getDate();

  // If not December, return 25 to fetch all days
  if (!isDecember) {
    return 25;
  }

  return currentDay;
};

const createSvelteProject = async (day: number, topic: string) => {
  const sanitizedTopic = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const projectName = `${day}-${sanitizedTopic}`;

  try {
    console.log(`Creating project: ${projectName}`);
    mkdirSync(projectName, { recursive: true });

    for (const dir of [projectName]) {
      await new Promise((resolve, reject) => {
        const npmProcess = spawn('npm', ['create', 'vite@latest', dir, '--', '--template', 'svelte-ts', '--no-interactive']);
        npmProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(`npm process exited with code ${code}`));
          } else {
            resolve(void 0);
          }
        });
      });

      await new Promise((resolve, reject) => {
        const bunProcess = spawn('bun', ['install'], { stdio: 'inherit', cwd: dir });
        bunProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(`bun process exited with code ${code}`));
          } else {
            resolve(void 0);
          }
        });
        bunProcess.on('error', (err) => {
          console.error(`Error with bun process: ${err.message}`);
          reject(err);
        });
      });

      console.log(`✅ Created project: ${dir}`);
    }
  } catch (error) {
    console.error(`❌ Failed to create project ${projectName}:`, error);
  }
};

const main = async () => {
  const $ = await fetchAndParse();
  const maxDay = getCurrentDay();

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

    createSvelteProject(day, topic);
  });
};

main().catch(console.error);
