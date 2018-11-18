const routes = require('next-routes')();
// ie above require returns a function that is invoked the moment it's imported into a file.
// note :address is basically a wildcard

routes.add('/campaigns/new', 'campaigns/new')
routes.add('/campaigns/:address', '/campaigns/show')

module.exports = routes;