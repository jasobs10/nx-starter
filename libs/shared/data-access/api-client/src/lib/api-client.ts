import { ParsedUrlQuery } from 'querystring';
import { ApiError } from './errors/api.error';
import * as setCookieParser from 'set-cookie-parser';

export interface ApiResponse<TResponseData> {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<TResponseData>;
  text: () => Promise<string>;
  clone: () => ApiResponse<TResponseData>;
  headers: Headers;
}

type ApiClientConfig<TResponseData, TRequestBody> = Omit<RequestInit, 'body'> & {
  body?: TRequestBody;
  params?: ParsedUrlQuery;
  extractResponseData?: (response: ApiResponse<TResponseData>) => Promise<TResponseData>;
  cookies?: string;
  isFile?: boolean;
  shouldRefreshTokenOnUnauthorized?: boolean;
};

interface ApiClientOptions {
  baseUrl: string;
  apiPrefix?: string;
  refreshTokenEndpoint?: string;
}

export class ApiClient {
  private refreshTokenPromise: Promise<string | null> | undefined;
  private readonly apiUrl: string;
  private readonly refreshTokenEndpoint: string;

  constructor({
    baseUrl,
    apiPrefix,
    refreshTokenEndpoint = 'auth/refresh-token'
  }: ApiClientOptions) {
    this.refreshTokenEndpoint = refreshTokenEndpoint;
    this.apiUrl = apiPrefix ? `${baseUrl}/${apiPrefix}` : baseUrl;
  }

  static makeQueryString(params: ParsedUrlQuery = {}): string | undefined {
    const paramsArr = Object.entries(params).reduce<string[][]>((acc, [key, value]) => {
      if (value === undefined) {
        return acc;
      }

      if (Array.isArray(value)) {
        const values: string[][] = value.map((val) => [key, encodeURIComponent(val)]);
        return [...acc, ...values];
      }

      return [...acc, [key, encodeURIComponent(value)]];
    }, []);

    const queryString = new URLSearchParams(paramsArr).toString();

    return queryString || undefined;
  }

  async fetch<TResponseData = undefined, TRequestBody = undefined>(
    endpoint: string | undefined,
    {
      body: typedBody,
      params,
      extractResponseData = this.extractFetchResponseData,
      cookies,
      isFile,
      shouldRefreshTokenOnUnauthorized = true,
      ...config
    }: ApiClientConfig<TResponseData, TRequestBody>
  ): Promise<TResponseData> {
    const apiConfig: RequestInit = {
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        ...(!isFile && { 'Content-Type': 'application/json' }),
        ...(cookies && { Cookie: cookies })
      }
    };

    const queryString = ApiClient.makeQueryString(params);
    if (queryString) {
      endpoint = `${endpoint}?${queryString}`;
    }

    let responseStatus: number | null = null;
    try {
      const fetchOptions = {
        ...apiConfig,
        ...config,
        ...(typedBody && { body: isFile ? (typedBody as BodyInit) : JSON.stringify(typedBody) })
      };

      let response: ApiResponse<TResponseData> = await fetch(
        `${this.apiUrl}/${endpoint}`,
        fetchOptions
      );

      if (response.status === 401 && shouldRefreshTokenOnUnauthorized) {
        const setCookiesResponseHeaderValue = await this.refreshToken(apiConfig);

        let newCookiesRequestHeaderValue: string | null = null;
        if (setCookiesResponseHeaderValue) {
          const splitCookies = setCookieParser.splitCookiesString(setCookiesResponseHeaderValue);

          newCookiesRequestHeaderValue = splitCookies
            .reduce((cookiesString, unparsedCookie) => {
              const { name, value } = setCookieParser.parseString(unparsedCookie, {
                decodeValues: false
              });
              cookiesString += `${name}=${value}; `;
              return cookiesString;
            }, '')
            .trim();
        }

        response = await fetch(`${this.apiUrl}/${endpoint}`, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            ...(cookies && newCookiesRequestHeaderValue && { Cookie: newCookiesRequestHeaderValue })
          }
        });
      }

      responseStatus = response.status;

      if (!response.ok) {
        let error: string = await response.text();
        let columnName: string | null = null;

        try {
          const { message, databaseColumn } = JSON.parse(`${error}`);
          error = message;
          columnName = databaseColumn;
        } catch (e) {
          console.error(e);
        }
        throw new ApiError(error, responseStatus, columnName);
      }

      const data = await extractResponseData(response);
      return data;
    } catch (e) {
      if (e instanceof ApiError) {
        throw e;
      }

      throw new ApiError((e as Error).message, responseStatus);
    }
  }

  private async refreshToken(fetchOptions: RequestInit): Promise<string | null> {
    if (!this.refreshTokenPromise) {
      this.refreshTokenPromise = (async () => {
        try {
          const response = await fetch(`${this.apiUrl}/${this.refreshTokenEndpoint}`, {
            ...fetchOptions,
            method: 'POST'
          });

          return response?.headers?.get?.('set-cookie') ?? null;
        } catch (e) {
          console.error('Error refreshing token');
          return null;
        } finally {
          this.refreshTokenPromise = undefined;
        }
      })();
    }

    const newCookies = await this.refreshTokenPromise;
    return newCookies;
  }

  private async extractFetchResponseData<TResponseData>(
    response: ApiResponse<TResponseData>
  ): Promise<TResponseData> {
    try {
      const data = await response.clone().json();
      return data;
    } catch {
      const data = await response.text();
      return data as TResponseData;
    }
  }
}
