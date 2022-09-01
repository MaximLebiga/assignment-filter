import ProductItem from "../ProductItem"
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'

const product = {
  node: {
    name: 'Nikki Lime Leather Sandals',
    node_locale: 'en',
    thumbnailImage: {
      file: {
        url: '//images.ctfassets.net/bjhrajhd7nqm/5vl0dwakREcYWdzVGyhVxT/2f1bb7a0ae042011a1ffff3d8f1aff59/miista-nikki-lime-mules-6.jpg'
      }
    },
    colorFamily: [
      {
        name: 'Green'
      }
    ],
    categoryTags: ['Sandals', 'Mid-Heels', 'New Arrivals'],
    shopifyProductEu: {
      variants: {
        edges: [
          {
            node: {
              price: '265.00'
            }
          }
        ]
      }
    }
  }
}

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