import React, { Component } from 'react';
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory';

import { Button, Form, Input } from 'semantic-ui-react'

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: ''
    }

    onSubmit = async event => {
        event.preventDefault();
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