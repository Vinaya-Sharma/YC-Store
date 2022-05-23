import React from 'react'
import { CategoryVariant } from '../typings'

const FetchProductCategories = async(categories:string[]) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchProductCategories`, {
        body: JSON.stringify(categories),
        method:'POST'
    })

    return resp
}

export default FetchProductCategories