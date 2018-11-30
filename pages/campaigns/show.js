import React, { Component } from 'react'
import Layout from '../../components/Layout'

class CampaignShow extends Component {
    static async getInitialProps(props) {
        console.log(props.query.address) // may only show in nextjs console

        return {}
    }

    render() {
        return (
        <Layout>
            <h3>Campaign Show</h3>
        </Layout>
        
        )

    }
}

export default CampaignShow;