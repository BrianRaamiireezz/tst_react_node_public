// services/reportGenerator.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

// Date Fns is used to format the dates we receive
// from our API call

// define a generatePDF function that accepts a tickets argument
const generatePDF = empleados => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ['nombre', 'direccion', 'correo', 'puesto', 'sueldo bruto', 'sueldo neto'];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  empleados.forEach(empleado => {
    const datos = [
      empleado.nombre,
      empleado.direccion,
      empleado.correo,
      empleado.puesto,
      empleado.sueldo_bruto,
      empleado.sueldo_neto
    ];
    // push each tickcet's info into a row
    tableRows.push(datos);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  // ticket title. and margin-top + margin-left
  doc.text('Empleados', 14, 15);
  // we define the name of our PDF file.
  doc.save(`report.pdf`);
};

export default generatePDF;