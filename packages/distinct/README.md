# distinct

A small TypeScript utility library for removing duplicates from arrays. It includes a docs site and a published package.

## Package

`distinct` exports two helpers:

- `distinct(arr)` removes duplicates from an array using deep equality for objects and arrays.
- `distinctBy(arr, keyFn)` removes duplicates based on a derived key, also using deep equality for complex keys.

```ts
import { distinct, distinctBy } from 'distinct';

const numbers = distinct([1, 2, 2, 3, 1]);
// [1, 2, 3]

const users = distinct([{ id: 1 }, { id: 2 }, { id: 1 }]);
// [{ id: 1 }, { id: 2 }]

const byId = distinctBy(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Charlie' },
  ],
  (user) => user.id,
);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

## Repository layout

- `packages/distinct` library source and tests
- `docs` documentation site (Next.js)

## Setup

This repo uses Bun workspaces.

```bash
bun install
```

## Common scripts

Run from the repo root:

```bash
bun run dev
bun run build:all
bun run test
bun run biome
```

Package-only commands:

```bash
bun run --cwd packages/distinct build
bun run --cwd packages/distinct test
```

Docs site:

```bash
bun run --cwd docs dev
```

## License

MIT
