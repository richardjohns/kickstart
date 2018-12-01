import React, { Component } from 'react'
import { Form, Input, Message, Button, Table } from 'semantic-ui-react'
import web3 from '../../../ethereum/web3'
import Layout from '../../../components/Layout'
import { Router, Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

    static async getInitialProps(props) {
        const { address } = props.query
        const campaign = Campaign(address)
        const requestCount = await campaign.methods.getRequestsCount.call() 

        const requests = await Promise.all(
            Array(requestCount).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        )
        console.log('This is requests: ',requests)

        return { address, requests, requestCount }
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                        key={index}
                        request={request}
                        index={this.props.address}
                    />
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Create New Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalise</HeaderCell>

                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </Layout>
        )
    }
}

export default RequestIndex