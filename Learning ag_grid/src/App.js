import { AgGridReact } from 'ag-grid-react';

import logo from "./logo.png"
import "./app.css"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import { useState} from 'react';

function App() {
    const [gridApi, setGridApi]=useState(null)
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [isColumnHiden,setIsColumnHiden] = useState(false)

    const [rowData, setRowData] = useState([
        { make: "brezza", model: "vitara", price: "12 Lakhs" }
    ]);

    const [columnDefs, setColumnDefs] = useState([
        { field: 'make', checkboxSelection: true, headerCheckboxSelection: true },  //headerName: "kauaa"
        { field: 'model' },

        // for inline Css
        // { field: "price", cellStyle: (e) => (e.value < 40000 ? { background: "green" } : { background: "#d96161" }) },

        { field: "price", tooltipField: "make", cellClass: (e) => (e.value < 40000 ? "priceLessThan40000" : "priceGreaterThan40000") },
        {
            field: "action",
            cellRendererFramework: (params) =>
                <div>
                    <button onClick={() => actionButton(params)}>Click me</button>
                </div>
        }
    ]);

    const actionButton = (event) => {
        console.log(event.data);
        alert(event.data.make + " row clicked")
    }

    const defaultColDef = { sortable: true, filter: true, editable: true, floatingFilter: true, flex:1 };

    // const cellClickedListener = useCallback(function (event) { //handel cell click
    //     console.log('cellClicked', event);
    // });

    const onGridReady = (params) => {
        fetch("https://www.ag-grid.com/example-assets/row-data.json")
            .then(resp => resp.json())
            .then(resp => {
                params.api.applyTransaction({ add: resp })
            })
            params.api.paginationSetPageSize(10)
            setGridApi(params.api);
            setGridColumnApi(params.columnApi);
    }

    function handleExportBtns (select) {
        if (select) {
            gridApi.exportDataAsCsv({onlySelected: true});
            return;
        }
        gridApi.exportDataAsCsv();
    }

    // const onSelectionChanged=(event)=>{
    //     console.log(event);
    // }

    const onPaginationChange=(pageSize)=>{
        gridApi.paginationSetPageSize(Number(pageSize))
    }
    
    function hideColumn() {
        gridColumnApi.setColumnVisible('price', isColumnHiden) 
        setIsColumnHiden(!isColumnHiden);
        gridApi.sizeColumnsToFit()
    }

    function onSearchBoxTextChange(e) {
        gridApi.setQuickFilter(e.target.value)
    }

    return (
        <div id='background'>
            <input type="search" id='sreachBox' placeholder="search somethings..." onChange={onSearchBoxTextChange} />
            <div className="ag-theme-alpine-dark" style={{ height: "92vh", width: "100%" }}>
                <AgGridReact
                    // rowData={rowData}
                    columnDefs={columnDefs}

                    defaultColDef={defaultColDef}
                    animateRows={true}

                    rowSelection='multiple'
                    // onSelectionChanged={onSelectionChanged}
                    rowMultiSelectWithClick={true}   //Select Multi Rows With Click

                    // onCellClicked={cellClickedListener}

                    onGridReady={onGridReady}
                    enableBrowserTooltips={true}

                    pagination={true}
                // paginationPageSize= {30}
                // paginationAutoPageSize= {true}
                />
            </div>
            <div id='btns'>
                <button id='exportBtn' onClick={() => handleExportBtns()}>Export All</button>
                <button id='exportSelectedRowsBtn' onClick={() => handleExportBtns("select")}>Export Selected Rows</button>
                <button id='hideBtn' onClick={hideColumn}>Hide price column</button>
                <div id='selectionArea'>
                    <div>Set Pagination Size</div>
                    <select onChange={(e) => onPaginationChange(e.target.value)}>
                        <option value='10'>10</option>
                        <option value='25'>25</option>
                        <option value='50'>50</option>
                        <option value='100'>100</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default App;