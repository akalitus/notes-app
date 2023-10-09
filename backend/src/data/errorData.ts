interface IErrorData {
  requiredError: string;
  internalServerError: string;
  idError: string;
}

const errorData: IErrorData = {
  requiredError: "Title and content fields required",
  internalServerError: "Something went wrong",
  idError: "ID must be a valid number",
};

export default errorData;
