import generatedRoutes from './crud-routes.json';

const routes = generatedRoutes.map(name => require(`./${name}`).default); // eslint-disable-line

export default routes;
