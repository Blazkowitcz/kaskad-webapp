"use client";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, Container, Nav, Form, InputGroup, Button} from "react-bootstrap";
import {AuthContextProvider} from "@/app/context/AuthContext";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Navbar expand="lg" className="navbar">
            <Container fluid>
                <Navbar.Brand href="/">Kaskad</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/torrents">Torrents</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="btn btn-primary" href="/torrents/create">Upload Torrent</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <InputGroup>
                            <Form.Control
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </InputGroup>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <AuthContextProvider>{children}</AuthContextProvider>
        </body>
        </html>
    );
}