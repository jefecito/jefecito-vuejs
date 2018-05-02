import moment from 'moment'

moment.locale('es')

export const dateCountdown = (date) => {
  return moment(new Date()).to(date)
}

export const diffDates = (date) => {
  const init = moment(new Date()).format('X')
  const end = moment(date).format('X')
  return init - end
}
