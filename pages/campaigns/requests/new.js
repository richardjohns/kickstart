import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'

class RequestNew extends Component {
    static async getInitialProps(props) {
        const { address } = props.query
        return { address }
    }

    render() {
        return (
            <h3>Create a New Request</h3>
            <Form>
                <Form.field>
                    <label>Description</label>
                </Form.field>
                <Form.field>
                    <label>Value in Ether</label>
                </Form.field>
                <Form.field>
                    <label>Recipient</label>
                </Form.field>
            </Form>
        )
    }
}

export default RequestNew