export const isIsoDate = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/
  if (!regex.test(date)) return false
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}
