export const getStatusError = (status: number, entity?: string) => {
  switch (status) {
    case 401:
      return "Unauthorized";
    case 404:
      return entity + " was not found";
    case 400:
      
  }
};
