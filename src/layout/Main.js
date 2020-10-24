import React from "react"
import Header from './Header'
import Content from './Content'
import { BrowserRouter as Router } from "react-router-dom";

const Main = () => {
    return (
        <>
            <Router>
                <Header />
                <Content />
            </Router>
        </>
    )
}

export default Main