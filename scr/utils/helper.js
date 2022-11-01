const Handlebars = require("express-handlebars");
var hbs = Handlebars.create({});
hbs.handlebars.registerHelper('ifEquals', function(a, b, options) {
    if (a == b) {
      return options.fn(this);
    }
  
    return options.inverse(this);
  });
hbs.handlebars.registerHelper('eq', (a, b) => a == b)

hbs.handlebars.registerHelper('count', function(context, options) {

  var ret = "",
    listLength = 3,
    u = 0;
  
  for(var i=0, j=context.length; i<j; i++) {
  
  if( i % listLength === 0  ) {
      u = 0;
      ret += '<ul>';
  }
  
  ret +=  options.fn(context[i]);
  
  if( u === listLength - 1 ) { // Zero indexed
      ret +='</ul>';
  }
  
  u++;
  }
  
  return ret;
  });