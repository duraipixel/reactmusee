import { useSelector } from 'react-redux';
export const ProductCount = ({ count }) => {
    const filterData = useSelector((state) => state.products);
    return  filterData.products != undefined && <p className="m-0"> Displaying <span className="text-dark">{filterData.products.from}-{filterData.products.to} of {filterData.products.total_count} </span> results </p>
}