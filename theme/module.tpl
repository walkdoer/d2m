{{#moduleList}}
{{name}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}} *`Module`*
===================================

> {{description}}  

{{#methods}}
###{{fullMethodName}} {{#public}} `public` {{/public}} {{#private}}`private` {{/private}}`method`

{{description}}  

#####*Params*
{{#params}}
+ {{name}} Type: `{{type}}`  {{description}}
{{/params}}

{{^params}}
no params
{{/params}}
{{/methods}}
{{^methods}}
no method.
{{/methods}}



{{#classes}}
### {{fullMethodName}} {{#public}} `public` {{/public}} {{#private}}`private` {{/private}} `class`

{{description}}  

#####*Methods*
{{#methods}}
+ ###{{fullMethodName}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}}  
{{description}}
#####*Params*
{{#params}}
    + {{name}} Type: `{{type}}`  {{description}}
{{/params}}
{{^params}}
no params
{{/params}}

{{/methods}}
{{^methods}}
no method.
{{/methods}}

{{/classes}}
{{^classes}}
no classes.
{{/classes}}  

---

{{/moduleList}}


{{#classList}}
### {{name}} *`Class`*

{{description}}
####*Methods*
{{#methods}}
+ ####{{fullMethodName}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}}  
{{description}}
#####*Params*
{{#params}}
    + {{name}} Type: `{{type}}`  {{description}}
{{/params}}

{{^params}}
no params
{{/params}}
{{/methods}}

{{^methods}}
no method.
{{/methods}}
{{/classList}}


{{#methodList}}
###{{fullMethodName}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}}  *`Method`*
{{description}}
#####*Params*
{{#params}}
+ {{name}} Type: `{{type}}`  {{description}}
{{/params}}
{{^params}}
no params
{{/params}}

{{/methodList}}

---
`*{{{_targetFilePath}}}` is generate from `{{{_srcFilePath}}}` at {{createTime}}*