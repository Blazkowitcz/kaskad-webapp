"use client"
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, Container, Nav, NavDropdown, Form, InputGroup} from "react-bootstrap"
import {AuthContextProvider} from "@/app/context/AuthContext";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Navbar expand="lg" className="bg-body-tertiary test">
            <Navbar.Brand href="/">Kaskad</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/torrents">Torrents</Nav.Link>
                    <Form>
                        <InputGroup>
                            <Form.Control placeholder={`Search`} aria-label="Search"/>
                        </InputGroup>
                    </Form>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <AuthContextProvider>{children}</AuthContextProvider>
        </body>
        </html>
    );
}
