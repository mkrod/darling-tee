import { Product } from '@/constants/provider'
import React from 'react'

interface Props {
    data: Product['reviews'] | undefined;
}

const ReviewComponent : React.FC<Props> = ({ data }) : React.JSX.Element => {
    console.log(data)
  return (
    <div>
        { data && data.map((item, index) => (
            <p key={index}>{item.review}</p>
    ))}
    </div>
  )
}

export default ReviewComponent