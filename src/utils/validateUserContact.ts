export const validateUserContact = (addressToCheck: string, domain: string): boolean => {
  if (!addressToCheck) return false;
  const splitAddress = addressToCheck.split('/');
  const ArrayLength = splitAddress.length;
  const lastAddressPartLength = splitAddress[ArrayLength - 1].length;
  return addressToCheck.includes(domain) && lastAddressPartLength !== 0;
};
