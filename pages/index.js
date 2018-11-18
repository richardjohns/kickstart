import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout'
import { Link, Route } from '../routes'

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
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
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
                <div>{this.renderCampaigns()}</div>
                <Link route="/campaigns/new">
                    <Button content="Create Campaign" icon="add" primary style={{ marginTop: '10px' }} />
                </Link>
            </div>
        </Layout>
        )
    }
}

export default CampaignIndex;