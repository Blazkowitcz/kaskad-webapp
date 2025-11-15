"use client"

import {Container} from "react-bootstrap"
import {TorrentTable} from '@/components'
import {Torrent} from "@/types/Torrent";
import {useState, useEffect} from "react";
import {useFetch} from "@/lib/api";
import "./style.scss";

export default function Home() {
    const {fetchApi} = useFetch();
    const [newTorrents, setNewTorrents] = useState([]);
    const [bestTorrents, setBestTorrents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [bests, news] = await Promise.all([
                    fetchApi("torrents/best"),
                    fetchApi("torrents/last"),
                ]);

                setBestTorrents(bests);
                setNewTorrents(news);
            } catch (error) {
                console.error("Erreur lors du chargement des torrents :", error);
            }
        }

        fetchData();
    }, []);
    return (
        <Container>
            {newTorrents.length > 0 && (
                <>
                    <div className="section-title">New Torrents</div>
                    <TorrentTable torrents={newTorrents}/>
                </>
            )}
            {bestTorrents.length > 0 && (
                <>
                    <div className="section-title">Best Torrents</div>
                    <TorrentTable torrents={bestTorrents}/>
                </>
            )}
        </Container>
    );
}
