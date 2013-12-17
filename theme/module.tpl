{{#moduleList}}
{{name}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}} *`Module`*
===================================
<!--module description-->
{{description}}  

<!-- methods -->
Methods
--------------------------------
<!-- start of method list -->
{{#methods}}
+ ###{{name}} {{#public}} `public` {{/public}} {{#private}}`private` {{/private}}`method`
{{description}}  
#####*Params*<!--start of param list -->
{{#params}}
+ {{name}}`{{type}}`  {{description}}
{{/params}}
{{^params}}
no params
{{/params}}
<!-- end of param list -->
{{/methods}}
<!--no method-->
{{^methods}}
no method.
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
###Methods
{{#methods}}
+ ###{{name}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}}  
{{description}}
#####*Params*<!--start of param list -->
{{#params}}
    + {{name}}`{{type}}`  {{description}}
{{/params}}
{{^params}}
no params
{{/params}}
<!-- end of param list -->
{{/methods}}
{{^methods}}
no method.
{{/methods}}
<!-- end of class method list -->
{{/classes}}
{{^classes}}
no classes.
{{/classes}}  

---
<!-- end of  class list-->
{{/moduleList}}

<!-- start of class list-->
{{#classList}}
### {{name}} *`Class`*
<!-- class description -->
{{description}}
<!-- start of class method list -->
###Methods
{{#methods}}
+ ###{{name}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}}  
{{description}}
###Params<!--start of param list -->
{{#params}}
    + {{name}}`{{type}}`  {{description}}
{{/params}}
{{^params}}
no params
{{/params}}
<!-- end of param list -->
{{/methods}}
{{^methods}}
no method.
{{/methods}}
<!-- end of class method list -->
{{/classList}}


{{#methodList}}
###{{name}} {{#public}} `public` {{/public}} {{#private}} `private` {{/private}}  *`Method`*
{{description}}
#####*Params*<!--start of param list -->
{{#params}}
+ {{name}}`{{type}}`  {{description}}
{{/params}}
{{^params}}
no params
{{/params}}
<!-- end of param list -->
{{/methodList}}


*This file is generate from {{{filePath}}} at {{createTime}}*