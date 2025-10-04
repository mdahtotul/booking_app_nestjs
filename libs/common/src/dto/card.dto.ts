import { Type } from 'class-transformer';
import {
  IsCreditCard,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

const CARD_NETWORKS_PREFERRED = [
  'cartes_bancaires',
  'mastercard',
  'visa',
] as const;
type PreferredType = (typeof CARD_NETWORKS_PREFERRED)[number];

export class NetworksDto {
  @IsOptional()
  @IsString()
  @IsIn(CARD_NETWORKS_PREFERRED)
  preferred?: PreferredType;
}

export class CardDto {
  @IsOptional()
  @IsString()
  cvc?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  exp_month?: number;

  @IsOptional()
  @IsInt()
  @Min(new Date().getFullYear())
  exp_year?: number;

  @IsOptional()
  @IsCreditCard()
  number?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  token?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => NetworksDto)
  networks?: NetworksDto;
}
