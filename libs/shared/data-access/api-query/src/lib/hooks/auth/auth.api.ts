import {
  ForceUpdatePasswordRequestDto,
  InitResetPasswordRequestDto,
  LoginRequestDto,
  LoginResponseDto,
  PasswordResetRequestDto,
  SignUpRequestDto
} from '@revision/shared/data-access/api-types';
import { UseApiMutationOptions } from '../../types';
import { useApiMutation } from '../../use-api-mutation';

const AUTH_ENDPOINT = 'auth';

export const LOGIN_ENDPOINT = `${AUTH_ENDPOINT}/login`;
export const useLoginApiMutation = (
  options?: UseApiMutationOptions<LoginRequestDto, void, LoginResponseDto>
) => useApiMutation(LOGIN_ENDPOINT, { ...options, shouldRefreshTokenOnUnauthorized: false });

export const FORCE_UPDATE_PASSWORD_ENDPOINT = `${AUTH_ENDPOINT}/force-update-password`;
export const useForceUpdatePasswordApiMutation = (
  options?: UseApiMutationOptions<ForceUpdatePasswordRequestDto>
) =>
  useApiMutation(FORCE_UPDATE_PASSWORD_ENDPOINT, {
    ...options,
    shouldRefreshTokenOnUnauthorized: false
  });

export const LOGOUT_ENDPOINT = `${AUTH_ENDPOINT}/logout`;
export const useLogoutApiMutation = (options?: UseApiMutationOptions<void>) =>
  useApiMutation(LOGOUT_ENDPOINT, options);

export const PASSWORD_RESET_ENDPOINT = `${AUTH_ENDPOINT}/password-reset`;
export const usePasswordResetApiMutation = (
  options?: UseApiMutationOptions<PasswordResetRequestDto>
) =>
  useApiMutation(PASSWORD_RESET_ENDPOINT, { ...options, shouldRefreshTokenOnUnauthorized: false });

export const INITIATE_PASSWORD_RESET_ENDPOINT = `${PASSWORD_RESET_ENDPOINT}/initiate`;
export const useInitiatePasswordResetApiMutation = (
  options?: UseApiMutationOptions<InitResetPasswordRequestDto>
) =>
  useApiMutation(INITIATE_PASSWORD_RESET_ENDPOINT, {
    ...options,
    shouldRefreshTokenOnUnauthorized: false
  });

export const EDUCATOR_SIGN_UP_ENDPOINT = `${AUTH_ENDPOINT}/educator-sign-up`;
export const useEducatorSignUpApiMutation = (options?: UseApiMutationOptions<SignUpRequestDto>) =>
  useApiMutation(EDUCATOR_SIGN_UP_ENDPOINT, {
    ...options,
    shouldRefreshTokenOnUnauthorized: false
  });
