import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Card, PageHeader, Descriptions } from 'antd';

const { Meta } = Card;

const SingleGame = () => {
    let { id } = useParams();
    const [game, setGame] = useState(null)
    const [player, setPlayer] = useState("")

    useEffect(() => {
        if (game === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
                .then(res => {
                    setGame(res.data)
                    setPlayer(res.data.singlePlayer === 1 ? "Single Player" : "Multi Player")
                })
        }
    })


    return (
        <>
            {
                game !== null &&
                <>
                    <div className="site-page-header-ghost-wrapper">
                        <PageHeader
                            ghost={true}
                            onBack={() => window.history.back()}
                            title={game.name}
                            style={{ margin: "0 auto" }}
                        >
                            <Descriptions size="small" column={3}>
                                <Descriptions.Item label="Genre">{game.genre}</Descriptions.Item>
                                <Descriptions.Item label="Platform">{game.platform}</Descriptions.Item>
                                <Descriptions.Item label="Player">{player}</Descriptions.Item>
                                <Descriptions.Item label="Release Year">{game.release}</Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                    </div>
                    <Card
                        hoverable
                        style={{ width: 350, margin: "0 auto" }}
                        cover={<img alt="example" src={game.image_url} />}
                    >
                        <Meta title="Deskripsi" description={game.description} />
                    </Card>
                </>
            }
        </>
    )
}

export default SingleGame