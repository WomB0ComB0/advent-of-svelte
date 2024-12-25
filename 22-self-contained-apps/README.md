# Day 22: self-contained apps

Following the introduction of the bundleStrategy option on day 19, and hash-based routing yesterday, we now have the ability to generate fully self-contained apps with the bundleStrategy: 'inline' option. Together with Vite’s assetsInlineLimit option, it’s possible to put an entire SvelteKit app — code, styles, fonts, images, audio and everything else — inside a single .html file that you can share with people on a floppy disk.
