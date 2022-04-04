export const validateUserContact = (addressToCheck: string, domain: string): boolean => {
  if (!addressToCheck) return false;
  const splitAddress = addressToCheck.split('/');
  const ArrayLength = splitAddress.length;
  const lastAddressPartLength = splitAddress[ArrayLength - 1].length;
  // const numberOfSlashes = splitAddress.length - 1;
  // if (address.includes('github.com/') && numberOfSlashes !== 2 && lastAddressPartLength) {
  if (addressToCheck.includes(domain) && lastAddressPartLength) {
    return true;
  }
  return false;
};
