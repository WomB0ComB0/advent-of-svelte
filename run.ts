(async () => {
  const $: typeof import('bun')['$'] = (await import('bun')).$;
  const args: typeof import('bun').argv = (await import('bun')).argv;

  const IGNORE_DIRS: string[] = ['node_modules', '.git', '.vscode'];
  const directories = (await $`ls -d */`).stdout.toString().split('\n').filter(dir => !IGNORE_DIRS.includes(dir.trim()));
  
  const days: Map<number, string> = directories.reduce((acc, dir) => {
    const [dayStr, ..._] = dir.trim().split('-');
    const day = parseInt(dayStr);
    if (!isNaN(day)) acc.set(day, dir.trim().replace(`${day}-`, ''));
    return acc;
  }, new Map<number, string>());

  const day = args[3] ? parseInt(args[3]) : Math.max(...days.keys());
  const topic = days.get(day);

  const choice = args[2] ?? 'build';

  if (choice === 'build') {
    await $`npx vite build ./${day}-${topic}`
      .then(res => console.log(res.stdout.toString()))
      .catch(err => console.error('Error during build or preview:', err));
  } else if (choice === 'preview') {
    await $`npx vite build ./${day}-${topic}`
      .then(res => {
        console.log(res.stdout.toString());
        return $`npx vite preview ./${day}-${topic}`;
      })
      .catch(err => console.error('Error during preview:', err));
  } else if (choice === 'dev') {
    await $`npx vite dev ./${day}-${topic}`
      .then(res => console.log(res.stdout.toString()))
      .catch(err => console.error('Error during dev:', err));
  } else {
    console.error(`Invalid choice: ${choice}`);
  }
})();