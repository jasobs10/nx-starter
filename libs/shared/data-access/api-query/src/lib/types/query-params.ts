export type QueryParams<T extends object = object> = {
  [K in keyof T]: Extract<string | string[], T[K]>;
};
