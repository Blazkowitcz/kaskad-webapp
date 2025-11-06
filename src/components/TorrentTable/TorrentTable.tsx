import {ListGroup, Table, Badge} from 'react-bootstrap'
import {Torrent} from '@/types/Torrent'
import {formatDistance} from 'date-fns'
import {filesize} from 'filesize'
import './style.scss'

export default function TorrentTable({torrents}: { torrents: Torrent[] }) {
    return (
        <Table striped bordered={false} hover responsive className="table">
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
            {torrents.map((torrent: Torrent) => (
                <tr key={torrent.id}>
                    <td className="table-cell">
                        <span className="badge">{torrent.subcategory.name}</span>
                    </td>
                    <td className="table-cell">
                        <a href={`/torrents/${torrent.slug}`}>{torrent.name}</a>
                    </td>
                    <td className="table-cell">
                        {formatDistance(new Date(torrent.createdAt), new Date(), {addSuffix: true})}
                    </td>
                    <td className="table-cell">{filesize(torrent.size)}</td>
                    <td className="table-cell">{torrent.completed}</td>
                    <td className="table-cell">
                        <span className="badge seeders">{torrent.seeders}</span>{' '}
                        / <span className="badge leechers">0</span>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}