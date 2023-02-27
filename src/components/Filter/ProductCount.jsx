import { Fragment } from 'react'
import { useSelector } from 'react-redux';

export const ProductCount = ({ count }) => {

    const filterData = useSelector((state) => state.products);

    return (
        <Fragment>
            {
                filterData.products != undefined &&
                <h3> Displaying {filterData.products.from}-{filterData.products.to} of {filterData.products.total_count} results</h3>
            }
            {/* <h3>{count} {count > 1 ? 'Results' : 'Result'  }</h3> */}
        </Fragment>
    )
}
