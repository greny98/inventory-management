import { RequestHandler } from 'express';
import DistributorService from '@services/distributors.service';
import { IDistributor, IGetAllDistributors, ISearchDistributors } from '@interfaces/distributors.interface';
import { CreateDistributorDto, SearchDistributorDto } from '@dtos/distributors.dto';

class DistributorsController {
  public distributorService = new DistributorService();

  public getAllDistributors: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllDistributors;
      const distributors: IDistributor[] = await this.distributorService.getAlDistributors(page);
      res.status(201).json({ data: { distributors } });
    } catch (error) {
      next(error);
    }
  };

  public searchDistributor: RequestHandler<any, any, ISearchDistributors, any> = async (req, res, next) => {
    try {
      const distributorQuery: SearchDistributorDto = req.query;
      const distributor = await this.distributorService.searchDistributor(distributorQuery.phone);
      res.json({ data: { distributor } });
    } catch (error) {
      next(error);
    }
  };

  public createDistributor: RequestHandler = async (req, res, next) => {
    try {
      const distributorData: CreateDistributorDto = req.body;
      const createDistributorData: IDistributor = await this.distributorService.createDistributor(distributorData);
      res.status(201).json({ data: createDistributorData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default DistributorsController;
