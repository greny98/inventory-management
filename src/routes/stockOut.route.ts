import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

class StockOutRoute implements Routes {
  public path = '/stock_out';
  public router = Router();
}

export default StockOutRoute;
