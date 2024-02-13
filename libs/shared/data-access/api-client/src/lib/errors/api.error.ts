export class ApiError extends Error {
  constructor(
    message: string,
    readonly code: number | null,
    readonly databaseColumn?: string | null
  ) {
    super(message);
  }
}
