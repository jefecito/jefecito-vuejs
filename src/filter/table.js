import moment from 'moment'

export const getValue = (object, key) => {
  const value = key.split('.').reduce((o, i) => o[i], object)

  if (value === undefined) {
    return value
  }

  // Si es Array devuelvo el primer item
  if (value.constructor.name === 'Array') {
    return value[0]
  }

  // Si es objeto devuelvo el primer item
  if (value.constructor.name === 'Object') {
    return value[0]
  }

  // Si es Date devuelvo el primer item
  if (value.constructor.name === 'Date') {
    return moment(value).format('X') * 1000
  }

  return value
}
