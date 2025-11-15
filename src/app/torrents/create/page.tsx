"use client";
import * as React from "react";
import {Form, Container} from 'react-bootstrap'
import "./style.scss";
import {useState, useEffect, useCallback, ChangeEvent} from "react";
import {useFetch} from "@/lib/api";
import {FIELDS} from '@/constants'
import {Subcategory, Category, Language} from "@/types";

type FormData = {
    language: '',
    category: '',
    subcategory: '',
    description: '',
}

export default function TorrentDetail() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [formData, setFormData] = useState<FormData>({
        language: '',
        category: '',
        subcategory: '',
        description: '',
    });
    const {fetchApi} = useFetch();
    const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);


    useEffect(() => {
        async function fetchData() {
            const [fetchSubcategories, fetchLanguages] = await Promise.all([
                fetchApi<Subcategory[]>(FIELDS.SUBCATEGORIES),
                fetchApi<Language[]>(FIELDS.LANGUAGES),
            ]);
            setCategories(
                Array.from(
                    new Map(
                        fetchSubcategories.map(subcategory => [subcategory.category.id, subcategory.category])
                    ).values()
                )
            );
            setSubcategories(fetchSubcategories);
            setLanguages(fetchLanguages);
        }

        fetchData();
    }, []);

    const handleDataChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>, field: keyof FormData) => {
            setFormData(prev => ({
                ...prev,
                [field]: event.target.value
            }));

            if (field === 'category') {
                setFilteredSubcategories(
                    subcategories.filter(sub => sub.category.id === event.target.value)
                );
            }
        },
        [subcategories]
    );


    return (<>
        <span className="title">Uploader un Torrent</span>
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Control type="text" placeholder="Title"/>
                </Form.Group>
                {languages.length > 0 && (<Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Languages</Form.Label>
                    <Form.Select defaultValue="">
                        <option disabled={true} value="">Select a language</option>
                        {languages.map((language: Language) => (
                            <option key={language.id} value={language.id}>{language.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>)}

                {categories.length > 0 && (<Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Categories</Form.Label>
                    <Form.Select defaultValue=""
                                 onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDataChange(e, FIELDS.CATEGORY)}>
                        <option disabled={true} value="">Select a category</option>
                        {categories.map((category: Category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>)}

                {subcategories.length > 0 && (<Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Subcategories</Form.Label>
                    <Form.Select defaultValue=""
                                 onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDataChange(e, FIELDS.SUBCATEGORY)}>
                        <option disabled={true} value="">Select a subcategory</option>
                        {filteredSubcategories.map((subcategory: Subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>)}

            </Form>
        </Container>
    </>)
}