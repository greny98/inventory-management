import { CreateStockInDto } from '@/dtos/stockIn.dto';
import { IStockIn } from '@/interfaces/stockIn.interface';
import StockInService from '@/services/stockIn.service';
import { RequestHandler } from 'express';

class StockInController {
  public stockInService = new StockInService();

  public createStockIn: RequestHandler = async (req, res, next) => {
    try {
      const stockInData: CreateStockInDto = req.body;
      const createStockInData: IStockIn = await this.stockInService.createStockIn(stockInData);
      res.status(201).json({ data: createStockInData, message: 'createde' });
    } catch (error) {
      next(error);
    }
  };
}

export default StockInController;
