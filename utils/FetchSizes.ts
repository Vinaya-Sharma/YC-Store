import React from 'react'
import {size } from '../typings'

const FetchSizes = async(sizes:string[]) => {

    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchSizes`, {
        body: JSON.stringify(sizes),
        method:'POST'
    })

    return(resp)
}

export default FetchSizes