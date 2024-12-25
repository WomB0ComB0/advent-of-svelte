# Day 12: custom type transport in SvelteKit

A load function that runs on the server in your SvelteKit app isn’t restricted to returning things that can be serialized as JSON. You can return Maps, Sets, Dates, objects with cyclical references, even Promises, and SvelteKit will handle the serialization on the server and deserialization in the browser.
