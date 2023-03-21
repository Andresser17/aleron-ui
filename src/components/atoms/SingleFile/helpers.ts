// Take a file size in Bytes, KB, MB or GB
export const calcFileSize = (str: string) => {
  if (str === undefined)
    throw new Error("argument provided can't be undefined");
  if (typeof str !== "string")
    throw new Error("argument provided can only be an string");

  const myRegex = /(\d*\.*\d+)(.b)/gi;
  const match = myRegex.exec(str);
  const onlyNum = match[1];
  const unit = match[2].toUpperCase();
  const units = { KB: 1, MB: 2, GB: 3, TB: 4 };

  const convertFunc = (size, n) => {
    if (n === 0) return size;

    return convertFunc(size * 1024, n - 1);
  };

  return convertFunc(onlyNum, units[unit]);
};

// Take a number in bytes
export const convertToUnit = (bytes: number) => {
  if (bytes === undefined)
    throw new Error("argument provided can't be undefined");
  if (typeof bytes !== "number")
    throw new Error("argument provided can only be a number");

  const units = { 1: "KB", 2: "MB", 3: "GB", 4: "TB" };
  const convertFunc = (size, n) => {
    if (size < 1) {
      const finalCalc = Number.isInteger(size * 1024)
        ? size * 1024
        : (size * 1024).toFixed(2);
      return String(finalCalc) + units[n - 2];
    }

    return convertFunc(size / 1024, n + 1);
  };

  return convertFunc(bytes, 1);
};

// Convert type/extension to .extension
export const printTypes = (accept: Array<string>) => {
  if (!accept) return `"Provide valid file formats"`;
  if (typeof accept !== "object")
    return `"this function only accept an array like argument"`;

  const mapped = accept.map((type, i) => {
    let toPrint = type.match(/\/\w+/g)[0].replace("/", ".");

    if (i === accept.length - 1) return toPrint + " ";

    return toPrint + ", ";
  });

  return mapped.join("");
};
