import React, { Component } from "react"
import axios from "axios"
import UserContext from '../context/UserContext'
import { Link } from "react-router-dom"
import { Typography, Table, Input, Button, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography

class GameTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: [],
            searchText: '',
            searchedColumn: '',
        }
    }

    static contextType = UserContext

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
                this.setState({ games: games })
            })
    }

    deleteGame = idGame => {
        const [user, , , setAlert] = this.context
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${idGame}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {

                var newGames = this.state.games.filter(x => x.id !== idGame)
                this.setState({ games: newGames })
                setAlert("successdelete")
            })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
          </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
          </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '30%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Platform',
                dataIndex: 'platform',
                filters: [
                    {
                        text: 'PC',
                        value: "PC",
                    },
                    {
                        text: 'Playstation',
                        value: "Playstation",
                    },
                    {
                        text: 'Xbox',
                        value: "Xbox",
                    },
                    {
                        text: 'Nintendo',
                        value: "Nintendo",
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.platform.indexOf(value) === 0,
                sorter: (a, b) => a.platform.length - b.platform.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Genre',
                dataIndex: 'genre',
                filters: [
                    {
                        text: 'Fighting',
                        value: 'Fighting',
                    },
                    {
                        text: 'Action',
                        value: 'Action',
                    },
                    {
                        text: 'Adventure',
                        value: 'Adcenture',
                    },
                    {
                        text: 'Horror',
                        value: 'Horror',
                    },
                    {
                        text: 'Strategy',
                        value: 'Strategy',
                    },
                    {
                        text: 'Open World',
                        value: 'Open World',
                    },
                    {
                        text: 'RPG',
                        value: 'RPG',
                    },
                    {
                        text: 'Arcade',
                        value: 'Arcade',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.genre.indexOf(value) === 0,
                sorter: (a, b) => a.genre.length - b.genre.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Player',
                dataIndex: 'singlePlayer',
                filters: [
                    {
                        text: 'Single Player',
                        value: 1,
                    },
                    {
                        text: 'Multi Player',
                        value: 0,
                    }
                ],
                render: (value) => value === 1 ? "Single Player" : "Multi Player",
                filterMultiple: false,
                onFilter: (value, record) => record.singlePlayer === value,
                sorter: (a, b) => a.singlePlayer - b.singlePlayer,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Release Year',
                dataIndex: 'release',
                filters: [
                    {
                        text: '> 1990',
                        value: 1990,
                    },
                    {
                        text: '> 2000',
                        value: 60,
                    },
                    {
                        text: '> 2010',
                        value: 2010,
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.release > value,
                sorter: (a, b) => a.release - b.release,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Action',
                dataIndex: 'id',
                render: (record) => (
                    <Space size="middle">
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteGame(record)}>
                            <Button>Delete</Button>
                        </Popconfirm>
                        <Button><Link to={`/editgame/${record}`}>Edit</Link></Button>
                    </Space>
                ),
            },
        ];


        return (
            <>
                <Title>Game Table</Title>
                <Table bordered columns={columns} dataSource={this.state.games} />
            </>
        )
    }

}

export default GameTable