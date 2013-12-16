{{#moduleList}}
# {{name}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}} `Module`
<!--module description-->
{{description}}  

---
<!-- methods -->
##Methods
<!-- start of method list -->
{{#methods}}
###{{name}} {{#public}} `public` {{/public}} {{#private}}`private` {{/private}}`method`
{{description}}  

###Params
<!--start of param list -->
{{#params}}
+ {{name}}`{{type}}`  {{description}}
{{/params}}

{{^params}}
no params  

{{/params}}
<!-- end of param list -->
{{/methods}}
<!-- end of method list -->
<!-- classes -->
##Classes
<!-- start of class list-->
{{#classes}}
### {{name}} `class`
<!-- class description -->
{{description}}  
<!-- start of class method list -->
{{#methods}}
###{{name}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}}`method`
{{/methods}}
<!-- end of class method list -->
{{/classes}}
<!-- end of  class list-->
{{/moduleList}}



---
*This file is generate from {{{filePath}}} at {{createTime}}*