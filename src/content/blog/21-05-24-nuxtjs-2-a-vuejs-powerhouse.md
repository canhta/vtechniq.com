---
title: 'Building a Medium.com Clone with Nuxt.js 2'
pubDate: 05/21/2024 20:00
author: 'Canh Ta'
tags:
  - NuxtJs
  - Frontend Development
imgUrl: '../../assets/posts/scrum_master.png'
description: 'Clone medium.com using Nuxt.js, a powerful Vue.js framework'
layout: '../../layouts/BlogPost.astro'
---

# Building a Medium.com Clone with Nuxt.js 2: A Comprehensive Guide

Are you ready to create your own streamlined blogging platform inspired by the elegant simplicity of Medium.com? With Nuxt.js 2, a powerful Vue.js framework, we can achieve this goal. In this guide, we'll not only cover building the front-end but also delve into authentication, data validation, error handling, API integration, and security considerations.

### Prerequisites

- Node.js and npm (or yarn) installed
- A basic understanding of Vue.js concepts
- Your own Medium.com-like API set up and ready to use

### Why Nuxt.js for Your Medium Clone?

Nuxt.js makes building server-rendered Vue.js apps a breeze. Here's why it's perfect for this project:

- **SEO-Friendly:** Nuxt.js helps your blog posts get found by search engines through server-side rendering (SSR), which delivers pre-rendered HTML to search engine crawlers, improving indexing and visibility.
- **Performance:** SSR speeds up initial page loads, providing a better user experience. Nuxt.js also offers features like automatic code splitting to optimize page load times further.
- **Developer Experience:** Nuxt.js offers conventions, automatic routing, and other tools that streamline development, allowing you to focus on building your app's features rather than boilerplate code.

## Nuxt.js 2 - Key Concepts

### Server-Side Rendering (SSR)

At its core, Nuxt.js excels in SSR. When a user requests a page, Nuxt.js generates the HTML on the server, incorporating all the necessary data from your API. This fully rendered HTML is then sent to the browser, resulting in:

- **Faster Perceived Load Time:** The initial page appears quickly, even before JavaScript fully executes, giving the user something to look at immediately.
- **Better SEO:** Search engines can easily crawl and index the content because it's already present in the HTML.

### Data Fetching Strategies

Nuxt.js offers two primary methods for fetching data:

1.  **`asyncData`:** (Nuxt 2 specific) This method is called before the component is created. It runs on both the server (during SSR) and the client (during navigation). The data returned here becomes part of the component's initial state.

2.  **`fetch`:** (Nuxt 2 and 3) This method runs only on the client-side and is primarily used to fetch data that updates after the initial page load.

### Routing and Navigation

Nuxt.js uses file-based routing, making it incredibly intuitive. Each `.vue` file in your `pages` directory automatically corresponds to a route. For example:

- `pages/index.vue` becomes the home page (`/`).
- `pages/about.vue` becomes the about page (`/about`).
- `pages/article/_slug.vue` becomes a dynamic route for individual articles (`/article/:slug`).

### Middleware

Middleware functions are executed before a page is rendered. You can use them for various purposes:

- **Authentication:** Check if a user is logged in before accessing protected pages.
- **Data Fetching:** Fetch global data needed on multiple pages.
- **Redirection:** Redirect users based on certain conditions.

### Layouts

Layouts provide the structural foundation for your application. The `default.vue` layout is the standard wrapper for all your pages. You can also create custom layouts for specific sections of your site.

### Plugins

Plugins extend Nuxt.js functionality by adding custom features or integrating third-party libraries. You can use plugins to:

- Add global components.
- Configure libraries like Axios for making API calls.
- Set up Vuex for state management.

### Modules

Modules are pre-packaged building blocks that add powerful features to your Nuxt.js project. Some popular modules include:

- **@nuxtjs/axios:** Simplifies making API requests.
- **@nuxtjs/pwa:** Transforms your site into a Progressive Web App.
- **@nuxt/content:** Provides a powerful content management system.

- Node.js and npm (or yarn) installed
- A basic understanding of Vue.js concepts
- Your own Medium.com-like API set up and ready to use

## Setting Up Your Blog App

### Create the Project:

```bash
npx create-nuxt-app my-medium-clone
```

Follow the prompts and select your preferences (e.g., use JavaScript, linting, etc.).

