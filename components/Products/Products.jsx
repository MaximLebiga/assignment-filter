import { useEffect, useReducer, useState } from "react"
import { changeParams, filter, getAllFilters, removeOrAddElemToArray } from '../../utils'
import FilterItem from "../FilterItem/FilterItem"
import { useRouter } from 'next/router'
import DropdownFilter from "../DropdownFilter/DropdownFilter"
import ProductItem from "../ProductItem/ProductItem"
import useSWR from "swr"
import { fetcher } from "../../api"

const step = 16
const URL = 'http://localhost:3001/data'

export default function Products() {
  const router = useRouter()
  const { query } = router
  const [filters, setFilters] = useState({
    tags: [],
    colors: [],
    prices: [],
  })
  const [productsForRender, setProductsForRender] = useState([])
  const [range, setRange] = useState({from: 0, to: step})

  const { data } = useSWR(URL, fetcher)

  const handlePrevPageClick = () => {
    setRange(prevState => {
      const result = {
        from: prevState.from - step,
        to: prevState.to - step
      }
      if (result.from < 0) {
        return prevState
      }

      return result
    })
  }

  const handleNextPageClick = () => {
    setRange((prevState) => {

      if (prevState.to > productsForRender.length - 1) {
        return prevState
      }

      return {
        from: prevState.from + step,
        to: prevState.to + step
      }
    })
  }

  const handleTagClick = (tag) => {
    const result = removeOrAddElemToArray(
      tag,
      query.tags ? query.tags.split(',') : []
    )

    if (result.length === 0) {
      delete query.tags
      changeParams(router, query)
      return
    }

    changeParams(router, { ...query, tags: result.join(',') })
  }

  const handleAllTagClick = () => {
    delete query.tags
    changeParams(router, query)
  }

  useEffect(() => {
    setRange({from: 0, to: step})
  }, [query])

  useEffect(() => {
    if (data?.allContentfulProductPage.edges) {
      setFilters(getAllFilters(data?.allContentfulProductPage.edges))
    }
  }, [data?.allContentfulProductPage.edges])

  useEffect(() => {
    if (data?.allContentfulProductPage.edges) {
      setProductsForRender(filter(query, data?.allContentfulProductPage.edges))
    }
  }, [data?.allContentfulProductPage.edges, query])

  return (
    <div className="bg-white-light px-15 pt-20 pb-20 min-h-screen">
      <div className="relative pl-50 pr-50">
        <div className="grid grid-cols-7 gap-2 mb-20">
          <FilterItem
            title="All"
            onClick={handleAllTagClick}
            active={query?.tags ? false : true}
          />
          {filters.tags &&
            filters.tags.map((tag, index) => (
              <FilterItem
                key={index}
                title={tag}
                onClick={() => handleTagClick(tag)}
                active={query?.tags?.split(',').includes(tag)}
              />
            ))}
        </div>
        <DropdownFilter colors={filters.colors} />
      </div>
      <div className="grid grid-cols-4 gap-x-15.75 gap-y-10.25 mb-9">
        {productsForRender.length > 0 &&
          productsForRender
            .slice(range.from, range.to)
            .map((product) => (
              <ProductItem product={product} key={product.node.name} />
            ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          disabled={range.from === 0}
          onClick={handlePrevPageClick}
          className="mr-3 w-6 h-6 flex items-center justify-center rounded-full bg-white"
        >
          &lt;
        </button>
        <button
          disabled={range.to >= productsForRender.length}
          onClick={handleNextPageClick}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-white"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}