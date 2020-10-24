import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../pages/context/UserContext";
import { Layout, Menu, Button, Avatar } from 'antd';

const Header = () => {
    const { Header } = Layout;

    const [user, setUser, , setAlert] = useContext(UserContext)

    let history = useHistory()

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("user")
        setAlert("successlogout")
        history.push("/login")
    }


    return (
        <>
            <Layout>
                <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'grey' }}>
                    <div className="logo" />
                    <Menu style={{backgroundColor:'grey'}} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link style={{color:'whitr'}} to="/">Home</Link></Menu.Item>
                        <Menu.Item key="2"><Link style={{color:'white'}} to="/movie">Movies</Link></Menu.Item>
                        <Menu.Item key="3"><Link style={{color:'white'}} to="/game">Games</Link></Menu.Item>
                        {
                            user === null && (
                                <>
                                    <Menu.Item key="4" style={{ float: 'right' }}><Link style={{color:'white'}} to="/login">Login</Link></Menu.Item>
                                    <Menu.Item key="5" style={{ float: 'right' }}><Link style={{color:'white'}} to="/register">Register</Link></Menu.Item>
                                </>
                            )
                        }
                        {
                            user !== null && (
                                <>
                                    <Menu.Item key="6" style={{ float: 'right' }}>
                                        <Button onClick={handleLogout} >Logout</Button>
                                    </Menu.Item>
                                    <Menu.Item key="7" style={{ float: 'right' }}>
                                        <Link style={{color:'white'}} to="/changepassword">Change Password</Link>
                                    </Menu.Item>
                                    <Menu.Item key="8" style={{ float: 'right' }}>
                                        <Avatar size={40}>{user.name[0]} </Avatar>
                                    </Menu.Item>
                                </>
                            )
                        }
                    </Menu>
                </Header>
            </Layout>,
        </>
    )
}

export default Header


