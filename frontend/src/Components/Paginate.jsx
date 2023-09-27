import React from "react";
import {Pagination} from 'react-bootstrap'
import {LinkContainor} from 'react-router-bootstrap'

const Paginate = ({pages, page, keyword='', isAdmin=false}) => {

    return(
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) =>(
                    <LinkContainor
                    key={x +1}
                    to={!isAdmin ?
                        `/?keyword=${keyword}&page=${x+1}`
                        : `/admin/productlist/?keyword=${keyword}&page=${x+1}`
                    }
                >
                        <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>

                    </LinkContainor>
                ))}
            </Pagination>
        )
        
    )

}


export default Paginate;