import React from 'react';

const AccomodationDetail = (props) => {
    return (
        <div>
            <p>Details</p>
            <p>{props.name}</p>
            <p>{props.address}</p>
            <p>{props.amenities}</p>
            <p>{props.cabGuide}</p>
            <p>{props.foods}</p>
            <p>{props.nearby}</p>
            {/* <p>{props.persons}</p> */}
            <p>{props.price}</p>
        </div>
    )
}

export default AccomodationDetail;