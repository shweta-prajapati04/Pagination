import React, { useEffect, useState } from 'react'

export const Product = () => {
  let [product, setProduct] = useState([])
  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState[0]
  const fethchData = async () => {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();
    //console.log(data.products);
    if (data && data.products) {
      setProduct(data.products)
      setTotalPages(data.total)
    }

  }

  const handlePage = (currentPage) => {
    if (currentPage >= 1 && currentPage <= product.length / 10 && currentPage !== page) {
      setPage(currentPage)
    }
  }
  useEffect(() => {
    fethchData();
  }, [])
  return (
    <div>
      <div>Product
        {
          product.length > 0 && (<div className='products'>
            {
              product.slice(page * 10 - 10, page * 10).map((item) => {
                return (
                  <div className='product__single' key={item.id}>
                    <img src={item.thumbnail} alt={item.title}></img>
                    <span>{item.title}</span>
                    <br></br>
                  </div>
                );
              })}

          </div>
          )}

        {
          product.length > 0 && <div className='pagination'>
            <span
              className={page > 1 ? "" : "page_disable"}
              onClick={() => handlePage(page - 1)}>◀ </span>

            {[...Array(product.length / 10)].map((_, i) => {
              return <span
                className={page == i + 1 ? "Page_Selected" : ""}
                onClick={() => handlePage(i + 1)} key={i}>{i + 1}</span>
            })}

            <span className={page < product.length / 10 ? "" : "page_disable"}
              onClick={() => handlePage(page + 1)} >▶</span>
          </div>
        }


      </div>
    </div>
  )
}
