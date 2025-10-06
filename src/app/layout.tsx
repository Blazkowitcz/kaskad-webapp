"use client"
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, Container, Nav, NavDropdown, Form, InputGroup} from "react-bootstrap"
import {Input} from "postcss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
          <Navbar.Brand href="#home">Kaskad</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
      </Container>
      </Navbar>
        {children}
      </body>
    </html>
  );
}
