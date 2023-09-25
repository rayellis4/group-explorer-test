/* @flow
# Templates

Most of what appears on the screen in GE3 is dynamic HTML, created at runtime by javascript and formatted by CSS stylesheets. This is often the result of a complex combination of HTML, CSS, and javascript, and it can difficult to read the code behind a web page to understand how the displayed data is derived and how it will appear. Every GE3 web page uses this 'template' pattern (though it may use others, too), making a template from a section of HTML with placeholders in it to represent data values that are to be replaced at runtime. This approach makes it easier to separate the layout of the data from the code that generates it. This is similar to the JavaServer Pages (.jsp) or Active Server Pages (.asp) approach, though in GE3 the evaluation is done on the client side by javascript using HTML5 template tags and ES6 template literals, not on the server.

## Example

*(Note that example code may be simplified from the actual implementation.)*

The subset display panel in the visualizer pages provides a ready example. The format for a subgroup is given by a template tag like this, similar to those in [subsets.html](../subsetDisplay/subsets.html):

```html
<template id="subgroup_template">
   <li id="${this.id}">
      ${this.name} = ⟨ ${generators} ⟩ is a subgroup of ${subgroupOrder}
   </li>
</template>
```

To use the template it is retrieved with a jQuery call, its HTML extracted as a string, and the result turned into a string literal, as done in the [Template.md](#template-retrieval-caching) code below:

```js
'`' + $('template[id="subgroup_template"]').html() + '`'
```

When executed, `Template.HTML` produces the template contents as a string literal:

```js
`<li id="${this.id}">
     ${this.name} = ⟨ ${generators} ⟩ is a subgroup of order ${subgroupOrder}
 </li>`
```

Note the back ticks ` at the start and end of the string: this is an ES6 template literal.  When it is eval'd in a scope which has the referenced values defined, as excerpted from [SSD.Subgroups](../subsetDisplay/Subgroup.js):

```js
const generators = this.generators.toArray().map(el => group.representation[el]);
const subgroupOrder = this.subgroup.order;
const subgroupLine = eval(Template.HTML('subgroup_template');
```

The expressions enclosed by curly braces ${...} are evaluated and replaced in the string. At this point (for one of the subgroups of <i>D</i><sub>4</sub>), `subgroupLine` will be a string of HTML like the following:

```html
<li id="1">
    <i>H<i><sub>1</sub> = ⟨ <i>r</i><sup>2</sup> ⟩ is a subgroup of order 2.
</li>
```

This can be appended to the list of subgroups in the DOM with a simple jQuery command

```js
$('#subgroups').append(subgroupLine)
```

to give the following line in the list of subgroups:

&nbsp;&nbsp;&nbsp;&nbsp;<i>H</i><sub>1</sub> = ⟨ <i>r</i><sup>2</sup> ⟩ is a subgroup of order 2.

While this example may seem too simple to provide much justification for introducing a sort of arcane use of HTML5 templates, in practice they get considerably more involved. There are quite a number of three-deep floating menus in `subsetDisplay`, for example.

## Template retrieval caching

Since template retrieval is done repeatedly, the actual template retrieval code caches results by template id in an unexported module variable, as you can see below.

```js
 */
/*
 * Caching template fetch --
 *   returns the html of template with id = templateId as a `string literal` for subsequent eval'ing
 *   returns the value undefined if template does not exist
 */

const templateMap /*: Map<string, ?string> */ = new Map()

export function HTML (templateId /*: string */) /*: ?string */ {
  let result = templateMap.get(templateId)
  if (result === undefined) {
    const $template = $(`template[id="${templateId}"]`)
    result = ($template.length === 0) ? undefined : '`' + $template.html() + '`'
    templateMap.set(templateId, result)
  }

  return result
}
/*
```
 */
