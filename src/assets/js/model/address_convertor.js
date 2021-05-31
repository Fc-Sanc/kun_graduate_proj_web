export function addressModel(address) {
  let model = {}

  model.id = address.id
  model.address = address.address
  model.phoneNumber = address.phoneNumber
  model.postcode = address.postcode
  model.receiver = address.receiver
  model.isDefault = address.isDefault

  return model
}
