process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import CustomersRoute from '@routes/customers.route';
import validateEnv from '@utils/validateEnv';
import CategoriesRoute from '@routes/categories.route';
import ProductRoute from './routes/products.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new CustomersRoute(),
  new CategoriesRoute(),
  new ProductRoute(),
]);

app.listen();
