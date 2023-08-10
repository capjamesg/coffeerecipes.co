const fs = require('fs');
const front_matter = require('front-matter');

// load all grinders/*.md
const grinders = fs.readdirSync('grinders').map(file => {
    return {
        name: file.replace('.md', ''),
        file: file
    }
});

// make brewers/ dir

// generate comparison pages in compare/grinders
// each grinder should have a page comparing it to all other grinders
grinders.map(grinder => {
    grinders.map(otherGrinder => {
        var grinderData = front_matter(fs.readFileSync(`grinders/${grinder.file}`, 'utf8')).attributes;
        var otherGrinderData = front_matter(fs.readFileSync(`grinders/${otherGrinder.file}`, 'utf8')).attributes;
        
        if (grinderData.title !== otherGrinderData.title) {
            const page = `---
layout: compare_grinders
title: ${grinderData.title} vs ${otherGrinderData.title}
grinder: ${grinderData.title}
otherGrinder: ${otherGrinderData.title}
---
`;
            var slug = `${grinderData.title}-vs-${otherGrinderData.title}`.toLowerCase().replace(/ /g, '-');

            fs.writeFileSync(`compare/grinders/${slug}.md`, page);
        }
    });
});

const brewers = fs.readdirSync('brewers').map(file => {
    return {
        name: file.replace('.md', ''),
        file: file
    }
});

// generate comparison pages in compare/brewers
// each brewer should have a page comparing it to all other brewers
brewers.map(brewer => {
    brewers.map(otherBrewer => {
        var brewerData = front_matter(fs.readFileSync(`brewers/${brewer.file}`, 'utf8')).attributes;
        var otherBrewerData = front_matter(fs.readFileSync(`brewers/${otherBrewer.file}`, 'utf8')).attributes;

        if (brewerData.title !== otherBrewerData.title) {
            const page = `---
layout: compare_brewers
title: ${brewerData.title} vs ${otherBrewerData.title}
brewer: ${brewerData.title}
otherBrewer: ${otherBrewerData.title}
---
`;
        var slug = `${brewerData.title}-vs-${otherBrewerData.title}`.toLowerCase().replace(/ /g, '-');

        console.log(slug)

        fs.writeFileSync(`compare/brewers/${slug}.md`, page);
        }
    });
});

// load aggregate/ and generate combinations between each brewer and grinder
// each page should list recipes that use the brewer and grinder
brewers.map(brewer => {
    grinders.map(grinder => {
        var brewerData = front_matter(fs.readFileSync(`brewers/${brewer.file}`, 'utf8')).attributes;
        var grinderData = front_matter(fs.readFileSync(`grinders/${grinder.file}`, 'utf8')).attributes;
        console.log(brewerData.title, grinderData.title);
        const page = `---
layout: brewer_grinder
title: ${brewerData.title} and ${grinderData.title}
brewer: ${brewerData.title}
grinder: ${grinderData.title}
---
`;

        var slug = `${brewerData.title}-and-${grinderData.title}`.toLowerCase().replace(/ /g, '-');

        fs.writeFileSync(`aggregate/${slug}.md`, page);
    });
});