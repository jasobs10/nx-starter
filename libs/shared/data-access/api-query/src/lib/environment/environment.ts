import { validateSchema } from '@jasobs10/schema-validator';
import { IsOptional, IsString, IsUrl } from 'class-validator';

class ApiQueryEnvironment {
  @IsString()
  @IsUrl({ require_tld: false })
  apiBaseUrl: string;

  @IsOptional()
  @IsString()
  apiPrefix: string | undefined;
}

export const environment: ApiQueryEnvironment = validateSchema(ApiQueryEnvironment, {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL,
  apiPrefix: process.env.NEXT_PUBLIC_API_PREFIX ?? process.env.API_PREFIX
});
