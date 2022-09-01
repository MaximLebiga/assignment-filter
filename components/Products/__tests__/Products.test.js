import '@testing-library/jest-dom'
import { cleanup, screen, render, fireEvent } from '@testing-library/react'
import Products from '../Products'

afterEach(() => {
  cleanup()
})

describe('products', () => {
  it('render products', () => {
    render(<Products />)

    expect(screen.getByTestId('products')).toBeInTheDocument()
  })

  it('render products list after fetch', () => {
    render(<Products />)

    expect(screen.queryByTestId('products-list').toBeNull)

    setTimeout(() => {
      expect(screen.queryByTestId('products-list').toBeInTheDocument())
    }, 100)
  })

  it('render tags list after fetch', () => {
    render(<Products />)
    
    expect(screen.queryByText('Sandals')).toBeNull()

    setTimeout(() => {
      expect(screen.queryByText('Sandals')).toBeInTheDocument()
    }, 100)
  })

  it('change products list after click tag', () => {
    render(<Products />)

    setTimeout(() => {
      const mules = 'Karolina Scotland Road White Leather Mules'
      const sandals = 'Nikki Lime Leather Sandals'
      expect(screen.getByText(mules)).toBeInTheDocument()
      expect(screen.getByText(sandals)).toBeInTheDocument()
      
      fireEvent.click(screen.getByText('Sandals'))

      expect(screen.getByText(sandals)).toBeInTheDocument()
      expect(screen.queryByText(mules)).toBeNull()

      fireEvent.click(screen.getByText('All'))

      expect(screen.getByText(mules)).toBeInTheDocument()
      expect(screen.getByText(sandals)).toBeInTheDocument()
    }, 100)
  })

  it('click next and prev buttons', () => {
    render(<Products />)
    const prevButton = screen.getByTestId('prev-button')
    const nextButton = screen.getByTestId('next-button')

    expect(prevButton.disabled).toBe(true)
    expect(nextButton.disabled).toBe(true)

    setTimeout(() => {
      expect(prevButton.disabled).toBe(true)
      expect(nextButton.disabled).toBe(false)

      fireEvent.click(nextButton)

      expect(prevButton.disabled).toBe(false)
      expect(nextButton.disabled).toBe(false)

      fireEvent.click(prevButton)

      expect(prevButton.disabled).toBe(true)
      expect(nextButton.disabled).toBe(false)
    }, 100)
  })
})