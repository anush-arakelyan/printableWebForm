(function() {
    window.onload = function() {
        var inputs, element,
            selectedRegion,
            declarer,
            checkPassportSeria,
            location;
        inputs = document.getElementsByTagName('input');
        setEvents(inputs);
        printButton = document.querySelector('.print');
        printButton.onclick = function() {
            if (!(isValid(inputs) && passportValidation() && checkSpace(document.getElementById('declarer').value))) {
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
            document.getElementById('address').innerHTML = address[region].street + ' ' + address[region].postIndex;
        }
        selectedRegion = document.querySelector('#allRegions');
        selectedRegion.onchange = function() {
            var region, city;
            region = getSelectedRegion();
            getRegionById(region);
            city = dataJson.getAddress();
            document.getElementById('assign').value = city[region].recipient + '\n' + city[region].name;
        };
        declarer = document.getElementById('declarer');
        declarer.onkeyup = function() {
            var value = document.getElementById('declarer').value;
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
            if (!location.value) {
                location.style.borderColor = 'red';
            } else {
                location.style.borderColor = 'black';
            }
        }
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