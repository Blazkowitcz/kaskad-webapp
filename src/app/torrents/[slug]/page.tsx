"use client";
import * as React from "react";
import {useState, useEffect, useCallback} from "react";
import { useFetch } from "@/lib/api";
import {Torrent} from "@/types/Torrent";
import { Information } from '@/components'
import "./style.scss";
import {Container, Button, Badge} from "react-bootstrap";
import htmlParse from "html-react-parser";
import { convertToHtml } from "@/lib/bbcode";
import { formatDistance, format } from "date-fns";
import { filesize } from 'filesize'

export default function TorrentDetail({ params }) {
    const [torrent, setTorrent] = useState<Torrent>();
    const resolvedParams: { slug: string } = React.use(params);
    const { slug } = resolvedParams;

    useEffect(() => {
        async function fetchData() {
            const t: Torrent = await useFetch(`torrents/${slug}`);
            setTorrent(t)
        }
        fetchData();
    }, [slug])

    /**
     * Download torrent file
     * @params torrent {Torrent}
     */
    const handleDownload = useCallback(async (torrent: Torrent) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(await useFetch(`torrents/download/${torrent.slug}`, {}, 'blob'));
        link.setAttribute("download", `${torrent.name}.torrent`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    }, []);

    return (torrent && (<>
        <span className="title">{torrent.name}</span>
        <div className="torrent-menu">
            <Button onClick={() => handleDownload(torrent)}>Télécharger</Button>
            <Button>Demande de reseed</Button>
            <Button>Signaler</Button>
        </div>
        <Container>
            <Information title="Uploader" description={torrent.user.username}/>
            <Information title="Upload" description={`${format(torrent?.createdAt, 'dd/MM/yyyy')} (${formatDistance(new Date(torrent?.createdAt), new Date(), {addSuffix: true})})`}/>
            <Information title="Size" description={filesize(torrent.size)}/>
            <Information title="Category" description={torrent.subcategory.category.name}/>
            <Information title="Subcategory" description={torrent.subcategory.name}/>
            <Information
                title="Languages"
                description={
                    <>
                        {torrent.languages.map((language) => (
                            <Badge key={language.name}>{language.name}</Badge>
                        ))}
                    </>
                }
            />
            <Information title="Hash" description={torrent.hash}/>
            <Information description={htmlParse(convertToHtml(torrent.description))}/>
        </Container>
    </>));
}