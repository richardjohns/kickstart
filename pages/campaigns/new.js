import React, { Component } from 'react';
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory';

import { Button, Form, Input } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: ''
    }

    onSubmit = async event => {
        event.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution({
                from: accounts[0]
            }))
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
    }

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Contribute the minimum donation to start your campaign!</label>
                        <Input 
                            label="Wei" 
                            labelPosition="right" 
                            value={this.state.minimumContribution} 
                            onChange={event => this.setState({minimumContribution: event.target.value})} 
                        />
                    </Form.Field>
                    <Button primary>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew