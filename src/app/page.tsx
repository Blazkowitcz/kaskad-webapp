"use client"

import {Container} from "react-bootstrap"
import {TorrentTable} from '@/components/TorrentTable/'
import {Torrent} from "@/types/Torrent";
import {useState, useEffect} from "react";

export default function Home() {
    const [newTorrents, setNewTorrents] = useState([]);
    const [bestTorrents, setBestTorrents] = useState([]);

    useEffect(async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/torrents/last`, {
            credentials: 'include'
        })
        if(response.ok){
            const data = await response.json();
            setNewTorrents(data);
        }

    }, []);
    return (
        <Container>
            <span>New Torrents</span>
            <TorrentTable torrents={newTorrents}/>
            <span>Best Torrents</span>
            <TorrentTable torrents={bestTorrents}/>
        </Container>
    );
}
