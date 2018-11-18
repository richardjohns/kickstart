import React, { Component } from 'react';
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory';

import { Button, Form, Input, Message } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import { Router } from '../../routes'

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: ''
    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' })
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution)
            // note don't haev to specify gas as metamask will auto-calculate.
            .send({
                from: accounts[0]
            })
            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false })
    }

    // error property below is used to show dialogbox - won't show as empty string interpreted as falsie until error recorded. Well... the message component doesn't like strings so coerce to opposite boolean then back again with !!

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Contribute the minimum donation to start your campaign!</label>
                        <Input 
                            label="Wei" 
                            labelPosition="right" 
                            value={this.state.minimumContribution} 
                            onChange={event => this.setState({minimumContribution: event.target.value})} 
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={!!this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew