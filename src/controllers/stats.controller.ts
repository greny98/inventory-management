import StockInService from '@services/stockIn.service';
import StockOutService from '@services/stockOut.service';
import { RequestHandler } from 'express';

class StatsController {
  // TODO: Calculate revenue and cost => profit
  public stockInService = new StockInService();
  public stockOutService = new StockOutService();

  public getStats: RequestHandler = async (req, res, next) => {
    const { month, year } = req.query;
    try {
      const revenue = await this.stockOutService.calcRevenue(Number(month), Number(year));
      const cost = await this.stockInService.calcCost(Number(month), Number(year));
      console.log('============', revenue, cost);
      res.json({
        data: {
          revenue,
          cost,
          profit: revenue - cost,
        },
      });
    } catch (e) {
      next(e);
    }
  };
}

export default StatsController;
