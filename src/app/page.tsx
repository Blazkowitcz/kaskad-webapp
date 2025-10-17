"use client"

import {Container} from "react-bootstrap"
import {TorrentTable} from '@/components/TorrentTable/'
import {Torrent} from "@/types/Torrent";
import {useState, useEffect} from "react";
import {useFetch} from "@/lib/api";

export default function Home() {
    const [newTorrents, setNewTorrents] = useState([]);
    const [bestTorrents, setBestTorrents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [bests, news] = await Promise.all([
                    useFetch("torrents/best"),
                    useFetch("torrents/last"),
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
        <>
            {newTorrents.length > 0 && <>
                <span>New Torrents</span>
                <TorrentTable torrents={newTorrents}/>
            </>}

            {bestTorrents.length > 0 && <>
                <span>Best Torrents</span>
                <TorrentTable torrents={bestTorrents}/>
            </>}</>
    );
}
