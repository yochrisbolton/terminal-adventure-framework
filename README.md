# Terminal Adventure Framework

A mini framework for the [https://itch.io/jam/textbased-jam](Text based terminal jam)

[https://replit.com/@yochrisbolton/text-game-jam](See it in action with an example story on replit)

## Getting started
By default it looks for a file called `start.txt` inside the `story/` top-level folder. From there you can create the entry to your story and link to pages (or `options`) using an easy-to-use syntax.

The framework supports two YAML-like directives, `[Text]` and `[Options]`.
- `[Options]` are the options that the player can choose
- and `[Text]` is what renders on screen before the options

**Note:** You can change the color of your text using color directives in the following format: `^{color_first_letter}`, ex `^yMy Text Here` will render the text `yellow`.

To see a full list of supported colors, see the `terminal kit` [https://github.com/cronvel/terminal-kit/blob/master/doc/low-level.md#ref.colors](documentation for colors)

An example page could look like the following:
```yaml
[Text]
^yYou try and climb a tree

^cThe branches snap under your weight, and you fall to the ground. Before you fall you see what looks like a trail ahead of you.

You are injured.

[Options]
Follow trail => forest/trail.txt
Wander somewhere else => forst/wander_deeper.txt
```
Which will render like the following:


