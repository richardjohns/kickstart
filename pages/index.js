import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout'

class CampaignIndex extends Component {
    // Can't use async componentDidMount to ask Next.js to call data from contract. 
    // Need to use Next's getInitialProps. Next server executes just getInitialProps to load data without having 
    // to render component which requires a lot of resources. 'static' attaches the props to the component class.
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        return { campaigns }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }
    render() {
        return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"></link>
                <div>{this.renderCampaigns()}</div>
                <Button content="Create Campaign" icon="add" primary style={{ marginTop: '10px' }} />
            </div>
        </Layout>
        )
    }
}

export default CampaignIndex;