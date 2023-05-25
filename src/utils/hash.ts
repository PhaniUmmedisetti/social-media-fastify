export const generateAlphaNumericHash = (n = 8) => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let hash = '';
  for (let i = 0; i < n; i++) {
    hash += characters[Math.floor(Math.random() * 36)];
  }
  return hash;
};

export const generateNumericHash: any = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};
