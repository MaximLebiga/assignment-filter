import ProductItem from "../ProductItem"
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import {product} from "../../../mockData"

describe('product item', () => {
  it('render product item', () => {
    render(<ProductItem product={product} />)
    
    expect(screen.getByTestId('product-item')).toBeInTheDocument
    expect(screen.getByRole('img').src).toBeTruthy()
    expect(screen.getByTestId('product-item-price').textContent).toEqual(
      expect.stringContaining('265.00')
    )
    expect(screen.getByTestId('product-item-name').textContent).toBe('Nikki Lime Leather Sandals')
  })
})