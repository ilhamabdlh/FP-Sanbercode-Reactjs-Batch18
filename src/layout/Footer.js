import React from 'react';
import { Layout } from 'antd'

const Footer = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ 
                color: 'white',
                textAlign: 'center',
                position: "fixed",
                bottom: 0, width: "100%",
                height: '20px',
                backgroundColor: "grey" }}>
                ©2020 Created by Ilham Abdullah
            </Footer>
        </>
    )
}
export default Footer;