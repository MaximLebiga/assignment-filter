import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import DropdownFilter from "../DropdownFilter"

const colors = ['black', 'red', 'white']

afterEach(() => {
  cleanup()
})

describe('dropdown filter', () => {
  it('render dropdown filter without colors', () => {
    render(<DropdownFilter />)

    expect(screen.getByTestId('filter')).toBeInTheDocument()
  })

  it('render dropdown filter with colors', () => {
    render(<DropdownFilter colors={colors}/>)

    expect(screen.getByTestId('filter')).toBeInTheDocument()
  })


  it('open and close dropdown filter', () => {
    render(<DropdownFilter />)

    expect(screen.queryByTestId('dropdown')).toBeNull()

    fireEvent.click(screen.getByTestId('filter-button'))

    expect(screen.queryByTestId('dropdown')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('filter-button'))

    expect(screen.queryByTestId('dropdown')).toBeNull()
  })
})