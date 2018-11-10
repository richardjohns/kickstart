import React from 'react'
import { Menu } from 'semantic-ui-react'

export default () => {
    return (
        <div class='ui secondary menu' style={{ marginTop: '10px' }}>
            <a class='active item'>CrowdCoin</a>
            <div class='right menu'>
                <div class='item'>
                <div class='ui icon input'>
                    <input type='text' placeholder='Search...' />
                    <i aria-hidden='true' class='search icon' />
                </div>
                </div>
                <a class='item'>Logout</a>
            </div>
        </div>
    )
}