import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DownloadDataSenkom extends React.Component {

  render() {
    return (
      <ExcelFile>
        <ExcelSheet data={this.props.dataSet1} name="Data Senkom">
          <ExcelColumn label="Ruas" value="RUAS_CODE" />
          <ExcelColumn label="Shift" value="SHIFT" />
          <ExcelColumn label="Info diterima" value="EVENT_TIME" />
          <ExcelColumn label="Waktu dikonfirmasi" value="EVENT_CONFIRM" />
          <ExcelColumn label="TKP Clear" value="TKP_CLEAR" />
          <ExcelColumn label="Gangguan" value="INTERFERENCE_TYPE" />
          <ExcelColumn label="STA" value="STA" />
          <ExcelColumn label="JALUR" value="LANE" />
          <ExcelColumn label="Jenis Kendaraan" value="VEHICLE_TYPE" />
          <ExcelColumn label="Golongan" value="VEHICLE_CLASS" />
          <ExcelColumn label="Plat Nomor" value="VEHICLE_IDENTIFICATION" />
          <ExcelColumn label="LJT"
            value={(col) => col.LJT ? "x" : ""} />
          <ExcelColumn label="Jumlah" value="LJT_NUMBER" />
          <ExcelColumn label="Arrival" value="LJT_ARRIVAL" />
          <ExcelColumn label="Ambulance"
            value={(col) => col.AMBULANCE ? "x" : ""} />
          <ExcelColumn label="Jumlah" value="AMBULANCE_NUMBER" />
          <ExcelColumn label="Arrival" value="AMBULANCE_ARRIVAL" />
          <ExcelColumn label="Derek"
            value={(col) => col.DEREK ? "x" : ""} />
          <ExcelColumn label="Jumlah" value="DEREK_NUMBER" />
          <ExcelColumn label="Arrival" value="DEREK_ARRIVAL" />
          <ExcelColumn label="Patroli"
            value={(col) => col.PATROLI ? "x" : ""} />
          <ExcelColumn label="Jumlah" value="PATROLI_NUMBER" />
          <ExcelColumn label="Patroli" value="PATROLI_ARRIVAL" />
          <ExcelColumn label="Rescue"
            value={(col) => col.RESCUE ? "x" : ""} />
          <ExcelColumn label="Jumlah" value="RESCUE_NUMBER" />
          <ExcelColumn label="Arrival" value="RESCUE_ARRIVAL" />
          <ExcelColumn label="Information" value="INFORMATION" />
          <ExcelColumn label="Chronology" value="CHRONOLOGY" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default DownloadDataSenkom