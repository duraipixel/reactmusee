import './index.scss';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import CardComponent from '../CardComponent'
function ProductCardGroup() {
    const [isPageLoaded, setIsPageLoaded] = useOutletContext();
    const filterData = useSelector((state) => state.products);
    const products = filterData.products && filterData.products != 'undefined' ? filterData.products.products : []
    if (products && products.length > 0) {
        return products.map((item, i) => <CardComponent settings={{
            data: item,
            index: i,
            badge: false
        }} />)
    }
}

export default ProductCardGroup