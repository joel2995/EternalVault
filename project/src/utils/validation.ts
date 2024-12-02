export const validatePin = (pin: string): boolean => {
  return /^\d{6}$/.test(pin);
};

export const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};