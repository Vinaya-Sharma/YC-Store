import React from 'react'

const FetchHeros = async() => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchHeros`, {method:'POST'})
  const data = await resp.json()
  return data
}

export default FetchHeros