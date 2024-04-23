import React,{useState,useEffect, useRef} from "react";
import {Button,Container,Form,Nav,Navbar,NavDropdown,Offcanvas,Row,Col,Dropdown,Card,ListGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { searchUsers, searchCompanies } from "./Search";
import '../../../static/css/NavBar.css'

import { User, Company } from "../Profiles/Profile";

const SearchBar = () => {
    const [searchValue, setSearch] = useState('');
    const cardRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {document.removeEventListener("click", handleClickOutside);};
      }, []);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsFocused(false);
        }
    };
    const handleSearch = (event) => setSearch(event.target.value);
 

    const [users, setUsers] = useState([])
    const [companies, setCompanies] = useState([])

    useEffect( () => {
        if(searchValue) {
            searchUsers(searchValue, setUsers)
            searchCompanies(searchValue,setCompanies)
        }
    },[searchValue])

    return(<>
        <Form className='searchbar'  ref={cardRef}>
            <Form.Group className="m-2">
                <Form.Control onFocus={handleFocus}type="search"  placeholder="Search"  className="me-2"  aria-label="Search" value={searchValue} onChange={handleSearch} required  />
            </Form.Group>
            {
                isFocused && searchValue && (
                    <Card className="results">
                        <Card.Header>Users</Card.Header>
                        {users?.length > 0 ? (
                            <div className="search-results">
                                    <ListGroup variant="flush">
                                        {users?.map((result) => (<ListGroup.Item key={result.id}>
                                            <User user={{ ...result, name: result.firstname + ' ' + result.lastname }} />
                                        </ListGroup.Item>))}
                                    </ListGroup>
                            </div>
                        ):(<p>No users found</p>)}
                                    <Card.Header>Companies</Card.Header>
                        {companies?.length > 0 ? (
                            <div className="search-results">
                                    <ListGroup variant="flush">
                                        {companies?.map((result) => (<ListGroup.Item key={result}>   
                                            <Company company={result}/>
                                        </ListGroup.Item>))}
                                    </ListGroup>
                            </div>
                        ):(<p>No companies found</p>)}
                    </Card>
                )
            }
                
            
        </Form> 
    </>)
}

export default SearchBar;



