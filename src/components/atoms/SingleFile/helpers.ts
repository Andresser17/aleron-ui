// Take a file size in Bytes, KB, MB or GB
export const calcFileSize = (str: string) => {
  const myRegex = /(\d*\.*\d+)(.b)/gi;
  const match = myRegex.exec(str);
  const onlyNum = match && match.length > 0 ? Number(match[1]) : 0;
  const unit = match && match.length > 0 ? match[2].toUpperCase() : "";
  const units: { [key: string]: number } = {
    KB: 1,
    MB: 2,
    GB: 3,
    TB: 4,
  };

  const convertFunc = (size: number, n: number): number => {
    if (n === 0) return size;

    return convertFunc(size * 1024, n - 1);
  };

  return convertFunc(onlyNum, units[unit]);
};

// Take a number in bytes
export const convertToUnit = (bytes: number) => {
  const units: { [key: string]: string } = {
    1: "KB",
    2: "MB",
    3: "GB",
    4: "TB",
  };
  const convertFunc = (size: number, n: number): string => {
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
  const mapped = accept.map((type, i) => {
    const matched = type.match(/\/\w+/g);
    const toPrint =
      matched && matched.length > 0 ? matched[0].replace("/", ".") : "";

    if (i === accept.length - 1) return toPrint + " ";

    return toPrint + ", ";
  });

  return mapped.join("");
};
