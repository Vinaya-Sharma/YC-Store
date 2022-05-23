import React from 'react'

const FetchCategories = async() => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchCategories`, {method:'POST'})
  const data = await resp.json()
  return data
}

export default FetchCategories