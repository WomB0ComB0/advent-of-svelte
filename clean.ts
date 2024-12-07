(async () => {
  const fs: typeof import('fs') = await import('fs');
  const IGNORE_DIRS: string[] = ['node_modules', '.git', '.vscode'];

  try {
    const directories = (await fs.promises.readdir(process.cwd(), { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory() && !IGNORE_DIRS.includes(dirent.name))
      .map(dirent => dirent.name);

    if (directories.length === 0) {
      console.log('No directories to remove.');
      return;
    }

    console.log('Directories to be removed:', directories);

    for (const dir of directories) {
      await fs.promises.rm(dir, { recursive: true, force: true });
      console.log(`Removed directory: ${dir}`);
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
})();