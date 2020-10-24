import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Card, PageHeader, Descriptions } from 'antd';

const { Meta } = Card;

const SingleMovie = () => {
    let { id } = useParams();
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        if (movie === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
                .then(res => {
                    setMovie(res.data)
                    console.log(movie)
                })
        }
    })

    return (
        <>
            {
                movie !== null &&
                <>
                    <div className="site-page-header-ghost-wrapper">
                        <PageHeader
                            ghost={true}
                            onBack={() => window.history.back()}
                            title={movie.title}
                            style={{ margin: "0 auto" }}
                        >
                            <Descriptions size="small" column={2}>
                                <Descriptions.Item label="Genre">{movie.genre}</Descriptions.Item>
                                <Descriptions.Item label="Rating">{movie.rating}</Descriptions.Item>
                                <Descriptions.Item label="Duration">{movie.duration}</Descriptions.Item>
                                <Descriptions.Item label="Year">{movie.year}</Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                    </div>
                    <Card
                        hoverable
                        style={{ width: 350, margin: "0 auto" }}
                        cover={<img alt="example" src={movie.image_url} />}
                    >
                        <Meta title="Deskripsi" description={movie.description} />
                    </Card>
                </>
            }
        </>
    )
}

export default SingleMovie