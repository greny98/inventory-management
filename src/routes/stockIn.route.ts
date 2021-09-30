import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

class StockInRoute implements Routes {
  public path = '/stock_in';
  public router = Router();
}

export default StockInRoute;
