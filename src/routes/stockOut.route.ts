import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import StockOutController from '@/controllers/stockOut.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateStockOutBodyDto } from '@/dtos/stockOut.dto';

class StockOutRoute implements Routes {
  public path = '/stock_out';
  public router = Router();
  public stockOutController = new StockOutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.stockOutController.getAllStockOut);
    this.router.get(`${this.path}/filter`, this.stockOutController.filter);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateStockOutBodyDto, 'body'),
      this.stockOutController.createStockOut,
    );
  }
}

export default StockOutRoute;
