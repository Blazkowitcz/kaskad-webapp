import {ListGroup, Table} from 'react-bootstrap'
import {Torrent} from '@/types/Torrent'
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
                        <td className="table-cell">{torrent.id}</td>
                        <td className="table-cell">{torrent.name}</td>
                    </tr>)
            })}
            </tbody>
        </Table>
    )

}