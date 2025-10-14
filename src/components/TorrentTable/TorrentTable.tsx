import {ListGroup, Table, Badge} from 'react-bootstrap'
import {Torrent} from '@/types/Torrent'
import { formatDistance} from 'date-fns'
import { filesize} from 'filesize'
import './style.scss'

export default function TorrentTable({torrents}: { torrents: Torrent[] }) {
    return (
        <Table striped bordered>
            <thead>
            <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Age</th>
                <th>Size</th>
                <th>Completed</th>
                <th>S/L</th>
            </tr>
            </thead>
            <tbody>
            {torrents.map((torrent: Torrent) => {
                return (
                    <tr key={torrent.id}>
                        <td className="table-cell">{<Badge>{torrent.subcategory.name}</Badge>}</td>
                        <td className="table-cell">{torrent.name}</td>
                        <td className="table-cell">{formatDistance(new Date(torrent.createdAt), new Date(), {addSuffix: true})}</td>
                        <td className="table-cell">{filesize(torrent.size)}</td>
                        <td className="table-cell">{torrent.completed}</td>
                        <td></td>
                    </tr>)
            })}
            </tbody>
        </Table>
    )

}