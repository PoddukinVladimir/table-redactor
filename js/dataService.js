var tableDataService = (function () {

    var model = [
        {name: 'name1', value: 'value1'},
        {name: 'name2', value: 'value2'},
        {name: 'name3', value: 'value3'},
        {name: 'name4', value: 'value4'}
    ];

    // checking if local storage flag is set
    if (window.localStorage.getItem('isSaved') === 'true') {
        model = JSON.parse(window.localStorage.getItem('model'));
    }

    return {
        getData: function () {
            return model;
        },
        setData: function (newModel) {
            model = newModel;
        },
        data: model,
        updateModel: function () {
            var newModel = [];

            var tbody = document.getElementById('editableTableArea');

            var rows = tbody.children;
            var rowCount = tbody.childElementCount;

            // iterating through table rows and cols and updating model
            for (var iRow = 0; iRow < rowCount; iRow++) {
                var line = {};
                var colCount = rows[iRow].childElementCount;
                var cols = rows[iRow].children;

                for (var jCol = 0; jCol < colCount - 1; jCol++) {
                    switch (jCol) {
                        case 0:
                            line.name = cols[jCol].innerText;
                            break;
                        case 1:
                            line.value = cols[jCol].innerText;
                            break;
                    }
                }
                newModel.push(line);
            }

            this.setData(newModel);
        }
    }

})();