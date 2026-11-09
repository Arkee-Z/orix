---
kind: article
lang: en
title: "A Blog Engine in Three Hundred Lines"
date: 2026-09-27
summary: "Deno, SQLite, and a publishing pipeline small enough to read in one sitting. What happens when you stop renting your own website."
tags: ["Engineering", "Deno"]
minutes: 8
---

This site is a terminal-native experiment. I write a Markdown file, run one command, and a page appears. There is no admin panel, no plugin marketplace, no database migration I did not write myself. The whole thing fits in three hundred lines, and I can read all of it before breakfast.

That is the entire feature list, and I would like to defend it.

## The shape of the thing

The engine is a Deno program with two dependencies: a Markdown renderer and `node:sqlite`. It walks a folder, parses the front matter, rewrites a small SQLite table, and exits. Nothing runs between builds. There is no process to keep alive, no cache to invalidate in the dark.

```ts
const db = new Database("blog.db");
db.exec(`CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  published_at TEXT NOT NULL
)`);

const insert = db.prepare(
  "INSERT OR REPLACE INTO posts VALUES (?, ?, ?, ?)"
);

for (const file of walk("./writing")) {
  const { slug, title, body, date } = parse(file);
  insert.run(slug, title, body, date.toISOString());
}
```

The renderer reads from SQLite at request time. Publishing is a build step; reading is a query. Both are boring in the way infrastructure should be boring.

## What I gave up

Plenty. There is no comment section, no analytics dashboard, no automatic social card. Search is a `LIKE` clause I will regret in a year. If I stop writing for two months, the site still works; if I stop maintaining it for two years, the database is still a file I can open with any tool ever written.

That last point is the quiet argument. Every hosted publishing platform is a wager that the company outlives your writing. A folder of Markdown and a SQLite file is a wager that text outlives software. I know which bet I prefer.

## The publish loop

The command is one word long. It rebuilds, runs the tests, prints a receipt, and asks nothing else of me. The receipt matters more than it should — it turns publishing into a small ceremony with a beginning and an end, instead of an endless tab that is never quite saved.

A blog should feel like a printing press, not a treadmill. Mine does now.
