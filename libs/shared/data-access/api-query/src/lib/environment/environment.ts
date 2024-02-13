import { validateSchema } from '@jasobs10/schema-validator';
import { IsString, IsUrl } from 'class-validator';

class ApiQueryEnvironment {
  @IsString()
  @IsUrl({ require_tld: false })
  apiBaseUrl: string;
}

export const environment: ApiQueryEnvironment = validateSchema(ApiQueryEnvironment, {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL
});
