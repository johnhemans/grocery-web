export const formatNutrition = attributes => {
  let response = attributes.reduce((result, attr) => {
    if (attr.Name.includes('Total')) {
      if (attr.Name.includes('Per Serve')) {
        formatAttribute(result.values, attr, 'perServe')
      } else if (attr.Name.includes('Per 100')) {
        formatAttribute(result.values, attr, 'perQuantity')
      } else if (attr.Name.includes('Serving Size')) {
        result.servingInfo.size = attr.Value
      } else if (attr.Name.includes('Servings')) {
        result.servingInfo.total = attr.Value
      }
    }
    return result
  }, { servingInfo: {}, values: []})

  response.values = formatEnergyFromList(response.values)
  return response
}

const formatAttribute = (arr, attr, prop) => {
  const name = attr.Name.split('Quantity')[0].trim()
  const existingVal = arr.find(val => val.name === name)
  if (existingVal) {
    existingVal[prop] = attr.Value
  } else {
    arr.push({ name, [prop]: attr.Value })
  }
}

const formatEnergyFromList = values => {
  let energyKj = values.find(x => x.name.includes('Energy'))
  if (energyKj) {
    values = values.filter(x => x.name !== energyKj.name)
    const energyCal = {
      name: 'Energy kcal',
      perServe: energyKj.perServe ? getCalorieString(energyKj.perServe) : '',
      perQuantity: energyKj.perQuantity ? getCalorieString(energyKj.perQuantity) : ''
    }
    values.unshift(energyCal)
    values.unshift(energyKj)
  }
  return values
}

const getCalorieString = valString => {
  const match = valString.match(/[0-9.]+kJ/gi)
  if (!match) {
    return ''
  }
  const calories = Math.round(parseFloat(match[0]) / 4.184)
  return valString.replace(match[0], `${calories}kCal`)
}