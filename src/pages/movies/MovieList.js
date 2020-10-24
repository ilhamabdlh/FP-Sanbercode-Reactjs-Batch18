import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Typography, Card, Col, Row, Image, Space } from 'antd';

const { Title, Text } = Typography

function minuteToHours(num) {
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return (rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}


class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                let movies = res.data.map(el => {
                    return {
                        id: el.id,
                        title: el.title,
                        rating: el.rating,
                        duration: el.duration,
                        genre: el.genre,
                        description: el.description,
                        image_url: el.image_url,
                        year: el.year,
                        review: el.review
                    }
                })
                this.setState({ movies })
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
                <Title> Movie List </Title>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {
                            this.state.movies !== null && this.state.movies.map((item) => {
                                return (
                                    <Col xs={{ span: 12, offset: 1 }} lg={{ span: 6 }}>
                                        <Space direction="vertical">
                                            <Card hoverable title={item.title} extra={<Link to={`/singlemovie/${item.id}`}>Detail</Link>} bordered={true} style={{ height: '480px' }} headStyle={{ backgroundColor: "#191C3A", color: "white" }} bodyStyle={{ backgroundColor: "#EEECEC" }}>
                                                <div style={container}>
                                                    <Image width={200} height={300} src={item.image_url} />
                                                    <div className="colum">
                                                        <strong style={{ width: "100px" }}>Rating: </strong> <Text underline> {item.rating} </Text> <br />
                                                        <strong style={{ width: "100px" }}>Duration: </strong> <Text underline> {minuteToHours(item.duration)} </Text> <br />
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

export default MovieList