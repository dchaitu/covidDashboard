const Numbers = props => {
  const {x} = props
  const y = x.toString()
  let lastThree = y.substring(y.length - 3)
  const otherNumbers = y.substring(0, y.length - 3)
  if (otherNumbers !== '') lastThree = `,${lastThree}`
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
  return res
}
export default Numbers
