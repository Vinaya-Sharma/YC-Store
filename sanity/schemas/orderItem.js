export default {
    name: 'orderItem',
    title: 'OrderItem',
    type: 'document',
    fields: [
      {
        name: 'product',
        title: 'Product',
        type: 'reference',
        to: {
            type: 'product'
        }
      },
      {
        name: 'size',
        title: 'Size',
        type: 'reference',
        to: {
            type: 'sizeVariant'
        }
      },
      {
        name:'quantity',
        title:'Quantity',
        type:'number'
      },
      {
        name:'user',
        title:'User',
        type:'reference',
        to:{
          type:'user'
        }
      },
      {
        name:'placed',
        title:'Placed',
        type:'boolean'
      }
]}
  