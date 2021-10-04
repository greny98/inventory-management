import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import StockInController from '@/controllers/stockIn.controller';
import { CreateStockInBodyDto } from '@/dtos/stockIn.dto';
import validationMiddleware from '@/middlewares/validation.middleware';

class StockInRoute implements Routes {
  public path = '/stock_in';
  public router = Router();
  public stockInController = new StockInController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateStockInBodyDto, 'body'),
      this.stockInController.createStockIn,
    );
  }
}

export default StockInRoute;
