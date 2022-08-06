const { minify } = require('terser');
const CleanCSS = require('clean-css');
const markdownIt = require('markdown-it');
const dayjs = require('dayjs');
const markdownItAnchor = require('markdown-it-anchor');

const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets');

  eleventyConfig.addCollection('blogs', function (collection) {
    return collection.getFilteredByGlob('./src/blogs/**/*.md');
  });

  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk');
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  const markdownLibrary = markdownIt({
    html: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'after',
      class: 'direct-link',
      symbol: '#',
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
    return dayjs(dateObj).format('DD MMMM YYYY');
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
