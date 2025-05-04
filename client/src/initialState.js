
const user = JSON.parse(localStorage.getItem('profile'))

export const initialState = {
    items: [
        {itemName: '', unitPrice: '', quantity: '', discount: ''},
    ],
    total: 0,
    notes: user?.userProfile?.paymentDetails,
    rates: '',
    stickerFee: 0,
    vat:0,
    levy:0,
    stamp:0,
    //artic1
    currency: '',
    invoiceNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Invoice',
    creator: '',
}
