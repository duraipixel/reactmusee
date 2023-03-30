import { useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export const TestimonialImage = ({itemImage}) => {
    const [imageLoad, setImageLoad] = useState(false);

    function onLoad() {
        setImageLoad(true);
    }

    return (
      <>
        <img src={itemImage} width="50px" />   
      </>
          
    )
}
