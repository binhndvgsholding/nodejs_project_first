const Handlebars = require("express-handlebars");
var hbs = Handlebars.create({});
hbs.handlebars.registerHelper('ifEquals', function(a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
  
    return options.inverse(this);
  });
