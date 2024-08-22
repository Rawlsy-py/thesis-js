// eslint-disable-next-line @typescript-eslint/no-explicit-any
const json = (param: any): any => {
  return JSON.stringify(param, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
}

export default json
