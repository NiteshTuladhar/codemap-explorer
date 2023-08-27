export const valueChecker = (value: string): boolean => {
  if (
    value.startsWith("function ") ||
    value.startsWith("const ") ||
    value.startsWith("async function ") ||
    value.startsWith("async ") ||
    value.startsWith("def ") ||
    value.startsWith("class ")
  ) {
    return true;
  }
  return false;
};

export const jsExtracter = (value: string): ExtractorType => {
  let valueName = "";
  let type = "Function";
  if (value.startsWith("function ")) {
    valueName = value.split(" ")[1].split("(")[0];
  } else if (value.startsWith("const ")) {
    valueName = value.split(" ")[1];
  } else if (value.startsWith("async function ")) {
    valueName = value.split(" ")[2].split("(")[0];
  } else if (value.startsWith("async ")) {
    valueName = value.split(" ")[1];
  }

  return {
    valueName: valueName,
    type: type,
  };
};

export const pythonExtracter = (value: string): ExtractorType => {
  let valueName = "";
  let type = "Function";

  if (value.startsWith("def ")) {
    valueName = value.split(" ")[1].split("(")[0];
  } else if (value.startsWith("class ")) {
    if (value.includes("(")) {
      valueName = value.split(" ")[1].split("(")[0];
    } else {
      valueName = value.split(" ")[1].split(":")[0];
    }
    type = "Class";
  }

  return {
    valueName: valueName,
    type: type,
  };
};
