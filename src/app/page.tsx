"use client"
import Image from "next/image";
import styles from "./page.module.css";
import {Container} from "react-bootstrap"
import {TorrentTable} from '@/components/TorrentTable/'
import {Torrent} from "@/types/Torrent";

export default function Home() {
    const torrents: Torrent[] = [
        {
            id: "1",
            name: "Torrent 1",
            slug: "torrent-1"
        },
        {
            id: "2",
            name: "Torrent 2",
            slug: "torrent-2"
        }
    ]
    return (
        <Container>
            <span>Best Torrents</span>
            <TorrentTable torrents={torrents}/>
        </Container>
    );
}
