import './Configuration.css'
import GridTable from '@nadavshaar/react-grid-table';
import axios from 'axios';
import apiUrl from '../env/config.js'
import AppContext from '../AppContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Configuration() {
    const navigate = useNavigate();
    const ctx = useContext(AppContext);
    const [rows, setRows] = useState([{}]);
    const [totalRows, setTotalRows] = useState();
    const [showTable, setShowTable] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [buildingCost, setBuildingCost] = useState(0);
    const [constructionTime, setConstructionTime] = useState(30);
    const [buildingType, setBuildingType] = useState();
    const [editingBuildingType, setEditingBuildingType] = useState();
    const [editBuildingId, setEditBuildingId] = useState();
    const [availableBuildingTypes, setAvailableBuildingTypes] = useState([]);
    const [isAddForm, setIsAddForm] = useState(true);
    const Header = () => {
        return (
            <>
            </>
        );
    }

    const loadData = function () {
        axios.get(apiUrl + "Buildings", {
            headers: {
                Authorization: ctx.token
            }
        }).then(function (response) {
            const data = response.data;
            setRows(data);
            setTotalRows(data.length);

        }).catch(function (error) {
            setRows([]);
            setTotalRows(0);
            if (error.response.status == "401") {
                //token suresi geçtiği zaman.
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("username");
                ctx.setToken(null);
                ctx.setIsLoggedIn(false);
                navigate('/login');
            }
        })
    };

    function handleDeleteClick(e, data) {
        if (window.confirm(`Are you sure you wish to delete this ${data.buildingType}?`)) {
            console.log(rows);
            console.log(totalRows)
            axios.delete(apiUrl + `Buildings/${data.id}`, {
                headers: {
                    Authorization: ctx.token
                }
            }).then(function (response) {
                loadData();
            }).catch(function (error) {
                console.log(error.response);
            })
        }
    }

    function handleEditClick(e, data) {
        e.preventDefault();
        loadAvailableTypes(true);
        setBuildingCost(data.buildingCost);
        setConstructionTime(data.constructionTime);
        setBuildingType(data.buildingType);
        setEditingBuildingType(data.buildingType);
        setEditBuildingId(data.id);

        setIsAddForm(false);
        setShowTable(false);
        setShowModal(true);
    }

    function handleAddClick(e) {
        setIsAddForm(true);
        loadAvailableTypes();
    }

    function loadAvailableTypes(edit) {
        axios.get(apiUrl + "Buildings/AvailableTypes", {
            headers: {
                Authorization: ctx.token
            }
        }).then(function (response) {
            setAvailableBuildingTypes(response.data);
            setBuildingType(response.data[0]);
            if (response.data.length === 0 && !edit) {
                toast.error("You have reached the maximum building capacity. You can't add buildings.", {
                    autoClose: 3000
                });
            }
            else {
                setShowTable(false);
                setShowModal(true);
            }
        })
    }

    function handleModalCloseClick(e) {
        if (e != undefined) {
            e.preventDefault();
        }
        setShowTable(true);
        setShowModal(false);
    }
    
    function handleFormSubmit(e, isAddForm) {
        e.preventDefault();
        if (isAddForm) {
            axios.post(apiUrl + "Buildings", {
                buildingCost: buildingCost,
                constructionTime: constructionTime,
                buildingType: buildingType
            }, {
                headers: {
                    Authorization: ctx.token
                }
            }).then(function (response) {
                toast.success("Successfully added building.", {
                    autoClose: 500,
                    onClose: () => {
                        handleModalCloseClick();
                        loadData();
                    }
                });
            }).catch(function (error) {
                console.log(error.response);
            });
        }
        else {
            let buildType = buildingType
            if (buildingType === undefined) {
                buildType = editingBuildingType
            }
            axios.put(apiUrl + `Buildings/${editBuildingId}`, {
                buildingCost: buildingCost,
                constructionTime: constructionTime,
                buildingType: buildType
            }, {
                headers: {
                    Authorization: ctx.token
                }
            }).then(function (response) {
                handleModalCloseClick();
                loadData();
            }).catch(function (error) {
                console.log(error.response);
            });
        }

    }

    useEffect(() => {
        loadData();
    }, []);



    const build = ({ value }) => {
        const imgPath = './images/' + value + '.png';
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
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
            cellRenderer: (value) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button
                        style={
                            {
                                marginRight: 20,
                                marginBottom: 20,
                                borderRadius: '40%',
                                padding: 5,
                                flexBasis: 35,
                                fontSize: '1.3rem',
                                backgroundColor: '#5bc0de',
                                border: '0px',
                                color: 'snow',
                                cursor: 'pointer'
                            }
                        }
                        onClick={e => handleEditClick(e, value.data)}
                    >&#x270E;</button>
                    <button
                        style={
                            {
                                marginRight: 20,
                                borderRadius: '40%',
                                padding: 5,
                                paddingRight: 10,
                                paddingLeft: 10,
                                fontSize: '1.3rem',
                                backgroundColor: '#d9534f',
                                border: '0px',
                                color: 'snow',
                                cursor: 'pointer'
                            }
                        }
                        onClick={e => handleDeleteClick(e, value.data)}
                    >&#128465;</button>
                </div>
            )
        }
    ];
    return (
        <div className='configuration'>
            <ToastContainer />
            <div className={showTable ? "" : "d-none"}>
                <button onClick={(e) => handleAddClick(e)} className='addButton'>Add Building</button>
                <GridTable
                    columns={columns}
                    rows={rows}
                    onRowsRequest={loadData}
                    totalRows={totalRows}
                    components={{ Header }}
                />
            </div>
            <div className={showModal ? "modal" : "d-none"}>
                <h1 className='modal-header'>{isAddForm ? "Add Building" : "Edit Building"}</h1>
                <div className='row'>
                    <form onSubmit={(e) => handleFormSubmit(e, isAddForm)}>
                        <div>
                            <label>Building Cost</label>
                            <input min={0} max={100000} value={buildingCost} type="number" onChange={(e) => setBuildingCost(e.target.value)}></input>
                        </div>
                        <div>
                            <label>Construction Time</label>
                            <input min={30} value={constructionTime} max={1800} type="number" onChange={(e) => setConstructionTime(e.target.value)}></input>
                        </div>

                        <select style={{ marginTop: 10 }} onChange={(e) => setBuildingType(e.target.value)}>
                            {
                                isAddForm == false ? <option defaultValue={true}>{editingBuildingType}</option> : <></>
                            }
                            {
                                availableBuildingTypes.map((type, index) => <option key={index}>{type}</option>)
                            }
                        </select>
                        <button className='addEditBtn'>{isAddForm ? "Add" : "Edit"}</button>
                        <button className='closeBtn' onClick={(e) => handleModalCloseClick(e)}>Close</button>
                    </form>
                </div>
            </div>
        </div>
    );

};
export default Configuration;