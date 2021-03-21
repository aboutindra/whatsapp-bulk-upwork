const ExcelJS = require('exceljs');

const read = async () => {
    let filepath = './message_list.xlsx';
    let workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filepath);

    let worksheet = workbook.getWorksheet("Sheet1");
    let data = []
    let obj = {}

    worksheet.eachRow( async (row, rowNumber) => {
        if(rowNumber !== 1){
            obj = {}
            obj.number = row.values[1]
            obj.message = row.values[2]
            data.push(obj)
        }
    })

    return data;
}

const write = async (text, column, row) => {
    let filepath = './message_list.xlsx';
    let workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filepath);

    let worksheet = workbook.getWorksheet("Sheet1");
    let getRow = worksheet.getRow(row);
    getRow.getCell(column).value = text;
    getRow.commit();
    workbook.xlsx.writeFile(filepath)

}

module.exports = {
    read,
    write
}