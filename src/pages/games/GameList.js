import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Typography, Card, Col, Row, Image, Space } from 'antd';

const { Title, Text } = Typography

class GameList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let games = res.data.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        genre: el.genre,
                        image_url: el.image_url,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        multiPlayer: el.multiPlayer,
                    }
                })
                this.setState({ games })
            })
    }

    render() {
        const container = {
            padding: "10px",
            display: "flex",
            flexDirection: "column", 
            flexGrow: 1
        }

        return (
            <>
                <Title> Game List </Title>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {
                            this.state.games !== null && this.state.games.map((item) => {
                                return (
                                    <Col xs={{ span: 12, offset: 1 }} lg={{ span: 6 }}>
                                        <Space direction="vertical">
                                            <Card hoverable title={item.name} extra={<Link to={`/singlegame/${item.id}`}>Detail</Link>} bordered={true} style={{ height: '480px' }} headStyle={{ backgroundColor: "#191C3A", color: "white" }} bodyStyle={{ backgroundColor: "#EDEDED" }}>
                                                <div style={container}>
                                                    <Image width={200} height={300} src={item.image_url} />
                                                    <div className="colum">
                                                        <strong style={{ width: "100px" }}>Platform: </strong> <Text underline> {item.platform} </Text> <br />
                                                        <strong style={{ width: "100px" }}>Genre: </strong> <Text underline> {item.genre} </Text> <br />
                                                    </div>
                                                </div>
                                            </Card>
                                        </Space>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                <hr />
            </>
        )
    }
}

export default GameList