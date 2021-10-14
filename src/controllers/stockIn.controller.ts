import { CreateStockInBodyDto } from '@/dtos/stockIn.dto';
import { IGetAllProductStockIn, IStockIn } from '@/interfaces/stockIn.interface';
import StockInService from '@/services/stockIn.service';
import { RequestHandler } from 'express';
import DistributorService from '@services/distributors.service';
import { IProductStockIn } from '@interfaces/productStockIn.interfaces';
import ProductStockInService from '@services/productStockIn.service';
import { IGetAllProducts } from '@interfaces/products.interface';
import InventoriesService from '@/services/inventories.service';

class StockInController {
  public stockInService = new StockInService();
  public distributorService = new DistributorService();
  public prodStockInService = new ProductStockInService();
  public inventoryService = new InventoriesService();

  public getAllProductStockIn: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllProductStockIn;
      const productStockIn = await this.prodStockInService.getAllProductStockIn(page);
      res.status(201).json({ data: { productStockIn } });
    } catch (error) {
      next(error);
    }
  };

  public getAllStockIn: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllProducts;
      const stockIn = await this.stockInService.getAllStockIn(page);
      res.status(201).json({ data: { count: stockIn.count, stockIn: stockIn.rows } });
    } catch (error) {
      next(error);
    }
  };

  public createStockIn: RequestHandler = async (req, res, next) => {
    try {
      const { products, distributor, discount = 0 }: CreateStockInBodyDto = req.body;
      if (products.length === 0) {
        return res.status(400).json({ massage: 'No products!' });
      }
      // Check distributor existed
      const foundDis = await this.distributorService.searchDistributor(distributor.phone);
      if (!foundDis) {
        return res.status(400).json({ massage: 'Distributor does not exist!' });
      }
      // Create Stock In
      const createStockInData: IStockIn = await this.stockInService.createStockIn({
        distributorId: foundDis.id,
        createdAt: new Date(),
      });
      // Create product stock in
      const prodStockIns: IProductStockIn[] = products.map(prod => ({
        stockInId: createStockInData.id,
        createdAt: new Date(),
        discount,
        productId: prod.product.id,
        quantity: prod.quantity,
      }));
      const result = await this.prodStockInService.prodStockIn.bulkCreate(prodStockIns);
      // Create or Update Inventory
      const productFilter = result.map(prod => ({ productId: prod.productId, quantity: prod.quantity }));
      const allProductCreated = await Promise.all(
        productFilter.map(prod => this.inventoryService.searchProductInInventory(prod.productId)),
      );
      await Promise.all(
        allProductCreated.map((isProductExist, index) => {
          if (Boolean(isProductExist)) {
            return this.inventoryService.updateInventory(productFilter[index]);
          }
          return this.inventoryService.createInventory(productFilter[index]);
        }),
      );

      await res.status(201).json({ data: createStockInData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default StockInController;
