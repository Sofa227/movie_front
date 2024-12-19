import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import Search from "../search/Search";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
 
    const handleLogout = () => {
        setIsAuthenticated(false);
<<<<<<< Updated upstream
        localStorage.removeItem('username'); // Удаляем username из localStorage при выходе
=======
        localStorage.removeItem('username');
>>>>>>> Stashed changes
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":'gold'}}>
                    <FontAwesomeIcon icon ={faVideoSlash}/>Globus Film Voyage
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className ="nav-link" to="/">Главная</NavLink>
                    <NavLink className ="nav-link" to="/watchList">Список желаний</NavLink> 
                    <Search/>     
                    </Nav>
                    {isAuthenticated ? (
<<<<<<< Updated upstream
                        <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
=======
                        <Button variant="outline-info" onClick={handleLogout}>Выйти</Button>
>>>>>>> Stashed changes
                    ) : (
                        <>
                            <NavLink style={{marginRight: 15}} className="nav-link" to="/login">Войти</NavLink>
                            <NavLink className="nav-link" to="/register">Регистрация</NavLink>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
<<<<<<< Updated upstream

export default Header

=======
export default Header
>>>>>>> Stashed changes
