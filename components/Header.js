import React from 'react'
import { Menu } from 'semantic-ui-react'

export default () => {
    return (
        <div className='ui secondary menu' style={{ marginTop: '10px' }}>
            <a className='active item'>CrowdCoin</a>
            <div className='right menu'>
                <div className='item'>
                <div className='ui icon input'>
                    <input type='text' placeholder='Search...' />
                    <i aria-hidden='true' className='search icon' />
                </div>
                </div>
                <a className='item'>Logout</a>
            </div>
        </div>
    )
}