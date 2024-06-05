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
import { reset } from 'redux-form';
import {
  accessActions,
  senkomActions,
  ruasActions,
  interferenceActions,
  vehicleActions,
  accidentOptionActions,
  vehicleAssistanceActions
} from '../../store/action';
import NewSenkom from '../../components/Form/NewSenkom';
import FilterExcelSenkom from '../../components/Modals/FilterExcelSenkom';

class SenkomHandling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: {
        create: false,
        read: false,
        edit: false,
        delete: false,
      },
      data: '',
      modal: false,
      filter: false,
      add: false,
      edit: false,
      view: false,
      id_senkom: '',
      tableFilter: [],
      filterData: [],
      filterList: [],
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

  getMuiTheme = () => createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          fontSize: 10,
        }
      },
      MUIDataTableHeadCell: {
        root: {
          padding: "0px 5px 0px 60px",
        }
      },
      MuiTableCell: {
        root: {
          padding: "0px 5px 0px 2px",
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
    dispatch(senkomActions.getAllDataSenkom(identity.branch_code, option, this.state.filterData));
    dispatch(senkomActions.getSenkomFilter(identity.branch_code));
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
    dispatch(interferenceActions.getAllInterference());
    dispatch(vehicleActions.getAllVehicle());
    dispatch(accidentOptionActions.getAccidentOption());
    dispatch(vehicleAssistanceActions.getAllAssistance());
  }

  componentWillReceiveProps(nextProps) {
    const { senkom, action } = this.props
    if (senkom !== nextProps.senkom && nextProps.senkom[0]) {
      this.setState(prevState => ({
        options: {
          ...prevState.options,
          count: nextProps.senkom[0].slice(-1).pop(),
          isLoading: false,
        },
      }));
    }
    if (action !== nextProps.action) {
      let c = false
      let r = false
      let u = false
      let d = false
      nextProps.action.forEach((val, index) => {
        if (val.ACTION_CODE === "C") {
          c = true
        } else if (val.ACTION_CODE === "R") {
          r = true
        } else if (val.ACTION_CODE === "U") {
          u = true
        } else if (val.ACTION_CODE === "D") {
          d = true
        }
      })
      this.setState({
        action: {
          create: c,
          read: r,
          edit: u,
          delete: d,
        },
      });
    }
  }

  handleClickOpen(val, type) {
    if (type === 'detail') {
      this.setState({
        modal: true,
        id_senkom: val,
        view: true,
      });
    }
    else if (type === 'add') {
      this.setState({
        modal: true,
        id_senkom: 0,
        add: true,
      });
    }
    else if (type === 'edit') {
      this.setState({
        modal: true,
        id_senkom: val,
        edit: true,
      });
    }
  }

  handleDeleteData(val) {
    const { dispatch, myIdentity } = this.props
    var updated_by = myIdentity.id_user
    var r = window.confirm("Apakah anda yakin akan menghapus data ini ?");
    var form = {
      id_senkom: val,
      updated_by: updated_by
    }
    if (r === true) {
      dispatch(senkomActions.deleteDataSenkom(form, myIdentity.branch_code, this.state.options));
    }
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
      dispatch(senkomActions.getAllDataSenkom(identity.branch_code, this.state.options, filterList));
    }, 1);
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
        dispatch(senkomActions.getAllDataSenkom(identity.branch_code, this.state.options, this.state.filterData));
      }, 1);
    }
  }

  render() {
    const { senkom, senkom_filter } = this.props
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
            names: senkom_filter['day']
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
            names: senkom_filter['month']
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
            names: senkom_filter['year']
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
            names: senkom_filter['cabang']
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
        name: "Shift",
        options: {
          filter: true,
          display: true,
          filterList: this.state.filterData[6],
          customFilterListRender: v => `Shift: ${v}`,
          filterOptions: {
            names: senkom_filter['shift']
          },
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
            names: senkom_filter['lane']
          },
        }
      },
      {
        name: "Gangguan",
        options: {
          filter: true,
          filterList: this.state.filterData[9],
          customFilterListRender: v => `Gangguan: ${v}`,
          filterOptions: {
            names: senkom_filter['interference']
          },
        }
      },
      {
        name: "Plat Nomor",
        options: {
          filter: false,
          customBodyRender: (value) => {
            return (
              value.toUpperCase()
            );
          },
        }
      },
      {
        name: "Option",
        options: {
          filter: false,
          customBodyRender: (value) => {
            let detail
            let edit
            let del
            detail = <IconButton size="small" aria-label="Details" value={value} title="Details" color="primary" onClick={() => this.handleClickOpen(value, 'detail')} >
              <Search />
            </IconButton>
            if (this.state.action.edit) {
              edit = <IconButton size="small" aria-label="Details" value={value} title="Edit" color="primary" onClick={() => this.handleClickOpen(value, 'edit')} >
                <Edit />
              </IconButton>
            }
            if (this.state.action.delete) {
              del = <IconButton size="small" aria-label="Details" value={value} title="Delete" color="primary" onClick={() => this.handleDeleteData(value, 'delete')} >
                <Delete />
              </IconButton>
            }
            return (
              <div >
                {detail}
                {edit}
                {del}
              </div >
            );
          }
        }
      },
    ]
    if (this.state.action.create) {
      add = <Button className="float-right" color="primary" onClick={() => this.handleClickOpen(0, 'add')}>New data</Button>
    }

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
                data={senkom}
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
        <NewSenkom
          modal={this.state.modal}
          onclose={this.handleOnClose}
          idsenkom={this.state.id_senkom}
          add={this.state.add}
          edit={this.state.edit}
          view={this.state.view}
          ruas={this.props.ruas}
          interference={this.props.interference}
          vehicle={this.props.vehicle}
          vehicle_assistance={this.props.vehicle_assistance}
          accident_option={this.props.accident_option}
          table_option={this.state.options}
        />
        <FilterExcelSenkom
          modal={this.state.filter}
          onclose={this.handleOnClose}
          interference={this.props.interference}
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
    senkom: state.senkom.senkom,
    ruas: state.ruas.ruas,
    interference: state.interference.interference,
    vehicle: state.vehicle.vehicle,
    vehicle_assistance: state.vehicle_assistance.vehicle_assistance,
    accident_option: state.accidentOption,
    senkom_filter: state.senkomFilter.filter
  }
}
export default connect(mapStateToProps)(SenkomHandling)