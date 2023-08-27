type ExtractorType = {
  valueName: string;
  type: string;
};

type CurrentFunctionType = {
  funcName: string;
  lineNumber: number;
  type?: string;
};

type DataType = {
  label: string;
  detail: string;
  lineNumber: number;
};
