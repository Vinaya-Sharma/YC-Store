export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'bestSeller',
      title: 'Best Seller',
      type: 'boolean',
      options: {
        default: false
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'blurb',
      title: 'Blurb',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'category'},
        },
      ],
    },
    {
      name:'cost',
      title:'Cost',
      type:'number'
    },
    {
      name:'img',
      title:'Img',
      type:'string'
    },
    {
      name:'size',
      title:'Size',
      type:'array',
      of: [{
        type:'reference',
        to:{
          type:'sizeVariant'
        }
      }]
    }
  ],
}
