/* iterates over all consequent parent nodes until reaches tag
 and returns found element
 */
function getTargetRow(el, tag) {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName === tag)
            return el;
    }
    return null;
}

function showErrorMessage() {
    document.getElementById('json-err-msg').style.visibility = 'visible';
}

function hideErrorMessage() {
    document.getElementById('json-err-msg').style.visibility = 'hidden';
}

function onEditableAreaClick(event) {
    var row = getTargetRow(event.target, 'TR');

    if (event.target.className === 'table-button-remove') {
        TableBuilder.removeRow(row);
    }
}

function onRowAdded() {
    TableBuilder.addRow();
}

function onRowDrop(event) {
    event.preventDefault();

    var droppedRow = document.getElementById(event.dataTransfer.getData('text'));
    droppedRow.id = '';

    var targetRow = getTargetRow(event.target, 'TR');

    TableBuilder.swapRows(droppedRow, targetRow);
}

function onJsonExport() {
    var textArea = document.getElementById('editableTextArea');

    tableDataService.updateModel();

    textArea.value = JSON.stringify(tableDataService.getData());
}

function onJsonImport() {
    try {
        // JSON can be either provided by textarea value or after CSV conversion
        if (arguments[0].type === 'click') {
            tableDataService.setData(JSON.parse(document.getElementById('editableTextArea').value));
        } else {
            tableDataService.setData(JSON.parse(arguments[0]));
        }
        TableBuilder.initTable();

        // hide msg in case no error occurred
        hideErrorMessage();
    }
    catch (e) {
        showErrorMessage();
    }
}

function onCsvImport() {
    var json = csvConvert.CSV2JSON(document.getElementById('editableTextArea').value);
    onJsonImport(json);
}

function onCsvExport() {
    var textArea = document.getElementById('editableTextArea');

    tableDataService.updateModel();

    var json = JSON.stringify(tableDataService.getData());
    textArea.value = csvConvert.JSON2CSV(json);
}

function onLocalSave() {
    window.localStorage.setItem('isSaved', true);

    tableDataService.updateModel();

    window.localStorage.setItem('model', JSON.stringify(tableDataService.getData()));
}

function onFileSelect(event) {
    event.preventDefault();

    var file = event.target.files[0];

            var reader = new FileReader();
            reader.onload = function (event) {
                // event.target point to FileReader
                document.getElementById('editableTextArea').value = event.target.result;
            };

            reader.readAsText(file);
}