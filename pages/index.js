import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    // Can't use async componentDidMount to ask Next.js to call data from contract. 
    // Need to use Next's getInitialProps. Next server executes just getInitialProps to load data without having 
    // to render component which requires a lot of resources. 'static' attaches the props to the component class.
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        return { campaigns }
    }

    render() {
        return <div>{this.props.campaigns[0]}</div>
    }
}

export default CampaignIndex;