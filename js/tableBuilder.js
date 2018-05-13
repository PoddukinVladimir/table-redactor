var TableBuilder = (function () {
    var tbody = document.getElementById('editableTableArea');
    var data = tableDataService.getData();

    function addRow(colDefs) {
        console.log('in IE');
        var row = document.createElement('tr');

        row.setAttribute('draggable', 'true');

        EventUtil.addHandler(row, 'dragstart', function (ev) {
            row.id = 'draggedRow';
            ev.dataTransfer.setData("text", row.id);
        });

        // adding columns
        if (colDefs) {
            for (var prop in colDefs) {
                if (colDefs.hasOwnProperty(prop)) {
                    // appending column
                    addCol(row, colDefs[prop]);
                }
            }
        } else {
            for (prop in data[0]) {
                if (data[0].hasOwnProperty(prop)) {
                    // appending column
                    addCol(row, '');
                }
            }
        }

        var defaultColTemplate = '<div class="table-edit-container">' +
            '<button class="table-button-remove"></button>' +
            '</div>';

        addDefaultCol(row, defaultColTemplate);

        tbody.appendChild(row);
    }

    function addCol(row, template) {
        var col = document.createElement('td');

        col.innerHTML = template;
        col.setAttribute('contenteditable', 'true');

        row.appendChild(col);
    }

    function addDefaultCol(row, template) {
        var editCol = document.createElement('td');
        editCol.innerHTML = template;
        editCol.className = 'edit-column';

        row.appendChild(editCol);
    }

    return {
        initTable: function () {
            var data = tableDataService.getData();
            var dataLength = data.length;
            tbody.innerHTML = '';
            var i;

            // loop through data array
            for (i = 0; i < dataLength; i++) {
                addRow(data[i]);
            }
        },
        addRow: addRow,
        removeRow: function (row) {
            tbody.removeChild(row);
        },
        swapRows: function (row1, row2) {
            var temp = document.createElement('tr');

            tbody.insertBefore(temp, row2);
            tbody.insertBefore(row2, row1);
            tbody.insertBefore(row1, temp);

            tbody.removeChild(temp);
        }
    }
})();