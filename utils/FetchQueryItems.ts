import React from 'react'

const FetchQueryItems = async(tag:string, filter:string) => {
    const theQuery = `*[_type=='product' ${tag && `&& '${tag}' in categories[]._ref `}] ${filter && `| order(${filter})`} `
    console.log(theQuery)
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchQueryItems`, {
        body:theQuery,
        method:'POST'
    })
    const data = await resp.json()
    return data
}

export default FetchQueryItems