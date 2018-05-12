var tbody = document.getElementById('editableTableArea');
var addButton = document.getElementById('add-button');
var exportJsonButton = document.getElementById('export-json-button');
var importJsonButton = document.getElementById('import-json-button');
var importCsvButton = document.getElementById('import-csv-button');
var exportCsvButton = document.getElementById('export-csv-button');
var saveButton = document.getElementById('save-button');

TableBuilder.initTable();

EventUtil.addHandler(tbody, 'click', onEditableAreaClick);

EventUtil.addHandler(tbody, 'dragover', function (event) {
    EventUtil.preventDefault(event);
});

EventUtil.addHandler(tbody, 'drop', function (event) {
    var droppedRow = document.getElementById(event.dataTransfer.getData('text'));
    droppedRow.id = '';

    var targetRow = getTargetRow(event.target, 'TR');

    TableBuilder.swapRows(droppedRow, targetRow);
});

EventUtil.addHandler(addButton, 'click', onRowAdded);
EventUtil.addHandler(exportJsonButton, 'click', onJsonExport);
EventUtil.addHandler(importJsonButton, 'click', onJsonImport);
EventUtil.addHandler(importCsvButton, 'click', onCsvImport);
EventUtil.addHandler(exportCsvButton, 'click', onCsvExport);
EventUtil.addHandler(saveButton, 'click', onLocalSave);

