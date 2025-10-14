"use client"
import {Card, Form, Container, Button} from "react-bootstrap";
import {useState, FormEvent} from "react";
import { useRouter } from 'next/navigation';
import './style.scss'

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const connectionHandler = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
            credentials: 'include'
        });

        if (!response.ok) {
            return;
        }
        router.push('/');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="signin-card">
                <Card.Body>
                    <Card.Title className="mb-4 text-center">Connexion</Card.Title>
                    <Form onSubmit={connectionHandler}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Connexion
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
