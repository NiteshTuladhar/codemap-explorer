type ExtractorType = {
  valueName: string;
  type: string;
};

type CurrentFunctionType = {
  funcName: string;
  lineNumber: number;
  type?: string;
  isaMethod: boolean | null;
};

type DataType = {
  label: string;
  detail?: string;
  lineNumber: number;
  kind?: any;
};
