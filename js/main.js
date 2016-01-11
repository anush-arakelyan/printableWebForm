(function() {
    window.onload = function() {
        var inputs, element,
            selectedRegion,
            declarer,
            checkPassportSeria,
            location,
            date, code,
            regionSelectVisible,
            inputDay,
            selectDay,
            inputMonth,
            selectMonth,
            dayAndMonth;
        inputs = document.getElementsByTagName('input');
        setEvents(inputs);
        printButton = document.querySelector('.print');
        printButton.onclick = function() {
            if (!(isValid(inputs) && passportValidation() && checkSpace(document.getElementById('declarer').value) && regionValidation())) {
                window.alert('Լրացրեք բոլոր դաշտերը բացառությամբ ստորագրություն դաշտի։');
            } else {
                window.print();
            }
        };
        var getSelectedRegion = function() {
            var allRegions,
                selectedRegion;
            allRegions = document.getElementById('allRegions');
            selectedRegion = allRegions.options[allRegions.selectedIndex].value;
            return selectedRegion;
        }
        var getRegionById = function(region) {
            var address = dataJson.getAddress();
            document.getElementById('address').innerHTML = address[region].street + ', ' + address[region].postIndex;
        };
        selectedRegion = document.querySelector('#allRegions');
        var regionValidation = function() {
            if (!selectedRegion.value) {
                return false;
            } else {
                return true;
            }
        };
        selectedRegion.onchange = function() {
            var region, city;
            region = getSelectedRegion();
            getRegionById(region);
            city = dataJson.getAddress();
            document.getElementById('assign').innerHTML = city[region].recipient + '</br>' + city[region].name;
        };
        declarer = document.getElementById('declarer');
        declarer.onkeyup = function() {
            var value = document.getElementById('declarer').value;
            if (value) {
                document.getElementById('userName').innerHTML = value;
            } else {
                document.getElementById('userName').innerHTML = 'ԱՐՄԻՆԵ ԳՐԻԳՈՐՅԱՆ';
            }
            checkSpace(value);
        };
        var checkSpace = function(value) {
            value = value.trim();
            var space = value.split(' ');
            if (space.length === 3) {
                declarer.style.borderColor = 'black';
                declarer.style.color = 'black';
                return true;
            } else {
                declarer.style.borderColor = 'red';
                declarer.style.color = 'red';
                return false;
            }
        };
        checkPassportSeria = document.getElementById('seria');
        checkPassportSeria.onkeyup = function() {
            passportValidation();
        };
        var passportValidation = function() {
            var regExp,
                value,
                inputValue;
            regExp = /^[A-Z]{2}[0-9]{7}$/;
            value = document.getElementById('seria').value;
            value = value.trim();
            inputValue = regExp.exec(value);
            if (inputValue == null) {
                checkPassportSeria.style.borderColor = 'red';
                checkPassportSeria.style.color = 'red';
                return false;
            } else {
                checkPassportSeria.style.borderColor = 'black';
                checkPassportSeria.style.color = 'black';
                return true;
            }
        };
        location = document.getElementById('location');
        location.onkeyup = function() {
            if (location.value) {
                document.getElementById('userAddress').innerHTML = location.value;
                location.style.borderColor = 'black';
            } else {
                document.getElementById('userAddress').innerHTML = 'ԵՐԵՎԱՆ, ԳԱՐԵԳԻՆ ՆժԴԵՀԻ 20/14';
                location.style.borderColor = 'red';
            }
        };
        date = document.getElementById('date');
        date.onclick = function() {
            date.type = 'date';
            if (!date.value) {
                date.style.borderColor = 'red';
            }
        };
        date.onblur = function() {
            date.type = 'text';
        };
        date.onchange = function() {
            var dateValue,
                dateMonth;
            date.type = 'text';
            dateValue = date.value.split('-');
            dateMonth = dateValue[1];
            date.style.borderColor = 'black';
            date.value = dateValue[2] + '.' + dateMonth + '.' + dateValue[0];
        };
        code = document.getElementById('code');
        code.onkeyup = function() {
            var regExp,
                value;
            regExp = /^[0-9]{3}$/;
            code.value = code.value.trim();
            value = regExp.exec(code.value);
            if (!value) {
                code.style.borderColor = 'red';
                code.style.color = 'red';
            } else {
                code.style.borderColor = 'black';
                code.style.color = 'black';
            }
        };
        regionSelectVisible = document.getElementById('assign');
        regionSelectVisible.onclick = function() {
            selectedRegion.style.display = 'flex';
            regionSelectVisible.style.display = 'none';
        };
        selectedRegion.onclick = function() {
            selectedRegion.style.display = 'none';
            regionSelectVisible.style.display = 'flex';
        };
        dayAndMonth = document.getElementById('current-date');
        dayAndMonth.onclick = function() {
            dayAndMonth.type = 'date';
            if (!dayAndMonth.value) {
                dayAndMonth.style.borderColor = 'red';
            }
        };
        dayAndMonth.onblur = function() {
            dayAndMonth.type = 'text';
        };
        dayAndMonth.onchange = function() {
            var dateValue,
                dateMonth,
                monthObj,
                i;
            dayAndMonth.type = 'text';
            dateValue = dayAndMonth.value.split('-');
            dateMonth = parseInt(dateValue[1], 10);
            dayAndMonth.style.borderColor = 'black';
            monthObj = ['հունվար', 'փետրվար', 'մարտ', 'ապրիլ', 'մայիս', 'հունիս', 'հուլիս', 'օգոստոս', 'սեկտեմբեր', 'հոկտոմբեր', 'նոյեմբեր', 'դեկտեմբեր'];
            for (i in monthObj) {
                i = parseInt(i, 10);
                if ((i + 1) == dateMonth) {
                    dateMonth = monthObj[i];
                }
            }
            dayAndMonth.value = '«' + dateValue[2] + '»' + ' ' + dateMonth + ' ' + dateValue[0] + 'թ․';
        };
    }
    var isValid = function(inputs) {
        var i, input, inputsLength = inputs.length;
        for (i = 0; i < inputsLength; i++) {
            input = inputs[i];
            if (!input.value) {
                return false;
            }
        }
        return true;
    };
    var setEvents = function(inputs) {
        var i, input, inputsLength = inputs.length;
        for (i = 0; i < inputsLength; i++) {
            input = inputs[i];
            if (!input.value) {
                input.style.borderColor = 'red';
            }
        }
    };
})();
