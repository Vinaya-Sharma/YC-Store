export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'completeOrder',
        title: 'CompleteOrder',
        type: 'array',
        of: [{
            type: 'string',
        }]
      },
      {
        name: 'user',
        title: 'User',
        type: 'reference',
        to: {
            type: 'user'
        }
    },
    {
      name: 'paid',
      title: 'Paid',
      type: 'boolean',
  }
]}
  