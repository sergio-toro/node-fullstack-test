/**
 * gets icon from conversion object
 * @param  {String} options.status Conversion status
 * @return {String}                font-awesome icon name
 */
export const getIcon = ({ status }) => {
  return status === 'processed' ? 'check' : 'info'
}

/**
 * gets the description from conversion object
 * @param  {String} options.name   Conversion name
 * @param  {String} options.status Conversion status
 * @return {String}                human readable conversion status
 */
export const getDescription = ({ name, status }) => {
  if (status === 'processed') {
    return `Request '${name}' processed`
  }
  return `Request '${name}' started processing`
}
