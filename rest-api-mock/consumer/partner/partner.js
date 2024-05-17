class Partner {
  constructor(id, name, role, taxStatus, contactName, contactEmailAddress, contactPhoneNumber, address ) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.taxStatus = taxStatus || 'n/a';
    this.contactName = contactName;
    this.contactEmailAddress = contactEmailAddress;
    this.contactPhoneNumber = contactPhoneNumber;
    this.address = {
      '@type': 'Address',
      houseNumber: address.houseNumber || null,
      street: address.street || null,
      postcode: address.postcode,
      city: address.city || null,
      district: address.district || null,
      county: address.county,
      state: address.state,
      stateCode: address.stateCode,
      country: address.country,
      countryCode: address.countryCode,
    };
  }
}

module.exports = {
  Partner,
};
