import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const BrandList = ({brands}) => {
    const slicedArray = brands.slice(0, 12);
    return (
        <Fragment>
            <div className="brands-shots m-0">
                <ul>
                    {
                        slicedArray && slicedArray.map((item, i) => (
                            
                            <li key={item.id}>
                                
                                {/* <Link to={`/products/search?brand=${item.slug}`}> */}
                                <Link to={`/brands/${item.slug}`}>
                                    <img src={item.image} alt={item.title} />
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                            
                        ))
                    }
                </ul>
            </div>
        </Fragment>
    )
}
