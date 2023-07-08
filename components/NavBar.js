/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar className="nav-bar-border" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="nav-cont">
        <Link passHref href="/">
          <Navbar.Brand className="nav-header">Rare Media Enterprises</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link className="nav-lnk">home</Nav.Link>
            </Link>
            <Link passHref href="/posts/post">
              <Nav.Link className="nav-lnk">posts</Nav.Link>
            </Link>
            <Link passHref href="/rareUsers/">
              <Nav.Link className="nav-lnk">users</Nav.Link>
            </Link>
            <Link passHref href="/rareUsers/profile">
              <Nav.Link className="nav-lnk">profile</Nav.Link>
            </Link>
            <SearchBar className="me-3" />
            <Button className="nav-btn" variant="light" onClick={signOut}>
              sign out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
