import DB from '@databases';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateDistributorDto } from '@dtos/distributors.dto';
import { IDistributor } from '@interfaces/distributors.interface';

class DistributorService {
  public distributorModel = DB.Distributors;

  public async getAlDistributors(page: number): Promise<IDistributor[]> {
    const limit = 50;
    const offset = page * limit;
    return this.distributorModel.findAll({ limit, offset });
  }

  // public async getById(id: number): Promise<IDistributor | null> {
  //   return this.distributorModel.findByPk(id);
  // }

  public searchDistributor(phone: string): Promise<IDistributor> {
    return this.distributorModel.findOne({ where: { phone } });
  }

  public async createDistributor(distributorData: CreateDistributorDto): Promise<IDistributor> {
    // Check empty
    if (isEmpty(distributorData)) throw new HttpException(400, "Distributor's information is empty!");
    // Check phone existed
    const existed = await this.distributorModel.findOne({ where: { phone: distributorData.phone } });
    if (existed) {
      throw new HttpException(409, `Phone number ${distributorData.phone} already exists`);
    }
    return this.distributorModel.create({ ...distributorData });
  }
}

export default DistributorService;
