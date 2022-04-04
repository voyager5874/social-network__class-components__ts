export const validateGithubAddress = (address: string): boolean => {
  if (!address) return false;
  const splitAddress = address.split('/');
  const ArrayLength = splitAddress.length;
  const lastAddressPartLength = splitAddress[ArrayLength - 1].length;
  const numberOfSlashes = address.split('/').length - 1;
  if (address.includes('github.com/') && numberOfSlashes !== 2 && lastAddressPartLength) {
    return true;
  }
  return false;
};
