---
kind: essay
lang: en
title: "Rust, Read Slowly"
date: 2026-08-30
summary: "Ownership is a reading discipline before it is a memory model. Notes from a year of letting the compiler finish a sentence."
tags: ["Rust", "Notes"]
minutes: 7
---

The first thing I learned about Rust was not how to write it. It was how to read an error message all the way to the end. That sounds like a small skill. It rebuilt the way I think about data.

The borrow checker is not an obstacle course. It is an editor with strong opinions, standing behind you, pointing at the sentence that does not mean what you hoped it meant.

## The sentence the compiler finishes

Consider this, the oldest example in the language:

```rust
let names = vec!["ada", "grace", "barbara"];

let first = &names[0];
names.push("margaret");

println!("{first}");
```

A garbage-collected language would let this run and quietly reallocate the vector underneath `first`. Rust refuses, and the refusal is the point: the program said two things at once that cannot both be true. The error does not complain about syntax. It explains a contradiction in the design.

Learning to read that explanation is most of the learning curve. The rest is naming things well enough that the explanation stays short.

## Ownership as documentation

The older I get, the more I care about code that can be read by someone who was not there. Types help. Ownership helps more, because it answers a question callers actually have: *who is responsible for this value when I am done with it?*

In most languages that answer lives in a comment, a wiki page, or the memory of a person who left the company. In Rust it is part of the signature. The compiler checks the documentation. That is a strange and excellent property.

## What I still do wrong

I reach for `clone()` when I am tired. I write lifetimes before I have understood the borrowed thing. I treat `unwrap()` as a form of optimism and then am surprised when the system agrees with me.

The fix is not more cleverness. It is the same fix as with prose: slow down, read the whole sentence, and only then decide what comes next.

Rust has made me a slower programmer. I have not yet found the downside.
