import React from 'react'

const FixedBottomBar = () => {
    return (
        <div className='lg:hidden fixed bottom-0 w-full flex bg-orange-500 p-6 flex-row justify-between items-center'>
            <div className='flex flex-col'>
                <p className='text-sm text-white font-medium'>Total Amount</p>
                <p className='text-xl font-bold text-white'>#200,000</p>
            </div>
            <button className='bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors'>
                Checkout
            </button>
        </div>
    )
}

export default FixedBottomBar