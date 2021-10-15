import { CreateProductDto, UpdateProductDto } from '@/dtos/products.dto';
import { IGetAllProducts, IProduct } from '@/interfaces/products.interface';
import ProductService from '@/services/products.service';
import { RequestHandler } from 'express';
import InventoriesService from '@services/inventories.service';

class ProductsController {
  public productService = new ProductService();
  public inventoryService = new InventoriesService();

  public createProduct: RequestHandler = async (req, res, next) => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: IProduct = await this.productService.createProduct(productData);
      // Need create inventory = 0
      await this.inventoryService.createInventory({ productId: createProductData.id, quantity: 0 });
      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllProduct: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0, category, name } = req.query as IGetAllProducts;
      const products: { rows: IProduct[]; count: number } = await this.productService.getAllProducts(
        page,
        category,
        name,
      );
      res.status(201).json({ data: { count: products.count, products: products.rows } });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct: RequestHandler = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const productData = req.body as UpdateProductDto;
      const product: IProduct = await this.productService.updateProduct(productId, productData);
      res.status(201).json({ data: { product } });
    } catch (error) {
      next(error);
    }
  };

  public getOneProduct: RequestHandler = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product: IProduct = await this.productService.getOneProduct(productId);
      res.status(201).json({ data: { product } });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
