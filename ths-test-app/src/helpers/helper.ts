export const getListingAddressFormated = (listingData: any): string => {
  const listingAddress = [listingData?.location?.name, listingData?.location?.countryName]
  return listingAddress.filter(Boolean).join(', ')
}