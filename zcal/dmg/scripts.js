document.addEventListener('DOMContentLoaded', function() {
    function getInputs() {
        // Safely retrieve values from the inputs and convert them to numbers
        return {
            input1: parseInt(document.getElementById("input1")?.value, 10) || 0,
                          input2: parseInt(document.getElementById("input2")?.value, 10) || 0,
                          input3: parseInt(document.getElementById("input3")?.value, 10) || 0,
                          input4: parseInt(document.getElementById("input4")?.value, 10) || 0,
                          input5: parseInt(document.getElementById("input5")?.value, 10) || 0,
                          input6: parseInt(document.getElementById("input6")?.value, 10) || 0,
                          input7: parseInt(document.getElementById("input7")?.value, 10) || 0,
                          input8: parseInt(document.getElementById("input8")?.value, 10) || 0,
                          input9: parseInt(document.getElementById("input9")?.value, 10) || 0,
                          input10: parseInt(document.getElementById("input10")?.value, 10) || 0
        };
    }

    function formatNumber(num) {
        // Format the number with commas
        return num.toLocaleString();
    }

    function calculate(type) {
        console.log("calculator selected: ", type);

        const { input1, input2, input3, input4, input5, input6, input7, input8 } = getInputs();
        console.log(input1, input2, input3, input4, input5, input6, input7, input8);

        let result;
        switch (type) {
            case 'averagedmg':
                console.log('worked1');
                // Ensure to use the correct formula for averagedmg
                result = input1 * input2 * input3 * input4 * input5 * input6 * (1 + input7);
                // Format the result with commas
                document.getElementById("result").textContent = 'Outgoing Damage: ' + formatNumber(result);
                console.log('worked1', result);
                break;
            case 'base-dmg':
                console.log('worked2');
                // Add specific calculation for base-dmg here
                break;
            case 'damage-reduction':
                console.log('worked3');
                // Add specific calculation for damage-reduction here
                break;
            case 'daze':
                console.log('worked4');
                // Add specific calculation for daze here
                break;
            case 'def':
                console.log('worked5');
                // Add specific calculation for def here
                break;
            case 'distance':
                console.log('worked6');
                // Add specific calculation for distance here
                break;
            case 'dmg-multiplier':
                console.log('worked7');
                // Add specific calculation for dmg-multiplier here
                break;
            case 'impact':
                console.log('worked8');
                // Add specific calculation for impact here
                break;
            case 'outgoing-dmg':
                result = input1 * input2 * input3 * input4 * input5 * input6;
                // Format the result with commas
                document.getElementById("result").textContent = 'Outgoing Damage: ' + formatNumber(result);
                console.log('worked9', result);
                break;
            case 'res':
                console.log('worked10');
                // Add specific calculation for res here
                break;
            case 'stats':
                // Corrected formula with proper operator
                result = ((input1 + input2) * (1 + input3) + input4) * (1 + input5) + input6;
                // Format the result with commas
                document.getElementById("result").textContent = 'Outgoing Damage: ' + formatNumber(result);
                console.log('worked11', result);
                // Add specific calculation for stats here
                break;
            case 'stun':
                console.log('worked12');
                // Add specific calculation for stun here
                break;
            default:
                console.error("Invalid calculation type");
        }
    }

    function goBack() {
        window.history.back();
    }

    // Attach calculate and goBack functions to window to make them accessible globally
    window.calculate = calculate;
    window.goBack = goBack;
});
