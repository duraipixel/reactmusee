import { Button } from "@mui/material"

function BrandCardComponent({ data, onClick }) {
    return (
        <div class="border rounded shadow-sm brand-box carousel-item active carousel-box-overlay">
            <img src={data.sub_category[0].image} class="d-block w-100" alt="..." />
            <div className="carousel-caption p-0">
                <h5 className='mb-2'>{data.sub_category[0].name}</h5>
                <Button variant='outlined' color='light' onClick={() => onClick(data.slug, data.sub_category[0].slug)} >
                    Browse All
                </Button>
            </div> 
        </div>
    )
}

export default BrandCardComponent