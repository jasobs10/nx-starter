import { Expose } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';
import { validateSchema } from '@jasobs10/schema-validator';

export class ApiEnvironment {
  @IsString()
  @IsUrl({ require_tld: false })
  @Expose({ name: 'WEB_BASE_URL' })
  webBaseUrl: string;
}

export const validateEnv = (config: Record<string, unknown>) => {
  return validateSchema(ApiEnvironment, config);
};
