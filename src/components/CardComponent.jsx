import { useNavigate } from "react-router-dom"
import { compile } from 'path-to-regexp';
import { CardActionArea } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function CardComponent({ settings }) {
    const { data, index } = settings
    const navigate = useNavigate()
    const showProduct = (url) => {
        const toProductPath = compile('/product/:product_url/');
        navigate(
            toProductPath({ product_url: url })
        )
    }
    return (
        <div className="arrival-product custom-card" key={index} onClick={() => showProduct(data.product_url)}>
            <CardActionArea>
                <div className="prdt-img">
                    <LazyLoadImage src={data.image} className="product-card-image"/>
                    {
                        data.badge == true ?
                            <div className="ofr-prc">
                                <h5>#{index + 1}</h5>
                            </div>
                            : null
                    }
                </div>
                <div className="trend-access">
                    <div className="ratings d-flex justify-content-between">
                        <div className="prdt-type">
                            {data.category_name}
                        </div>
                    </div>
                    <div className="prdt-nameprc">
                        <h4>{data.product_name}</h4>
                        <h5>
                            {data.sale_prices.strike_rate && data.sale_prices.strike_rate_original > 0 && <span>₹{data.sale_prices.strike_rate}</span>}
                            ₹{data.sale_prices.price}
                        </h5>
                    </div>
                </div>
            </CardActionArea>
        </div>
    )
}

export default CardComponent