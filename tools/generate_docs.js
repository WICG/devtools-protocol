const fs = require('fs');
const path = require('path');

const Footer = `\n---\n`;

var generateEdpDocs = function generateEdpDocs(protocolFilePath, outputFolderPath) {

    if (!fs.existsSync(protocolFilePath)) {
        throw `protocolFilePath was not provided or protocolFilePath provided does not exist, protocolFilePath: ${protocolFilePath}`;
    }

    fs.readFile(protocolFilePath, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        if (!fs.existsSync(outputFolderPath)) {
            fs.mkdirSync(outputFolderPath);
        }

        var domainsFolderPath = path.join(outputFolderPath, "domains");

        if (!fs.existsSync(domainsFolderPath)) {
            fs.mkdirSync(domainsFolderPath);
        }

        protocolJson = JSON.parse(data);

        var sortedDomains = protocolJson.domains;
        sortedDomains = sortedDomains.sort(function (a, b) {
            if (a.domain < b.domain) {
                return -1;
            }

            if (a.domain > b.domain) {
                return 1;
            }

            return 0;
        });

        protocolJson.domains = sortedDomains;

        writeDomainsSummaryDoc(protocolJson, domainsFolderPath);
        writeDomainMarkdownDocs(protocolJson.domains, protocolJson.version, domainsFolderPath);
    });
}

function writeDomainsSummaryDoc(protocol, outputFolderPath) {
    var version = protocol.version;
    var domains = protocol.domains;
    var metadata = `---
description: List of supported domains in DevTools Protocol
title: Domains
---`;

    var domainSummaryList = [];

    domainSummaryList.push(metadata);
    domainSummaryList.push(`# DevTools Protocol Domains\n`)

    for (var i = 0; i < domains.length; i++) {
        var curDomain = domains[i];
        var domainLink = `${curDomain.domain.toLowerCase()}.md`;
        var domainSummary = `- [${curDomain.domain}](${domainLink}) - ${curDomain.description}\n\n`;

        domainSummaryList.push(domainSummary);
    }

    var domainSummaryMarkdown = joinSections(domainSummaryList);
    fs.writeFile(path.join(outputFolderPath, 'index.md'), domainSummaryMarkdown,(err) => {
        if (err) {
            throw err;
        }
        console.log(`Domain summary has been written.`)
    });
}

function writeDomainMarkdownDocs(domains, version, outputFolderPath) {
    for (var i = 0; i < domains.length; i++) {
        var curDomain = domains[i];
        var domainMarkdown = generateDomainMarkdown(curDomain, version);
        var file = path.join(outputFolderPath, `${curDomain.domain.toLowerCase()}.md`)

        fs.writeFile(file, domainMarkdown, (err) => {
            if (err) {
                throw err;
            }
            console.log(`Domain has been written.`)
        });
    }
}

function generateDomainMarkdown(domain, version) {
    var metadata =`---
title: ${domain.domain} Domain - DevTools Protocol
description: Reference for the ${domain.domain} Domain. ${domain.description}
---`;

    // Generate table header
    var summaryTableElements = [];
    var summaryTableHeader = `\n# ${domain.domain}\n${domain.description}\n\n<table>`;

    summaryTableElements.push(summaryTableHeader);
    if (domain.commands && domain.commands.length > 0) {
        summaryTableElements.push(`<tr><th><a href="#methods">Methods</a></th><td>${generateLinks(domain.commands)}</td></tr>`);
    }

    if (domain.events && domain.events.length > 0) {
        summaryTableElements.push(`<tr><th><a href="#events">Events</a></th><td>${generateLinks(domain.events)}</td></tr>`);
    }

    if (domain.types && domain.types.length > 0) {
        summaryTableElements.push(`<tr><th><a href="#types">Types</a></th><td>${generateLinks(domain.types, 'id')}</td></tr>`);
    }

    summaryTableElements.push('</table>\n');

    // Generate body section
    var bodySections = [];

        // Generate methods
        var methods = `## Methods \n${generateObjs(domain.commands, generateMethod)}`;
        bodySections.push(methods);

        // Generate Events
        var events = `## Events \n${generateObjs(domain.events, generateMethod)}`;
        bodySections.push(events);

        // Generate Types
        var types = `## Types \n${generateObjs(domain.types, generateType)}`;
        bodySections.push(types);

        // Generate Dependencies
        var dependencies = `## Dependencies \n${generateDependencyLinks(domain.dependencies)}`;
        bodySections.push(dependencies);


    var sections = []
    sections.push(metadata);
    sections.push(joinSections(summaryTableElements));
    sections.push(joinSections(bodySections));

    return joinSections(sections);
}

