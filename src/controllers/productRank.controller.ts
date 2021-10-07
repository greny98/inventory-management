import { IGetAllProductRank, IProductRank } from '@/interfaces/productRank.interface';
import ProductRankService from '@/services/productRank.service';
import { RequestHandler } from 'express';

class ProductRankController {
  public productRankService = new ProductRankService();
  public getAllProductRank: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllProductRank;
      const productsRank: IProductRank[] = await this.productRankService.getAllProductRank(page);
      res.status(201).json({ data: { productsRank }, message: 'listed' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductRankController;
