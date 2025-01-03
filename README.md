# Advent of Svelte

## Running the Project

To run the Advent of Svelte project, follow these steps:

### 1. Install Dependencies

Ensure all necessary dependencies are installed by running:

```bash
bun install
```

### 2. Build the Project

Before running or previewing, build the project using:

```bash
bun run start
```

### 3. Preview a Specific Day's Project

To preview a specific day's project, use the `run.ts` script with the `preview` option. Replace `<day_number>` with the desired day number:

```bash
bun run run preview <day_number>
```

This command will build and then preview the project for the specified day.

### 4. Development Mode

To run the project in development mode, use the `dev` option:

```bash
bun run run dev <day_number>
```

This will start the development server for the specified day's project, allowing you to make and see changes in real-time.

### Notes

- Ensure that the `dist` directory is generated by the build process before attempting to preview.
- The `run.ts` script handles both building and previewing, so ensure the correct options are used.
