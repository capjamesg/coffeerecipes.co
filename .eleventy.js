module.exports = function(eleventyConfig) {
    eleventyConfig.addCollection("recipes", function(collection) {
        return collection.getFilteredByGlob("recipes/*.md").reverse();
    });

    eleventyConfig.addCollection("grinders", function(collection) {
        return collection.getFilteredByGlob("grinders/*.md").reverse();
    });

    eleventyConfig.addCollection("alphabetical", function(collection) {
        return collection.getAll().sort(function(a, b) {
            return a.url.localeCompare(b.url);
        });
    });
    eleventyConfig.addCollection("alphabetical_recipes", function(collection) {
        return collection.getFilteredByGlob("recipes/*.md").sort(function(a, b) {
            return a.url.localeCompare(b.url);
        });
    });
    
    eleventyConfig.addFilter("slice", function(array, start, end) {
        return array.slice(start, end);
    });
    
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("sw.js");
    eleventyConfig.addPassthroughCopy("robots.txt");
};