function generateLinks(objs, prop = 'name') {
    if (!objs || !objs.length) {
        return '';
    }

    var links = [];
    for (var i = 0; i < objs.length; i++) {
        var name = objs[i][prop];
        links.push(`<a href="#${name.toLowerCase()}">${name}</a>`)
    }

    return links.join(', ');
}

function generateDependencyLinks(dependencies) {
    if (!dependencies || !dependencies.length) {
        return '';
    }

    var links = [];
    for (var i = 0; i < dependencies.length; i++) {
        var name = dependencies[i];
        links.push(`[${name}](${name.toLowerCase()}.md)`)
    }

    return links.join(', ');
}

function generateObjs(objs, generateFunc) {
    if (!objs || !objs.length) {
        return '';
    }

    var formattedObjs = [];
    for (var i = 0; i < objs.length; i++) {
        formattedObjs.push(generateFunc(objs[i]))
    }

    return joinSections(formattedObjs);
}

function generateMethod(method) {
    var sections = [];
    var title = `### ${method.name} \n${method.description}`;

    sections.push(title)
    if (method.parameters && method.parameters.length) {
        sections.push(generateDocTable('Parameters', method.parameters));
    }

    if (method.returns && method.returns.length) {
        sections.push(generateDocTable('Returns', method.returns));
    }

    sections.push(Footer);
    return joinSections(sections);
}

function generateDocTable(type, objs) {
    var docTable =
        `<table>
    <thead>
        <tr>
            <th>${type}</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
${generateObjs(objs, generateTableDocRow)}
    </tbody>
</table>`;

    return docTable;
}

function generateTableDocRow(obj) {
    var name = generateTableDocRowNameColumn(obj);
    var type = generateTableDocRowTypeColumn(obj);
    var description = generateTableDocRowDescriptionColumn(obj);

    var row =
        `<tr>
            <td>${name}</td>
            <td>${type}</td>
            <td>${description}</td>
        </tr>`;

    return row;
}

function generateTableDocRowNameColumn(obj) {
    var elements = [];
    elements.push(obj.name);

    if (obj.optional) {
        elements.push('<br/> <i>optional</i>');
    }

    return elements.join(' ');
}

function generateTableDocRowTypeColumn(obj) {
    var elements = [];
    elements.push(generateTypeForColumn(obj));

    if (obj.enum) {
        elements.push(`<br/> <i>Allowed values: ${obj.enum.join(', ')}</i>`);
    }

    return elements.join(' ');
}

function generateTypeForColumn(obj) {
    var protocolElement = obj;
    var isArray = protocolElement.type === 'array';

    if (isArray) {
        protocolElement = protocolElement.items
    }

    if (protocolElement.type) {
        return `<code class="flyout">${protocolElement.type}${isArray ? '[]' : ''}</code>`;
    }
    else if (protocolElement['$ref']) {
        var ref = protocolElement['$ref'];
        var refLower = ref.toLowerCase();
        var refParts = refLower.split('.');
        if (refParts.length === 2) {
            var domain = refParts[0];
            var anchor = refParts[1];
            return `<a href="${domain}.md#${anchor}"><code class="flyout">${ref}${isArray ? '[]' : ''}</code></a>`;
        }
        else {
            return `<a href="#${refLower}"><code class="flyout">${ref}${isArray ? '[]' : ''}</code></a>`;
        }
    }
    else {
        throw 'An error occured when trying to find a type for a table row.';
    }
}

function generateTableDocRowDescriptionColumn(obj) {
    var elements = [];

    elements.push(obj.description || (obj.items ? obj.items.description : ''));

    return elements.join('');
}

function generateType(type) {
    var sections = [];

    var title =`
### <a name="${type.id.toLowerCase()}"></a> ${type.id} \`${type.type}\`
${type.description}
`;

    sections.push(title)

    if (type.enum && type.enum.length) {
        var allowedValues =
            `##### Allowed Values
${type.enum.join(', ')}`;

        sections.push(allowedValues);
    }

    if (type.properties && type.properties.length) {
        sections.push(generateDocTable('Properties', type.properties));
    }

    sections.push(Footer);
    return joinSections(sections);
}

function joinSections(sections) {
    return sections.join('\n');
}


generateEdpDocs('specification/protocol.json', 'specification/docs')