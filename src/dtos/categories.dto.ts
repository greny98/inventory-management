import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  public name: string;
}

export class SearchCategoryDto {
  @IsString()
  public name: string;
}
