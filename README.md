# Vtechniq - The Vietnamese developer blog

### Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `yarn install`      | Installs dependencies                              |
| `yarn dev`          | Starts local dev server at `localhost:3000`        |
| `yarn build`        | Build your production site to `./dist/`            |
| `yarn preview`      | Preview your build locally, before deploying       |
| `yarn astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `yarn astro --help` | Get help using the Astro CLI                       |

## Integrations

### UnoCSS

In this theme, I'm using [UnoCSS](https://uno.antfu.me/) to generate the CSS. It's a utility-first CSS framework that uses a single class to style elements. It's very easy to use and has a lot of features. It's setup to be completely compatible with TailwindCSS, with the advantage of being able to use PureCSS icons. You can always switch out UnoCSS for TailwindCSS if you want to, without breaking the general styles.

### Sitemap

To generate the sitemap, you don't need to do anything. It's automatically generated when you build your site. You'll just need to switch out the `site` on `astro.config.mjs` to your own.

```js title="astro.config.mjs"
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
});
```

### RSS

The RSS feed is automatically generated from the Markdown files in the `src/content/blog` folder. You can ofcourse completely change this to your own needs.

The RSS will output to `https://example.com/feed.xml` by default. You can change this, by renaming `src/pages/feed.xml.js`.

### Image

## Components

### `components/blog/`

This directory contains all components for the blog.

### `components/errors/`

This directory contains all error components.

#### `components/errors/404.astro`

This component is used when a page is not found.

### `components/generic/`

This directory contains all generic components, reused over multiple pages.

### `components/home/`

This directory contains all components for the home page.

### `components/layout/`

This directory contains all layout components. For instance, the header and footer and `<head>` section.

### Colors

The theme has a few colors that you can use in the included components.

- red
- blue
- green
- yellow
- pink
- purple
- orange
- teal
- cyan
- lime
- emerald
- fuchsia
- violet
- rose
- sky
- amber

More colors can be added in `astro.config.mjs` in the `colors` array.

If you need more from this theme, don't hesitate to open an issue or reach out to me!
