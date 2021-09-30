import DB from '@databases';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateDistributorDto } from '@dtos/distributors.dto';
import { IDistributor } from '@interfaces/distributors.interface';

class DistributorService {
  public distributorModel = DB.Distributors;

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
