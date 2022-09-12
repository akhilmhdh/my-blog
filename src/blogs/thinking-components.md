---
title: Thinking Components
description: What are components in a UI? Dumb Components? Why even bother about components?
date: 2022-09-12
updatedOn: 09/12/2022
cover:
  image: /assets/blogs/thinking-components/cover.jpg
  caption: Photo by <a href="https://unsplash.com/@glencarrie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Glen Carrie</a> on <a href="https://unsplash.com/s/photos/lego-block?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
tags: frontend
---

From Server Side Rendering to a new architecture paradigm like micro frontend and island architecture, frontend web development is having quite a bull run. Indeed these advancement solves numerous problems but also end up adding complexity. Above all, a big learning curve to getting to know all these tools.

When AngularJS was introduced in 2010, one of the reasons it became mainstream was the ability to composite websites into independent components. The composition of a website into multiple elements has been a core principle for all UI frameworks. Thus every frontend developer must be able to analyze a design and decide how to separate it.

Let's take a step back for all the developers taking their baby steps in web development and getting one of our fundamentals better. That is Thinking Components.

## Types of components

UI components are like building blocks or elements for your user interface. You can think of them as Legos. [HTML specs](https://html.spec.whatwg.org) give you foundational pieces like input elements that you can extend, customize or group to build more interactive ones.

Why bother about these in your development?

Well, you should, because thinking from the component's perspective helps you

- Speedy development
- Favor reusability
- Minimal effort across the team

> Another reminder I would like to add is, don't overthink components. It will end up eating a lot of your time. The below section also addresses one way properly to think it out.

Some of the most typical components in a webpage are:

![various types of components](/assets/blogs/thinking-components/components.png)

1. Dumb Components
2. Containers
3. Layout
4. Page

### Dumb Components

Let me guess. The first thing that popped up in your mind was why it's called as dumb.
It means the component doesn't care about where the data is or how data comes into it. They are the building blocks of a website. If it gets its data, it renders accordingly. That's it.

So dumb components or pure components are like pure functions. For a given input, it always renders expectedly. It only cares about the UI. Everyone who is in front-end development must be familiar with UI Frameworks. A UI Framework is just a collection of a lot of these dummies.

Dumb components tend to be easy to test and reusable. They make your development process a breeze. A project should always start with the implementation of these types. Never put business logic into it. It makes them unpredictable and complex to reuse.

Some of the dumb components in a design start with foundational elements like

- Form Elements like Input, Checkbox, etc
- Buttons

To more complex ones like

- Accordion
- Tabs
- Pagination

## Containers

Container components are the ones that group multiple dumb ones with business logic. Now, this may confuse the readers because they could be dumb components. You're right, but what differentiates between them is the business logic part. They are reusable elements like a widget encapsulating its business logic so we can apply it anywhere we want.

Here are some examples of container components to help you to get an understanding

1. List components

It could be a blog list, a comment list, or a book list. Whatever the list is, it may be used in your project in multiple ways and pages, like recent ones, popular ones, lowest ones, etc. We can build this as a container component that takes the data as parameters on how the list should be and gets rendered. In a non-container world, we would end up writing the data fetch logic in all places.

2. An eCommerce cart component

If you think about it, an e-commerce cart is pretty complex. It involves numerous types of operations in it.

Some of them are:

- Updating the list when new ones get added
- Showing status of the number of total items
- Warning if one gets out of stock
- Ability to remove an item
- And lot more

> Most of the time, container components are specific to a project. Outside a project, they are meaningless or non-usable.

### Layouts

A layout is an arrangement of components. Every website has a layout. Let's take an example and consider the below website.

This website layout contains

1. Header / Navbar
2. Footer
3. Main Content
4. Sidebar

Now, if you think about it, when your designer gives a set of pages, most of the time, except for the main content, everything else will remain the same. That means the layout component should contain those static ones like the header and footer and wrap the dynamic ones. Another advantage of thinking of layout is that. You have decided to change the header style or even add another nav. Without the layout, you would have to make the change everywhere. With the layout, all you need to care about is the scope of the layout component.

> Remember, an application can have more than one layout. A layout before the user logs in and after login like a dashboard.

### Pages

The page component contains all the elements of a webpage. Simply stating all the individual webpages are each page component.

But why does it have a particular section? Now we know about the different components of a website, but where does everyone meet?

The page component fills in the missing link. It's like a global container component with a single role of positioning other elements and filling the required data. All the business logic for a page happens here.

Some of the things happening on a page are:

- Fetching data from a server
- Handling modals
- Passing data from one component to another

> If your dumb/container components are required only on a page, keep them close to that page. Avoid putting it in your project's shared folder for UI.
>
> It will cause two problems.
>
> 1. Too many components in the shared folder causes a nightmare to manage.
> 2. Harder to find page-specific components
>    You can always put it back in a shared folder if you want to use it on multiple pages.

## How to organize them

Let's learn how to approach and split our design into various components without taking time.

Consider this blog page you are reading, take your time and identify some of the elements you can find.

The layout contains

1. Navbar
2. Footer
3. Tag Section
4. Sidebar anchor section and social media

Some of the dumb components are

1. Heading
2. Buttons

Here are some tips to help you split components.

- The most important thing to consider before implementing any component is **how it gets used**. It will help you remove unnecessary dependencies.
- Follow KIS principle: **Keep It Simple**
- Identify all typical dumb components like buttons, input elements, sliders, etc. If you want an easy reference, refer to any UI framework.
- Keep pages separately.
- Follow [Co-Location.](https://kentcdodds.com/blog/colocation)
- When you are confused about whether a component needs to be in the global components, keep it as a separate file near your page first. It can be moved to the global component's directory when another page needs it.
- The same principle is used for building containers. When you feel you are copy-pasting the same components and logic again, that's your clue.
- An application can have more than one layout. But try to keep it as minimum as possible.

A possible scenario is when a project uses a form handling library. Even the form dependencies get abstracted into the form's dumb components. The issue with this approach is now your components are not free to use. They depend on a library. Consider when you need to use it without the library, which ends up as another element. It's better to avoid this kind of dependencies when building dumb ones. Keep them dumb.
