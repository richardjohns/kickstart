import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes'

export default () => {
    return (
        <div className='ui secondary menu' style={{ marginTop: '10px' }}>
            <Link route="/">
                <a className='active item'>CrowdCoin</a>
            </Link>
            <div className='right menu'>
                <div className='item'>
                <div className='ui icon input'>
                    <input type='text' placeholder='Search...' />
                    <i aria-hidden='true' className='search icon' />
                </div>
                </div>
                <Link route="/">
                    <a className='active item'>Campaigns</a>
                </Link>
                <Link route="/campaigns/new">
                    <a className='active item'>+</a>
                </Link>
            </div>
        </div>
    )
}