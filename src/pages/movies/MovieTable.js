import React, { Component } from "react"
import axios from "axios"
import UserContext from '../context/UserContext'
import { Link } from "react-router-dom"
import { Typography, Table, Input, Button, Space, Tooltip, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography

class MovieTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            alert: ''
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

    state = {
        searchText: '',
        searchedColumn: '',
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
    }

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    static contextType = UserContext

    deleteMovie = idMovie => {
        const [user, , , setAlert] = this.context
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {

                var newMovies = this.state.movies.filter(x => x.id !== idMovie)
                this.setState({ movies: newMovies })
                setAlert("successdelete")
            })
    }

    render() {
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                width: '30%',
                ...this.getColumnSearchProps('title'),
            },
            {
                title: 'Description',
                dataIndex: 'description',
                ellipsis: true,
                render: description => (
                    <Tooltip placement="topLeft" title={description}>
                        {description}
                    </Tooltip>
                ),
                sorter: (a, b) => a.description.length - b.description.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Rating',
                dataIndex: 'rating',
                filters: [
                    {
                        text: '> 3',
                        value: 3,
                    },
                    {
                        text: '> 5',
                        value: 5,
                    },
                    {
                        text: '> 8',
                        value: 8,
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.rating > value,
                sorter: (a, b) => a.rating - b.rating,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Genre',
                dataIndex: 'genre',
                filters: [
                    {
                        text: 'Action',
                        value: 'Action',
                    },
                    {
                        text: 'Comedy',
                        value: 'Comedy',
                    },
                    {
                        text: 'Horror',
                        value: 'Horror',
                    },
                    {
                        text: 'Thriller',
                        value: 'Thriller',
                    },
                    {
                        text: 'Animation',
                        value: 'Animation',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.genre.indexOf(value) === 0,
                sorter: (a, b) => a.genre.length - b.genre.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Duration (Minutes)',
                dataIndex: 'duration',
                filters: [
                    {
                        text: '> 30 Menit',
                        value: 30,
                    },
                    {
                        text: '> 1 jam',
                        value: 60,
                    },
                    {
                        text: '> 2 jam',
                        value: 120,
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.duration > value,
                sorter: (a, b) => a.duration - b.duration,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Year',
                dataIndex: 'year',
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
                onFilter: (value, record) => record.year > value,
                sorter: (a, b) => a.year - b.year,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Action',
                dataIndex: 'id',
                render: (record) => (
                    <Space size="middle">
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteMovie(record)}>
                            <Button>Delete</Button>
                        </Popconfirm>
                        <Button><Link to={`/editmovie/${record}`}>Edit</Link></Button>
                    </Space>
                ),
            },
        ];


        return (
            <>
                <Title>Movie Table</Title>
                <Table bordered columns={columns} dataSource={this.state.movies} />
            </>
        )
    }

}

export default MovieTable