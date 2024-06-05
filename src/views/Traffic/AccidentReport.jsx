import React, { Component } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Col,
  Row,
  Button,
} from 'reactstrap';
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import IconButton from '@material-ui/core/IconButton';
import {
  accessActions,
  accidentActions,
  senkomActions,
  ruasActions,
} from '../../store/action';
import FilterExcelAccident from '../../components/Modals/FilterExcelAccident';

class AccidentReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      filterData: [],
      options: {
        page: 0,
        filterType: "dropdown",
        print: false,
        search: false,
        selectableRows: 'none',
        rowsPerPage: 10,
        download: false,
        serverSide: true,
        isLoading: false,
        responsive: 'scrollMaxHeight',
        count: 0,
        rowsPerPageOptions: [10, 20, 50, 100, 250, 500, 1000],
        textLabels: {
          body: {
            noMatch: "Loading data ...",
            toolTip: "Sort",
          }
        },
        onFilterChange: (changedColumn, filterList) => {
          this.handleFilterChange(changedColumn, filterList)
        },
        onTableChange: (action, tableState) => {
          this.dataTableAction(action, tableState)
        },
      }
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.dataTableAction = this.dataTableAction.bind(this);
  }

  handleFilterChange(changedColumn, filterList) {
    const { dispatch } = this.props
    const identity = JSON.parse(localStorage.getItem('identity'))
    this.setState(prevState => ({
      filterData: filterList,
      options: {
        ...prevState.options,
      }
    }))
    setTimeout(() => {
      dispatch(accidentActions.getAllDataAccident(identity.branch_code, this.state.options, filterList));
    }, 1);
  }


  getMuiTheme = () => createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MUIDataTable: {
        responsiveScroll: {
          minHeight: '550px'
        }
      },
      MUIDataTableBodyCell: {
        root: {
          fontSize: 10,
        }
      },
      MUIDataTableHeadCell: {
        root: {
          padding: "0px 5px 0px 40px",
          textAlign: "center"
        }
      },
      MuiTableCell: {
        root: {
          padding: "0px 5px 0px 30px",
          textAlign: "center"
        }
      }
    }
  })

  componentWillMount() {
    const { dispatch, history } = this.props
    const identity = JSON.parse(localStorage.getItem('identity'))
    const option = this.state.options
    option['idBranch'] = identity.branch_code
    dispatch(accessActions.getAccessByPath(history.location.pathname, identity.ID_GROUP));
    dispatch(accidentActions.getAllDataAccident(identity.branch_code, option, this.state.filterData));
    dispatch(accidentActions.getAccidentFilter(identity.branch_code));
  }

  componentDidMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    const { dispatch } = this.props
    if (identity.branch_code === "PUSAT") {
      dispatch(ruasActions.getAllRuas());
    }
    else {
      dispatch(ruasActions.getRuasByCode(identity.branch_code));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { accidentReport } = this.props
    if (accidentReport !== nextProps.accidentReport && nextProps.accidentReport[0]) {
      this.setState(prevState => ({
        options: {
          ...prevState.options,
          count: nextProps.accidentReport[0].slice(-1).pop(),
          isLoading: false,
        },
      }));
    }
  }

  handleClickOpen(val, type) {
    this.setState({
      modal: true,
      id_senkom: val,
      view: true,
    });
  }

  handleFilter(val) {
    this.setState({
      filter: true,
    });
  }

  handleOnClose(val) {
    this.setState({
      modal: false,
      filter: false,
      view: false,
      add: false,
      edit: false,
      id_senkom: false,
    });
  }

  dataTableAction(action, tableState) {
    const { dispatch } = this.props
    const identity = JSON.parse(localStorage.getItem('identity'))
    if (this.state.options.rowsPerPage !== tableState.rowsPerPage || this.state.options.page !== tableState.page) {
      tableState['idBranch'] = identity.branch_code
      this.setState(prevState => ({
        options: {
          ...prevState.options,
          page: tableState.page,
          isLoading: true,
          rowsPerPage: tableState.rowsPerPage,
        },
      }));
      setTimeout(() => {
        dispatch(accidentActions.getAllDataAccident(identity.branch_code, this.state.options, this.state.filterData));
      }, 1);
    }
  }

  render() {
    const { accidentFilter, accidentReport } = this.props
    let add
    const columns = [
      {
        name: "No",
        options: {
          filter: false,
          display: true,
        }
      },
      {
        name: "Tanggal",
        options: {
          filter: true,
          display: false,
          filterList: this.state.filterData[1],
          customFilterListRender: v => `Tanggal: ${v}`,
          filterOptions: {
            names: accidentFilter['day']
          },
        }
      },
      {
        name: "Bulan",
        options: {
          filter: true,
          display: false,
          filterList: this.state.filterData[2],
          customFilterListRender: v => `Bulan: ${v}`,
          filterOptions: {
            names: accidentFilter['month']
          },
        }
      },
      {
        name: "Tahun",
        options: {
          filter: true,
          display: false,
          filterList: this.state.filterData[3],
          customFilterListRender: v => `Tanggal: ${v}`,
          filterOptions: {
            names: accidentFilter['year']
          },
        }
      },
      {
        name: "Cabang",
        options: {
          filter: true,
          filterList: this.state.filterData[4],
          customFilterListRender: v => `Cabang: ${v}`,
          filterOptions: {
            names: accidentFilter['cabang']
          },
        }
      },
      {
        name: "Waktu Kejadian",
        options: {
          filter: false,
          display: true
        }
      },
      {
        name: "Time",
        options: {
          filter: false,
          display: true,
        }
      },
      {
        name: "STA",
        options: {
          filter: true,
          filterList: this.state.filterData[7],
          customFilterListRender: v => `STA: ${v}`,
          filterType: 'textField' // set filterType's at the column level
        }
      },
      {
        name: "Lane",
        options: {
          filter: true,
          filterList: this.state.filterData[8],
          customFilterListRender: v => `Lane: ${v}`,
          filterOptions: {
            names: accidentFilter['lane']
          },
        }
      },
      {
        name: "Light Injury",
        options: {
          filter: true,
          filterList: this.state.filterData[9],
          customFilterListRender: v => `Light Injury: ${v}`,
          filterOptions: {
            names: accidentFilter['lightInjury']
          },
        }
      },
      {
        name: "Heavy Injury",
        options: {
          filter: true,
          filterList: this.state.filterData[10],
          customFilterListRender: v => `Heavy Injury: ${v}`,
          filterOptions: {
            names: accidentFilter['heavyInjury']
          },
        }
      },
      {
        name: "Fatality",
        options: {
          filter: true,
          filterList: this.state.filterData[11],
          customFilterListRender: v => `Fatality: ${v}`,
          filterOptions: {
            names: accidentFilter['fatality']
          },
        }
      },
      {
        name: "Position",
        options: {
          filter: true,
          filterList: this.state.filterData[12],
          customFilterListRender: v => `Gangguan: ${v}`,
          filterOptions: {
            names: accidentFilter['accidentPosition']
          },
        }
      },
      {
        name: "Cuaca",
        options: {
          filter: true,
          filterList: this.state.filterData[13],
          customFilterListRender: v => `Gangguan: ${v}`,
          filterOptions: {
            names: accidentFilter['accidentWeather']
          },
        }
      },
      {
        name: "Jenis",
        options: {
          filter: true,
          filterList: this.state.filterData[14],
          customFilterListRender: v => `Gangguan: ${v}`,
          filterOptions: {
            names: accidentFilter['accidentType']
          },
        }
      },
      {
        name: "Penyebab",
        options: {
          filter: true,
          filterList: this.state.filterData[15],
          customFilterListRender: v => `Gangguan: ${v}`,
          filterOptions: {
            names: accidentFilter['accidentCause']
          },
        }
      },
      // {
      //   name: "Option",
      //   options: {
      //     filter: false,
      //     customBodyRender: (value) => {
      //       let detail
      //       detail = <IconButton size="small" aria-label="Details" value={value} title="Details" color="primary" onClick={() => this.handleClickOpen(value, 'detail')} >
      //         <Search />
      //       </IconButton>
      //       return (
      //         <div >
      //           {detail}
      //         </div >
      //       );
      //     }
      //   }
      // },
    ]

    return (
      <div>
        <Row>
          <Col>
            {add}
            <Button className="float-right" color="success" onClick={() => this.handleFilter(0)} style={{ marginRight: '10px' }}>Download Excel</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={''}
                data={accidentReport}
                columns={columns}
                options={this.state.options}
                print={false}
              />
            </MuiThemeProvider>
          </Col>
        </Row>
        <Row>
          <Col>
            &nbsp;
          </Col>
        </Row>
        <FilterExcelAccident
          modal={this.state.filter}
          onclose={this.handleOnClose}
        />

      </div >
    )
  }

}
const mapStateToProps = (state) => {
  return {
    action: state.action.action,
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    accidentFilter: state.accidentFilter.filter,
    accidentReport: state.accidentReport.accidentReport,
  }
}
export default connect(mapStateToProps)(AccidentReport)