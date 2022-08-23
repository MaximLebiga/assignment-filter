export const removeOrAddElemToArray = (elem, array) => {
  if (array.includes(elem)) {
    return array.filter((item) => item !== elem)
  } else {
    return [...array, elem]
  }
}

export const getAllFilters = (products) => {
  const result = products.reduce(
    (acc, curr) => {
      const colors = []
      curr.node?.colorFamily?.forEach((color) => colors.push(color.name))
      return {
        tags: curr.node.categoryTags
          ? [...acc.tags, ...curr.node.categoryTags]
          : acc.tags,
        colors: curr.node.colorFamily ? [...acc.colors, ...colors] : acc.colors,
        prices: [
          ...acc.prices,
          curr.node.shopifyProductEu.variants.edges[0].node.price
        ]
      }
    },
    {
      tags: [],
      colors: [],
      prices: []
    }
  )
  return {
    tags: [...new Set(result.tags)],
    colors: [...new Set(result.colors)],
    prices: [...new Set(result.prices)]
  }
}

export const changeParams = (router, params) => {
  router.push(
    {
      query: params
    },
    undefined,
    { shallow: true }
  )
}

export const filter = (query, products ) => {
  const { colors, tags, prices } = query
  const colorsArray = colors?.split(',')
  const tagsArray = tags?.split(',')
  const pricesArray = prices?.split(',').map((price) => {
    if (price.includes('+')) {
      return {
        from: parseFloat(price)
      }
    }
    const array = price.split('-')

    return {
      from: parseFloat(array[0]),
      to: parseFloat(array[1])
    }
  })

  const result = products.filter((product) => {
    const { colorFamily, categoryTags, shopifyProductEu } = product.node

    if (colorsArray) {
      const productColors = []
      colorFamily?.forEach((color) => productColors.push(color.name))

      if (!productColors.some((color) => colorsArray.includes(color))) {
        return false
      }
    }

    if (tagsArray && !categoryTags?.some((tag) => tagsArray.includes(tag))) {
      return false
    }

    if (pricesArray && !filterByPrice(pricesArray, shopifyProductEu)) {
      return false
    }

    return true
  })

  return result
}

const filterByPrice = (pricesArray, productPrice) => {
  return pricesArray.some((price) => {
    if (price.to && price.from >= 0) {
      return (
        parseFloat(productPrice.variants.edges[0].node.price) >= price.from &&
        parseFloat(productPrice.variants.edges[0].node.price) <= price.to
      )
    }

    if (price.from) {
      return parseFloat(productPrice.variants.edges[0].node.price) >= price.from
    }
  })
}
