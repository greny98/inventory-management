import { CreateProductDto } from '@/dtos/products.dto';
import { IGetAllProducts, IProduct } from '@/interfaces/products.interface';
import ProductService from '@/services/products.service';
import { RequestHandler } from 'express';

class ProductsController {
  public productService = new ProductService();

  public createProduct: RequestHandler = async (req, res, next) => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: IProduct = await this.productService.createProduct(productData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllProduct: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0, categories, name } = req.query as IGetAllProducts;
      const products: IProduct[] = await this.productService.getAllProducts(page, categories, name);
      res.status(201).json({ data: { products } });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct: RequestHandler = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const productData = req.body as IProduct;
      const product: IProduct = await this.productService.updateProduct(productId, productData);
      res.status(201).json({ data: { product } });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
