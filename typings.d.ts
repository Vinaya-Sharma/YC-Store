
export interface Order {
    completeOrder: string[],
    user: User,
    _createdAt:string, 
    _id: string
}

export type User = {
    _id: string,
    name: string, 
    img: string, 
    email: string
}

export type orderItem = {
    product: {
        _id: string,
        title: string,
        blurb:string, 
        slug: {
            _type:'slug',
                current:string
        }, 
        tags: string[],
        categories: {
            _key: string,
            _ref: string,
            _type: 'reference'
        }[],
        cost: number,
        img: string,
        size:{
            _key: string,
            _ref: string,
            _type: 'reference'
          }[],
    },
    quantity: number, 
    size: {
        title: string,
        _id:string,
        quantity: number,
        shortForm:string
    },
    user:{
        _id: string,
        name: string, 
        img: string, 
        email: string
    }
}

export interface feature{
    title1:string,
    title2:string, 
    btn:string,
    desc:string, 
    img:string
}

export type itemBody = {
    title: string,
    blurb:string, 
    slug: {
        _type:'slug',
            current:string
    }, 
    tags: string[],
    categories: {
        _key: string,
        _ref: string,
        _type: 'reference'
    }[],
    cost: number,
    img: string,
    size:{
        _key: string,
        _ref: string,
        _type: 'reference'
      }[],
}

//sizeVarient
export interface sizeVarient{
    title: string,
    _id:string,
    quantity: number,
    shortForm:string
}

//size reference type 
export interface size {
    _key: string,
    _ref: string,
    _type: 'reference'
}

export interface Item extends itemBody{
    _createdAt:string, 
    _id: string
} 

export interface CategoryVariant{
    title:string,
    _id:string
}

export interface Category{
    _key: string,
    _ref: string,
    _type: 'reference'
}