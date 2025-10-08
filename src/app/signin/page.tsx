"use client"
import {Card, Form, Container, Button} from "react-bootstrap";
import {useState} from "react";

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const connectionHandler = async (e) => {
        e.preventDefault(); // empêche le rechargement de la page

        try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                alert(data.message || 'Erreur de connexion');
                return;
            }

            // Exemple : stocker le token dans le localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('Connexion réussie !');
            }

        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            alert('Impossible de se connecter au serveur.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{width: '30rem'}}>
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
