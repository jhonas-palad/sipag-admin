export type ActionResult = ActionSuccessResult | ActionFailedResult;

export type ActionSuccessResult = {
  success: boolean;
  result: any;
};

export type ActionFailedResult = {
  errors: any;
  status: number;
};
