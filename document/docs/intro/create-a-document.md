# How to create a new document

A document is a collection of pages connected through:

- Sidebar
- Previous/Next buttons

## Creating a document

To create a document, first create a new folder inside the docs folder.

Create a new .md file inside the newly created folder.

For example:

```md
# Hello

This is the first document written with **Docusaurus**!
The document can be accessed at <http://localhost:3000/docs/hello>.
```

## Adjusting the Sidebar

Add metadata to adjust the name and position displayed in the Sidebar:

```md
---

sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
Markdown
Documents in Docusaurus are written in markdown (.md or .mdx). You can refer to the GitHub Markdown for reference.
```

## Basic markdown syntax

### Heading

Use the # symbol to mark text as a heading.

```md
`#` is the largest heading of the document, and each document can only have one.
`##` is a smaller heading than `#`.
`###` is smaller than `##` and so on.
```

### Italic text

```md
Copy
Use *Italic text* to italicize text.
```

### Bold text

```md
Copy
Use **Bold text** to make text bold.
```

### Bold and italic text

```md
Copy
Use ***Bold and italic text*** to make text bold and italic.
```

### Link

```md
Copy
Use [Displayed text](URL) to create a link.
```

### Image

```md
Copy
Use ![Displayed text when the image is not loaded](Path to the image) to insert an image.
```

### Inline code

```md
Copy
Use backticks to mark text as inline code.
`console.log('Hello world')`
```

### Code block

``` md
Copy
Use triple backticks to mark text as a code block, and specify the language (e.g., jsx) to add syntax highlighting.

    ```jsx
    console.log('Hello world')
    console.log('Hi')
    ```
```
