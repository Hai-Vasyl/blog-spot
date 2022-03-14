export interface IErrorResponse {
  field: string;
  message: string;
}

export const mapErrorResponse = (
  errorResponse: IErrorResponse | IErrorResponse[],
) => {
  if (Array.isArray(errorResponse)) {
    return {
      message: errorResponse,
    };
  }
  return {
    message: [errorResponse],
  };
};
