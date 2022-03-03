import './Configuration.css'
import GridTable from '@nadavshaar/react-grid-table';
import axios from 'axios';
import apiUrl from '../env/config.js'
import AppContext from '../AppContext';
import { useContext, useState } from 'react';

const MyAwesomeTable = () => {
    const [rows, setRows] = useState([]);
    const [totalRows,setTotalRows] = useState([]);
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

    const build = ({value}) =>{
        const imgPath = './images/' + value +'.png';
        return(
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <img src={imgPath} width={128} height={128} />
                <span style={{marginLeft:'10px', fontSize:'2rem'}}>{value}</span>
            </div>
        )
    }

    const columns = [
        {
            id: 1,
            field: 'buildingType',
            label: 'Building Type',
            width: '3fr',
            cellRenderer: build
        },
        {
            id: 2,
            field: 'buildingCost',
            label: 'Building Cost',
            width: '3fr'
        },
        {
            id: 3,
            field: 'constructionTime',
            label: 'Construction Time(second)',
            width: '3fr'
        },
        {
            id: 4,
            field: 'id',
            label: 'Id',
            visible : false
        },
        {
            id: 5,
            field: 'userId',
            label: 'User Id',
            visible : false
        }
    ];
    return (
        <GridTable
            columns={columns}
            onRowsRequest={onRowsRequest}
            rows={rows}
            onRowsChange={setRows}
            totalRows={totalRows}
            onTotalRowsChange={setTotalRows}
            
        />
    );

};

function Configuration() {
    return (
        <div className='configuration'>
            <h1 className='text-center'>Configuration</h1>
            <MyAwesomeTable></MyAwesomeTable>
        </div>
    );
}

export default Configuration;