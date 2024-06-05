import React, { Component } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Col,
  Row,
  Button,
  Alert
} from 'reactstrap';
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';

import { potholesActions, ruasActions, accessActions } from '../../store/action';
import NewPotholes from '../../components/Modals/NewPotholes';

const options = {
  filterType: "dropdown",
  print: false,
  selectableRows: false,
  rowsPerPage: 20,
  selectableRows: 'none',
};

const initialState = {
  modal: false,
  add: false,
  edit: false,
  view: false,
}

class Potholes extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
    this.state = {
      action: {
        create: false,
        read: false,
        edit: false,
        delete: false,
      },
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
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
    var identity = JSON.parse(localStorage.getItem('identity'))
    dispatch(potholesActions.getPotholes(identity.branch_code));
    dispatch(accessActions.getAccessByPath(history.location.pathname, identity.ID_GROUP));
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
    const { action } = this.props
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
      setTimeout(() => {
        // console.log(this.state.action)
      }, 1);
    }
  }

  handleClickOpen(val, type) {
    if (type === 'detail') {
      this.setState({
        modal: true,
        id_potholes: val,
        view: true,
      });
    }
    else if (type === 'add') {
      this.setState({
        modal: true,
        id_potholes: "",
        add: true,
      });
    }
    else if (type === 'edit') {
      this.setState({
        modal: true,
        id_potholes: val,
        edit: true,
      });
    }
  }

  handleOnClose(val) {
    this.setState(initialState);
  }

  render() {
    const { potholes } = this.props
    let add
    const columns = [
      {
        name: "No",
        options: {
          filter: false,
          display: true
        }
      },
      {
        name: "Ruas",
        options: {
          filter: true,
          display: true
        }
      },
      {
        name: "STA + LANE",
        options: {
          filter: true,
          display: true
        }
      },
      {
        name: "Waktu Temuan",
        options: {
          filter: true,
          display: true
        }
      },
      {
        name: "Selesai Pengerjaan",
        options: {
          filter: true,
          display: true
        }
      },
      {
        name: "Priority",
        options: {
          filter: true,
          customBodyRender: (value) => {
            if (value === "1") {
              return "*"
            } else if (value === "2") {
              return "**"
            } else if (value === "3") {
              return "***"
            }
          },
        }
      },
      {
        name: "SPM",
        options: {
          filter: true,
          customBodyRender: (value) => {
            if (value) {
              if (value.includes("-")) {
                return <Alert size="sm" color="danger" style={{
                  marginBottom: '1px', height: '20px', lineHeight: '20px', padding: '0px 15px'
                }
                }>
                  Overdue
                </Alert >
              } else {
                return <Alert size="sm" color="success" style={{
                  marginBottom: '1px', height: '20px', lineHeight: '20px', padding: '0px 15px'
                }
                }>
                  On Track
                </Alert >
              }
            }
          },
        }
      },
      {
        name: "Progress",
        options: {
          filter: true,
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
            return (
              <div >
                {detail}
                {edit}
              </div>
            );
          },
        }
      }
    ]
    if (this.state.action.create) {
      add = <Button className="float-right" color="primary" onClick={() => this.handleClickOpen(0, 'add')}>New data</Button>
    }

    return (
      <div>
        <Row>
          <Col>
            {add}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={''}
                data={potholes}
                columns={columns}
                options={options}
                print={false}
                responsive={'scrollMaxHeight'}
              />
            </MuiThemeProvider>
          </Col>
        </Row>
        <Row>
          <Col>
            &nbsp;
          </Col>
        </Row>
        <NewPotholes
          id_potholes={this.state.id_potholes}
          modal={this.state.modal}
          onclose={this.handleOnClose}
          add={this.state.add}
          edit={this.state.edit}
          view={this.state.view}
          read_only={this.state.view}
          ruas={this.props.ruas}
        />
      </div >
    )
  }

}
const mapStateToProps = (state) => {
  return {
    action: state.action.action,
    myIdentity: state.user.myIdentity,
    potholes: state.potholes.potholes,
    ruas: state.ruas.ruas,
  }
}
export default connect(mapStateToProps)(Potholes)