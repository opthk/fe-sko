import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { importActions } from '../../store/action'

const initialState = {
  modal: false,
  selectedFile: false,
  selectedFileBagiHasil: false,
  selectedFileRencanaTahunan: false,
  loaded: 0
}

class ImportData extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandlerBagiHasil = this.onChangeHandlerBagiHasil.bind(this);
    this.handleSubmitBagiHasil = this.handleSubmitBagiHasil.bind(this);
    this.downloadTemplate = this.downloadTemplate.bind(this);
  }

  onChangeHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0
    });
  }

  onChangeHandlerBagiHasil = (e) => {
    this.setState({
      selectedFileBagiHasil: e.target.files[0],
      loaded: 0
    });
  }

  onChangeHandlerUploadRencana = (e) => {
    this.setState({
      selectedFileRencanaTahunan: e.target.files[0],
      loaded: 0
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    var data = new FormData()
    data.append('file', this.state.selectedFile)
    dispatch(importActions.importExcel(data));
    this.setState(initialState);
  }

  handleSubmitBagiHasil = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    var data = new FormData()
    data.append('file', this.state.selectedFileBagiHasil)
    dispatch(importActions.importExcelBagiHasil(data));
    this.setState(initialState);
  }

  handleSubmitRencanaTahunan = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    var data = new FormData()
    data.append('file', this.state.selectedFileRencanaTahunan)
    dispatch(importActions.importExcelRencanaTahunan(data));
    this.setState(initialState);
  }

  downloadTemplate() {
    const response = {
      file: 'http://103.215.27.254:3000/assets/doc/template.xlsx',
    };
    window.location.href = response.file;
    window.open(response.file)
  }

  downloadTemplateBagiHasil() {
    const response = {
      file: 'http://103.215.27.254:3000/assets/doc/template_bagi_hasil.xlsx',
    };
    window.location.href = response.file;
    window.open(response.file)
  }

  downloadTemplateRencanaTahunan() {
    const response = {
      file: 'http://103.215.27.254:3000/assets/doc/template_rencana_tahunan_pershift.xlsx',
    };
    window.location.href = response.file;
    window.open(response.file)
  }

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Import Rekening Koran, Bagi Hasil & Rencana Tahunan</CardTitle>
            <Row>
              <Col>
                <h6><b>Please read the manual before do import excel !</b></h6>
                <h6>1. Format excel harus sesuai dengan contoh template excel berikut ;<br/><Button onClick={this.downloadTemplate} size="sm" color="success">Template Excel Settlement</Button>&nbsp;<Button onClick={this.downloadTemplateBagiHasil} size="sm" color="danger">Template Excel Bagi Hasil</Button>&nbsp;<Button onClick={this.downloadTemplateRencanaTahunan} size="sm" color="primary">Template Rencana Tahunan</Button></h6>
                <h6>2. Font dari header harus huruf kapital dan tidak boleh ada spasi melainkan menggunakan underscore</h6>
                <h6>3. Format Date adalah yyyy-mm-dd</h6>
                <h6>4. Format angka menggunakan Number. Apabila terdapat data angka yang kosong harus disikan angka 0</h6>
                <h6>5. Dapat menginputkan data hanya multi ruas dan multi bulan. (* contoh: bisa upload data bulan 1 - 3 seluruh ruas)</h6>
                <h6>6. Upload data akan mereplace data yang telah diupload sesuai dengan data excel yang diupload</h6>
                <h6>7. Untuk upload data tahunan, akan menghapus bulan sebelumnya di tahun itu. Harap menginputkan data rencana tahunan dalam 1 tahun</h6>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <form onSubmit={this.handleSubmit} >
                  <Row>
                    <Col>
                      <div lg="6">
                        <div className="form-group files">
                          <label>Upload File Rekening Koran / Seettlement </label>
                          <input type="file" className="form-control" onChange={this.onChangeHandler} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="float-right" type="submit" color="primary">Submit</Button>
                    </Col>
                  </Row>
                </form>
              </Col>
              <Col>
                <form onSubmit={this.handleSubmitBagiHasil} >
                  <Row>
                    <Col>
                      <div lg="6">
                        <div className="form-group files">
                          <label>Upload File Bagi Hasil </label>
                          <input type="file" className="form-control" onChange={this.onChangeHandlerBagiHasil} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="float-right" type="submit" color="primary">Submit</Button>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <form onSubmit={this.handleSubmitRencanaTahunan} >
                  <Row>
                    <Col>
                      <div lg="6">
                        <div className="form-group files">
                          <label>Upload Rencana Tahunan </label>
                          <input type="file" className="form-control" onChange={this.onChangeHandlerUploadRencana} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className="float-right" type="submit" color="primary">Submit</Button>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div >
    )
  }

}
const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    ruas: state.ruas.ruas,

  }
}
export default connect(mapStateToProps)(ImportData)