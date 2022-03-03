import './Configuration.css'
import GridTable from '@nadavshaar/react-grid-table';
import axios from 'axios';
import apiUrl from '../env/config.js'
import AppContext from '../AppContext';
import { useContext, useState } from 'react';

function MyAwesomeTable(){
    const Header = ({}) => {
        return (
            <>
            </>
        );
    }
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState();
    const [editRowId, setEditRowId] = useState(null)
    const ctx = useContext(AppContext);
    function onRowsRequest() {
        axios.get(apiUrl + "Buildings", {
            headers: {
                Authorization: ctx.token
            }
        }).then(function (response) {
            setRows(response.data)
            setTotalRows(response.data.length)

        }).catch(function (error) {
            console.log(error);
            return;
        })
    };

    const build = ({ value }) => {
        const imgPath = './images/' + value + '.png';
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={imgPath} width={128} height={128} />
                <span style={{ marginLeft: '10px', fontSize: '2rem' }}>{value}</span>
            </div>
        )
    }

    const columns = [
        {
            id: 1,
            field: 'buildingType',
            label: 'Building Type',
            width: '3fr',
            sortable: false,
            cellRenderer: build,
        },
        {
            id: 2,
            field: 'buildingCost',
            label: 'Building Cost',
            width: '3fr',
            sortable: false
        },
        {
            id: 3,
            field: 'constructionTime',
            label: 'Construction Time(second)',
            width: '3fr',
            sortable: false
        },
        {
            id: 4,
            field: 'id',
            label: 'Id',
            visible: false
        },
        {
            id: 5,
            field: 'userId',
            label: 'User Id',
            visible: false
        },
        {
            id: 'my-buttons-column',
            width: 'max-content',
            pinned: true,
            sortable: false,
            resizable: false,
            cellRenderer: () => (
                <button 
                    style={
                        {
                            marginRight: 20,
                            borderRadius:'40%',
                            padding:5,
                            fontSize:'1.3rem',
                            backgroundColor:'#5bc0de',
                            border:'0px',
                            color:'snow',
                            cursor:'pointer'
                        }
                    } 
                    onClick={e => alert("test")}
                >&#x270E;</button>
            )
        }
    ];
    return (
        <GridTable
            columns={columns}
            onRowsRequest={onRowsRequest}
            rows={rows}
            // onRowsChange={setRows}
            totalRows={totalRows}
            components = {{Header}}
        // onTotalRowsChange={setTotalRows}
        />
    );

};

function Configuration() {
    return (
        <div className='configuration'>
            <button onClick={()=>alert('test')} className='addButton'>Add Building</button>
            <MyAwesomeTable></MyAwesomeTable>
        </div>
    );
}

export default Configuration;