function list(val) {
  return val.split(',');
}

// here is the program itself

program
  .version(version, '    --version')
  .usage('[options] [dir]')
  .option('-R, --routes <items>', 'create full CRUD routes for a list of comma-separated endpoints, e.g. "users,api/posts,api/comments".', list)
  .parse(process.argv);

// testing out how to write routes
writeRoutes(program.routes);
writeControllers(program.routes);

/**
 * creates the templates for the routes
 * 
 * @param {Array} routes - an array of routes
 * @returns an object with uninitialized templates of routes
 */
//TODO: modify so this works with subroutes
function createRouteTemplates(routes) {
  return routes.reduce((acc, route) => {
    acc[route] = loadRouteTemplate(route);
    return acc;
  }, {});
}

function createControllerTemplates(controllers) {
  return controllers.reduce((acc, controller) => {
    acc[controller] = loadControllerTemplate(controller);
    return acc;
  }, {});
}

/**
 * 
 * 
 * @param {String} route 
 * @returns an object that is a route template
 */
function loadRouteTemplate(route) {
  const contents = fs.readFileSync(path.join(__dirname, '..', 'templates/js/routes', ('crudroute' + '.ejs')), 'utf-8');
  const locals = Object.create(null);
  locals.route = route;

  function render() {
    return ejs.render(contents, locals);
  }

  return {
    locals: locals,
    render: render,
  }
}

function loadControllerTemplate(controller) {
  const contents = fs.readFileSync(path.join(__dirname, '..', 'templates/js/controllers', ('controller' + '.ejs')), 'utf-8');
  const locals = Object.create(null);
  locals.route = controller;

  function render() {
    return ejs.render(contents, locals);
  }

  return {
    locals: locals,
    render: render,
  }
}

/**
 * 
 * 
 * @param {Array} routes - takes an array of routes
 */
function writeRoutes(routes) {
  const routeTemplates = createRouteTemplates(routes);
  routes.forEach(route => {
    write(`${route}-routes.js`, routeTemplates[route].render());
  });
}

function writeControllers(controllers) {
  const controllerTemplates = createControllerTemplates(controllers);
  controllers.forEach(controller => {
    write(`${controller}-controller.js`, controllerTemplates[controller].render());
  })
}

function write (path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || MODE_0666 })
  console.log('   \x1b[36mcreate\x1b[0m : ' + path)
}