### Project Structure

```md
my-medium-clone
├── assets/
├── components/
│ ├── Article.vue
│ ├── Feed.vue
│ ├── UserProfile.vue
│ ├── PostEditor.vue
│ └── PostList.vue
├── layouts/
│ └── default.vue
├── pages/
│ ├── index.vue
│ ├── user/\_username.vue
│ └── post/\_slug.vue
├── nuxt.config.js
└── package.json
```

### Start the Development Server:

```bash
cd my-medium-clone
npm run dev
```

Open your browser to `http://localhost:3000` to see the default Nuxt.js page.

Explanation:

- `user/_username.vue` : Dynamic page for user profiles.
- `post/_slug.vue` : Dynamic page for individual posts.

## Building Your Key Components

### 1. The Article Component (`components/Article.vue`)

```vue
<template>
  <article class="article">
    <NuxtLink :to="`/article/${article.slug}`">
      <h2>{{ article.title }}</h2>
    </NuxtLink>
    <p class="article-meta">
      Published on {{ formattedDate(article.publishedAt) }} by
      {{ article.author }}
    </p>
    <div class="article-content" v-html="article.content"></div>
  </article>
</template>

<script>
// ... (component logic for date formatting and markdown parsing)
</script>
```

### 2. The Feed Component (`components/Feed.vue`)

```vue
<template>
  <div class="feed">
    <Article v-for="article in articles" :key="article.id" :article="article" />
  </div>
</template>

<script>
// ... (component logic for fetching articles)
</script>
```

### 3. User Profile (`components/UserProfile.vue`)

```vue
<template>
  </div>
</template>

<script>
export default {
 // ... (component logic for fetching user and their posts)
};
</script>
```

**Explanation:**

- Fetches user data (name, bio, avatar) and their posts (if `showPosts` is true).
- Displays the user's profile information and optionally their list of posts.

### 4. Create/Edit Post (`components/PostEditor.vue`)

```vue
<template>
  <form @submit.prevent="submitPost"></form>
</template>

<script>
export default {
  // ... (component logic for form submission)
};
</script>
```

**Explanation:**

- Provides a form with input fields for title and content.
- Handles form submission, sending the data to the API for post creation or updating.

### 5. Post List (`components/PostList.vue`)

```vue
<template>
  <ul>
    <li v-for="post in posts" :key="post.id"></li>
  </ul>
</template>

<script>
export default {
  // ... (component logic for fetching and managing posts)
};
</script>
```

**Explanation:**

- Displays a list of posts with links, edit, and delete buttons.
- Triggers functions to handle editing and deleting when the respective buttons are clicked.

### 6. The Header and Footer (`layouts/default.vue`)

```vue
<template>
  <div>
    <header></header>
    <Nuxt />
    <footer></footer>
  </div>
</template>
```

## Page Implementations

Let's explore how we can use the components we've built within the structure of our Nuxt.js pages.

### 1. Home Page (`pages/index.vue`)

```vue
<template>
  <div>
    <h1>My Medium Clone</h1>
    <Feed :articles="articles" />
  </div>
</template>

<script>
import Feed from '~/components/Feed.vue';

export default {
  components: { Feed },
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/articles');
      return { articles: data };
    } catch (error) {
      console.error('Error fetching articles:', error);
      return { articles: [] };
    }
  },
};
</script>
```

**Explanation:**

- This page acts as the landing page for your blog.
- It fetches a list of articles using `asyncData` and passes them to the `Feed` component for display.

### 2. User Profile Page (`pages/user/_username.vue`)

```vue
<template>
  <div>
    <UserProfile :user="user" :showPosts="true" />
  </div>
</template>

<script>
import UserProfile from '~/components/UserProfile.vue';

export default {
  components: { UserProfile },
  async asyncData({ $axios, params }) {
    const username = params.username;
    try {
      const { data } = await $axios.get(`/api/users/${username}`);
      return { user: data };
    } catch (error) {
      console.error('Error fetching user:', error);
      // Handle the error (e.g., redirect to 404 page)
    }
  },
};
</script>
```

**Explanation:**

- This is a dynamic page that displays the profile of a user based on their username.
- It fetches user data (including their posts) using `asyncData` and the `username` parameter from the route.
- It then passes the `user` data to the `UserProfile` component to render the profile.

