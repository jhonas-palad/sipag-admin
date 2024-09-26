export class FetchError extends Error {
  public status: number;
  private data: string | Record<string, string | Record<string, string>>;

  constructor(
    message: string,
    data: string | Record<string, string>,
    status: number,
  ) {
    super(message as string);
    this.data = data;
    this.status = status;
  }
  get details() {
    const details =
      typeof this.data === "string" ? { detail: this.data } : this.data;
    return {
      errors: {
        ...details,
      },

      status: this.status,
    };
  }
}
