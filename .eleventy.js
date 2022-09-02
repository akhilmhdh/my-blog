const { minify } = require('terser');
const CleanCSS = require('clean-css');
const markdownIt = require('markdown-it');
const dayjs = require('dayjs');
const fs = require('fs');
const markdownItAnchor = require('markdown-it-anchor');

const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/css/blog.css');
  eleventyConfig.addPassthroughCopy('./src/css/animations.css');
  eleventyConfig.addPassthroughCopy({
    'node_modules/medium-zoom/dist/medium-zoom.min.js':
      '/js/medium-zoom.min.js',
  });

  eleventyConfig.addWatchTarget('./src/css/');

  eleventyConfig.addCollection('blogs', function (collection) {
    return collection.getFilteredByGlob('./src/blogs/**/*.md');
  });

  eleventyConfig.addNunjucksGlobal('blogTags', function (collection) {
    return Object.keys(collection)
      .sort()
      .filter((key) => key !== 'all' && key !== 'blogs');
  });

  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk');
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  function sentenceCase(sentence) {
    return (
      sentence.charAt(0).toUpperCase() + sentence.substring(1).toLowerCase()
    );
  }

  eleventyConfig.addShortcode('blogIndex', function () {
    const mdFile = fs.readFileSync(this.ctx.page.inputPath, 'utf-8');
    let i = 0;
    const slugify = eleventyConfig.getFilter('slugify');

    const blogIndexArr = [];

    while (i < mdFile.length - 2) {
      // find all by matching h2 tag in markdown
      // ## Title
      if (mdFile.substring(i, i + 4) === '\n## ') {
        // start of index will be after the pattern i+4
        const startOfHeadingIndex = i + 4;
        let endOfHeadingIndex = i;

        for (start = startOfHeadingIndex; start < mdFile.length; start++) {
          endOfHeadingIndex = start;
          if (mdFile[start] === '\n') {
            i = start;
            break;
          }
        }

        const heading = mdFile.substring(
          startOfHeadingIndex,
          endOfHeadingIndex
        );
        blogIndexArr.push({
          title: sentenceCase(heading),
          slug: slugify(heading),
        });
      }
      i++;
    }

    return `<ul id="blog-index">${blogIndexArr
      .map(
        ({ title, slug }) =>
          `<li class="hover:text-primary transition-all"><a href="#${slug}">${title}</a></li>`
      )
      .join('\n')}</ul>`;
  });

  const markdownLibrary = markdownIt({
    html: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'before',
      class: 'direct-link',
      symbol: `
      <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
      `,
    }),
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter('slugify'),
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // js minification filter
  eleventyConfig.addNunjucksAsyncFilter(
    'jsmin',
    async function (code, callback) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error('Terser error: ', err);
        // Fail gracefully.
        callback(null, code);
      }
    }
  );

  // css minificataion filter
  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('formatDate', (dateObj) => {
    return dayjs(dateObj).format('DD MMM YYYY');
  });

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
