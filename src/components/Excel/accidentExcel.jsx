import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DownloadDataAccident extends React.Component {

  render() {
    return (
      <ExcelFile>
        <ExcelSheet data={this.props.dataSet1} name="Data Senkom">
          <ExcelColumn label="Ruas" value="RUAS_CODE" />
          <ExcelColumn label="Info diterima" value="EVENT_TIME" />
          <ExcelColumn label="Time" value="TIME" />
          <ExcelColumn label="STA" value="STA" />
          <ExcelColumn label="LANE" value="LANE" />
          <ExcelColumn label="Light Injury" value="LIGHT_INJURY" />
          <ExcelColumn label="Heavy Injury" value="HEAVY_INJURY" />
          <ExcelColumn label="Fatality" value="FATALITY" />
          <ExcelColumn label="Posisi Kecelakaan" value="POSITION_NAME" />
          <ExcelColumn label="Cuaca Kecelakaan" value="WEATHER_NAME" />
          <ExcelColumn label="Jenis Kecelakaan" value="ACCIDENT_TYPE" />
          <ExcelColumn label="Penyebab Kecelakaan" value="ACCIDENT_CAUSE" />
          <ExcelColumn label="Kronology" value="CHRONOLOGY" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default DownloadDataAccident