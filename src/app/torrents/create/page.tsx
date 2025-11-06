"use client";
import * as React from "react";
import {Form, Container} from 'react-bootstrap'
import "./style.scss";
import {useState, useEffect, useCallback, ChangeEvent} from "react";
import {useFetch} from "@/lib/api";
import {FIELDS} from '@/constants'

export default function TorrentDetail({params}) {
    const [languages, setLanguages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    const formData = {
        language: '',
        category: '',
        subcategory: '',
        description: '',
    }

    useEffect(() => {
        async function fetchData() {
            const [fetchSubcategories, fetchLanguages] = await Promise.all([
                useFetch(FIELDS.SUBCATEGORIES),
                useFetch(FIELDS.LANGUAGES),
            ]);
            setCategories(Array.from(
                new Map(
                    fetchSubcategories.map(subcategory => [subcategory.category.id, subcategory.category])
                ).values()
            ));
            setSubcategories(fetchSubcategories);
            setLanguages(fetchLanguages);
        }

        fetchData();
    }, []);

    const handleDataChange = useCallback((event: ChangeEvent, field: string) => {
        formData[field] = event.target.value as string;
        if (field === FIELDS.CATEGORY) {
            setFilteredSubcategories(subcategories.filter((subcategory) => subcategory.category.id === event.target.value));
        }
    }, [formData, subcategories])

    return (<>
        <span className="title">Uploader un Torrent</span>
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Control type="text" placeholder="Title"/>
                </Form.Group>
                {languages.length > 0 && (<Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Languages</Form.Label>
                    <Form.Select>
                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>{language.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>)}

                {categories.length > 0 && (<Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Categories</Form.Label>
                    <Form.Select onChange={(e: ChangeEvent) => handleDataChange(e, FIELDS.CATEGORY)}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>)}

                {subcategories.length > 0 && (<Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Subcategories</Form.Label>
                    <Form.Select onChange={(e: ChangeEvent) => handleDataChange(e, FIELDS.SUBCATEGORY)}>
                        {filteredSubcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>)}

            </Form>
        </Container>
    </>)
}