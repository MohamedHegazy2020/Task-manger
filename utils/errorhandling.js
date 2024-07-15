
export const asyncHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch(async (err) => {
      return next(new Error(err, { cause: 500 }));
    });
  };
};

export const globalResponse = (err, req, res, next) => {
  if (err) {
    console.log({ err });

    return res.status(err["cause"] || 500).json({ ErrorMsg: err });
  }
};
