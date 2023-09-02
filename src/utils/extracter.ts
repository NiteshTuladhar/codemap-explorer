export const patterns = [
  { condition: /^function\s/, type: "Function" },
  { condition: /^const .*?(\{.*function )?.*=>/, type: "Function" }, //((value.includes("{") && value.includes("function ")) ||value.includes("=>") || value.includes("new"))
  { condition: /^async\sfunction\s/, type: "Function" },
  { condition: /^async\s/, type: "Function" },
  { condition: /^export\sconst\s/, type: "Function" },
  { condition: /^export\sfunction\s/, type: "Function" },
  { condition: /^class\s/, type: "Class" },
  { condition: /^def\s/, type: "Function" },
];

export const valueChecker = (value: string) => {
  return patterns.some((pattern) => pattern.condition.test(value));
};

export const jsExtracter = (value: string): ExtractorType => {
  let valueName = "";
  let type = "Function";
  if (value.startsWith("function ")) {
    valueName = value.split(" ")[1].split("(")[0];
  } else if (
    value.startsWith("const ") &&
    ((value.includes("{") && value.includes("function ")) ||
      value.includes("=>"))
  ) {
    valueName = value.split(" ")[1];
  } else if (value.startsWith("async function ")) {
    valueName = value.split(" ")[2].split("(")[0];
  } else if (value.startsWith("async ")) {
    valueName = value.split(" ")[1];
  } else if (value.startsWith("export function ")) {
    valueName = value.split(" ")[2].split("(")[0];
  } else if (value.startsWith("export const ")) {
    valueName = value.split(" ")[2].split("(")[0];
  } else if (value.startsWith("class ")) {
    type = "Class";
    valueName = value.split(" ")[1];
  }

  const returnValue = {
    valueName: valueName,
    type: type,
  };
  return returnValue;
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
