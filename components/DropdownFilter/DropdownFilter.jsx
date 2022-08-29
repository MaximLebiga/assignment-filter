import { useRouter } from "next/router";
import { useState } from "react";
import Cross from "../../icons/Cross";
import { changeParams, removeOrAddElemToArray } from "../../utils";
import FilterItem from "../FilterItem/FilterItem";

export default function DropdownFilter({ colors, setFirstPage}) {
  const router = useRouter()
  const { query } = router
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (e) => {
    const result = removeOrAddElemToArray(
      e.target.value,
      query.prices ? query.prices.split(',') : []
    )

    if (result.length === 0) {
      delete query.prices
      changeParams(router, query)
      return
    }
    changeParams(router, { ...query, prices: result.join(',') })
    setFirstPage()
  }

  const handleColorClick = (color) => () => {
    const result = removeOrAddElemToArray(
      color,
      query.colors ? query.colors.split(',') : []
    )

    if (result.length === 0) {
      delete query.colors
      changeParams(router, query)
      return
    }
    changeParams(router, { ...query, colors: result.join(',') })
    setFirstPage()
  }

  const handeClearButtonClick = () => {
    delete query.colors
    delete query.prices
    changeParams(router, query)
    setFirstPage()
  }

  return (
    <div className="absolute top-0 right-0 flex flex-col items-end">
      <button onClick={() => setIsOpen((prevState) => !prevState)}>
        FILTERS
      </button>
      {isOpen && (
        <div className="bg-white p-15 w-135 relative mt-7 z-10 flex flex-col items-center">
          <div className="absolute top-5 right-5 flex items-center">
            <button className="mr-6 text-13.1 font-normal" onClick={handeClearButtonClick}>CLEAR FILTER</button>
            <button onClick={() => setIsOpen((prevState) => !prevState)}>
              <Cross />
            </button>
          </div>
          <p className="mb-3 text-13.1">COLOUR</p>
          {colors.length > 0 && (
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color, index) => (
                <FilterItem
                  key={index}
                  title={color}
                  onClick={handleColorClick(color)}
                  active={query?.colors?.split(',').includes(color)}
                />
              ))}
            </div>
          )}
          <p className="mb-3 mt-4 text-13.1">PRICE</p>
          <div className="flex space-x-5">
            <label className="flex items-center">
              &euro;0-&euro;250
              <input
                value={'0-250'}
                type="checkbox"
                className="ml-1"
                onChange={handleInputChange}
                checked={query?.prices ? query.prices.includes('0-250') : false}
              />
            </label>
            <label className="flex items-center">
              &euro;250-&euro;400
              <input
                value={'250-400'}
                type="checkbox"
                className="ml-1"
                onChange={handleInputChange}
                checked={
                  query?.prices ? query.prices.includes('250-400') : false
                }
              />
            </label>
            <label className="flex items-center">
              &euro;400+
              <input
                value={'400+'}
                type="checkbox"
                className="ml-1"
                onChange={handleInputChange}
                checked={query?.prices ? query.prices.includes('400+') : false}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}