### 3. Individual Post Page (`pages/post/_slug.vue`)

```vue
<template>
  <div>
    <Article :article="article" />
    <div v-if="isAuthenticated">
      <button @click="editPost">Edit</button>
      <button @click="deletePost">Delete</button>
    </div>
    <comments-section :article-id="article.id" />
  </div>
</template>

<script>
import Article from '~/components/Article.vue';
//import CommentsSection from '~/components/CommentsSection.vue'

export default {
  components: { Article },
  async asyncData({ $axios, params }) {
    // ... (logic to fetch the article based on the slug)
  },
  computed: {
    isAuthenticated() {
      // Logic to determine if the user is authenticated (e.g., using a Vuex store)
    },
  },
};
</script>
```

**Explanation:**

- This dynamic page displays a single article based on its slug.
- It fetches article data using `asyncData` and the `slug` parameter.
- It renders the `Article` component to display the article content.
- It optionally shows edit/delete buttons if the user is the author of the article (you'll need authentication for this).
- You could also add a comment section using a separate component (`CommentsSection` in the example) to enable reader interaction.

Absolutely! Here's the continued section of the blog post, focusing on authentication, data validation, error handling, API integration, and security considerations:

## Authentication and Authorization

To implement features like creating and editing posts, you'll need to authenticate your users. You have several options for this:

- **Nuxt.js Auth Module:** This module simplifies the integration of authentication providers like Auth0, Firebase, or your own custom solution. It handles login/logout flows, token management, and route protection.
- **Custom Authentication:** You can build your own authentication logic using middleware, Vuex, and your API. This gives you more flexibility but requires more work.

Here's a simplified example of how you might protect a route using middleware (assuming you're using a module like `@nuxtjs/auth`):

```javascript
// middleware/auth.js
export default function ({ store, redirect }) {
  if (!store.state.auth.loggedIn) {
    return redirect('/login'); // Redirect to login if not authenticated
  }
}
```

Then, in your page component (e.g., `pages/post/new.vue`):

```vue
<script>
export default {
  middleware: 'auth',
};
</script>
```

## Data Validation and Error Handling

Always validate user input before sending it to your API. This helps prevent errors and ensures data integrity. You can use a library like VeeValidate or implement your own validation logic in your Vue components.

Here's an example of simple validation in the `PostEditor` component:

```vue
<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      errors: {},
    };
  },
  methods: {
    async submitPost() {
      this.errors = {}; // Clear previous errors
      if (!this.title.trim()) {
        this.errors.title = 'Title is required';
      }
      if (!this.content.trim()) {
        this.errors.content = 'Content is required';
      }

      if (Object.keys(this.errors).length === 0) {
        // Submit data to API if no errors
        await this.$axios.post('/api/posts', {
          title: this.title,
          content: this.content,
        });
        // ... (handle success, redirect, etc.)
      }
    },
  },
};
</script>
```

Additionally, handle errors that may occur during API requests gracefully by displaying user-friendly error messages or fallback content.

## API Integration

Ensure you have well-defined API endpoints for handling CRUD operations on users and posts. Here's an example of what your API routes might look like:

- `GET /api/articles`: Get all articles
- `GET /api/articles/:slug`: Get a single article
- `POST /api/articles`: Create a new article (requires authentication)
- `PUT /api/articles/:id`: Update an existing article (requires authentication)
- `DELETE /api/articles/:id`: Delete an article (requires authentication)

- `GET /api/users/:username`: Get user profile
- `POST /api/users`: Create a new user (for registration)
- `PUT /api/users/:id`: Update user profile (requires authentication)

## Security

Protecting your blog is crucial. Here are some important security considerations:

- **Input Sanitization:** Always sanitize user input to prevent cross-site scripting (XSS) attacks.
- **Authentication and Authorization:** Secure sensitive endpoints using authentication and authorization mechanisms.
- **CSRF Protection:** Implement CSRF (Cross-Site Request Forgery) protection to prevent unauthorized actions on behalf of the user.

## Conclusion

By adding user profiles and CRUD functionality, you've significantly enhanced the capabilities of your Medium.com clone. With these features in place, you have a solid foundation for a fully functional blogging platform. Don't hesitate to customize it further, explore additional Nuxt.js modules, and make it uniquely yours!
