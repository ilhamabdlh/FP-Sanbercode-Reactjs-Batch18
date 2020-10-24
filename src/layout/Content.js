import React, { useContext, useState } from "react"
import {
    Switch,
    Route,
    Redirect,
    Link,
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import { FileMarkdownOutlined, RocketOutlined } from '@ant-design/icons';
import Footer from './Footer'
import AlertNotif from '../pages/context/Alert'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import ChangePassword from '../pages/user/ChangePassword'
import Home from '../pages/Home'
import Movies from '../pages/movies/MovieList'
import Games from '../pages/games/GameList'
import SingleMovie from '../pages/movies/SingleMovie'
import SingleGame from '../pages/games/SingleGame'
import MovieTable from '../pages/movies/MovieTable'
import GameTable from '../pages/games/GameTable'
import CreateMovie from '../pages/movies/CreateMovie'
import CreateGame from '../pages/games/CreateGame'
import EditMovie from '../pages/movies/EditMovie'
import EditGame from '../pages/games/EditGame'
import { UserContext } from '../pages/context/UserContext'

const Content = () => {
    const [user, , alert,] = useContext(UserContext)

    const { Content } = Layout;
    const { SubMenu } = Menu;
    const { Sider } = Layout;

    const PrivateRoute = ({ user, ...props }) => {
        if (user) {
            return <Route {...props} />;
        } else {
            return <Redirect to="/login" />;
        }
    };

    const LoginRoute = ({ user, ...props }) =>
        user ? <Redirect to="/" /> : <Route {...props} />;

    const [collapsed, setCollapsed] = useState(true)

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed)
    };


    return (
        <>
            <Layout>
                {
                    user !== null && (
                        <>
                            <Sider
                                className="site-layout-background"
                                collapsible collapsed={collapsed} onCollapse={onCollapse} >
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%', borderRight: 0, marginTop: '50px', backgroundColor:'grey' }}
                                    theme="dark"
                                >
                                    <SubMenu key="sub2" icon={<FileMarkdownOutlined />} title="Movies">
                                        <Menu.Item key="5"><Link to="/movietable">Movie List Table</Link></Menu.Item>
                                        <Menu.Item key="6"><Link to="/createmovie">Tag Your Movie Favorite </Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" icon={<RocketOutlined />} title="Games">
                                        <Menu.Item key="9"><Link to="/gametable">Game List Table</Link></Menu.Item>
                                        <Menu.Item key="10"><Link to="/creategame">Tag Your Game Favorite</Link></Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                        </>
                    )
                }
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 34,
                        marginTop: 15,
                        marginBottom: 4,
                        minHeight: 380,
                        color: 'grey',
                        overflow: 'initial'
                    }}>
                    {alert !== "" && <AlertNotif />}
                    <div className="site-layout-background">
                        <section>
                            <Switch>
                                <Route exact path="/" user={user} component={Home} />
                                <Route exact path="/movie" user={user} component={Movies} />
                                <Route exact path="/game" user={user} component={Games} />
                                <Route exact path="/register" user={user} component={Register} />
                                <Route exact path="/singlemovie/:id" user={user} component={SingleMovie} />
                                <Route exact path="/singlegame/:id" user={user} component={SingleGame} />
                                <LoginRoute exact path="/login" user={user} component={Login} />
                                <PrivateRoute exact path="/changepassword" user={user} component={ChangePassword} />
                                <PrivateRoute exact path="/movietable" user={user} component={MovieTable} />
                                <PrivateRoute exact path="/gametable" user={user} component={GameTable} />
                                <PrivateRoute exact path="/createmovie" user={user} component={CreateMovie} />
                                <PrivateRoute exact path="/creategame" user={user} component={CreateGame} />
                                <PrivateRoute exact path="/editmovie/:id" user={user} component={EditMovie} />
                                <PrivateRoute exact path="/editgame/:id" user={user} component={EditGame} />
                            </Switch>
                        </section>
                    </div>
                </Content>
            </Layout>
            <Footer />
        </>
    )
}

export default Content