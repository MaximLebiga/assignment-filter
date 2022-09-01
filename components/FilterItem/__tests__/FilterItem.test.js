import { cleanup, render, screen } from "@testing-library/react"
import FilterItem from "../FilterItem"
import '@testing-library/jest-dom'

afterEach(() => {
  cleanup()
})

describe('filter item', () => {
  it('render filter item', () => {
    render(<FilterItem title="black" active={false}/>)
    
    expect(screen.getByTestId('filter-item')).toBeInTheDocument()
  })

  it('includes active styles if active', () => {
    render(<FilterItem title="black" active={true}/>)

    expect(screen.getByTestId('filter-item').className).toEqual(
      expect.stringContaining('bg-gray-400')
    )
  })

  it('not includes active styles if non-active', () => {
    render(<FilterItem title="black" active={false} />)

    expect(screen.getByTestId('filter-item').className).not.toEqual(
      expect.stringContaining('bg-gray-400')
    )
  })
})
