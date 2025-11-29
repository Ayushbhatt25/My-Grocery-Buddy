import React from 'react'
import ProductCart from './ProductCart'
import { useAppContext } from '../context/AppContext'

function BestSeller() {
  const { products } = useAppContext();
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='flex overflow-x-auto gap-4 mt-6 pb-4 scrollbar-hide'>
        {products.filter((product) => product.inStock).slice(0, 10).map((product, index) => (
          <div key={index} className="min-w-[200px] md:min-w-[240px]">
            <ProductCart product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestSeller
