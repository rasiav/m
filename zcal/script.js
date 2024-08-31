function calculateBaseDMG() {
    const atk = parseFloat(document.getElementById('atk').value);
    const skillMV = parseFloat(document.getElementById('skillMV').value);

    if (isNaN(atk) || isNaN(skillMV)) {
        document.getElementById('baseDMGResult').innerText = 'Please enter valid ATK and Skill MV values.';
        return;
    }

    const baseDMG = atk * (skillMV / 100);
    document.getElementById('baseDMGResult').innerText = `Base DMG: ${baseDMG.toFixed(2)}`;
}

function calculateDMGPercent() {
    const dmgPercent = parseFloat(document.getElementById('dmgPercent').value);

    if (isNaN(dmgPercent)) {
        document.getElementById('dmgPercentResult').innerText = 'Please enter a valid DMG% value.';
        return;
    }

    const dmgMultiplier = 1 + (dmgPercent / 100);
    document.getElementById('dmgPercentResult').innerText = `DMG Multiplier: ${dmgMultiplier.toFixed(2)}`;
}

function calculateDEFMultiplier() {
    const def = parseFloat(document.getElementById('def').value);
    const levelCoef = parseFloat(document.getElementById('levelCoef').value);

    if (isNaN(def) || isNaN(levelCoef)) {
        document.getElementById('defMultiplierResult').innerText = 'Please enter valid DEF and Level Coefficient values.';
        return;
    }

    const defMultiplier = 1 - (def / (def + levelCoef));
    document.getElementById('defMultiplierResult').innerText = `DEF Multiplier: ${defMultiplier.toFixed(4)}`;
}

function calculateRESMultiplier() {
    const res = parseFloat(document.getElementById('res').value);

    if (isNaN(res)) {
        document.getElementById('resMultiplierResult').innerText = 'Please enter a valid RES value.';
        return;
    }

    const resMultiplier = 1 - (res / 100);
    document.getElementById('resMultiplierResult').innerText = `RES Multiplier: ${resMultiplier.toFixed(2)}`;
}

function calculateStunMultiplier() {
    const stunBonus = parseFloat(document.getElementById('stunBonus').value);

    if (isNaN(stunBonus)) {
        document.getElementById('stunMultiplierResult').innerText = 'Please enter a valid Stun Bonus value.';
        return;
    }

    const stunMultiplier = 1 + (stunBonus / 100);
    document.getElementById('stunMultiplierResult').innerText = `Stun Multiplier: ${stunMultiplier.toFixed(2)}`;
}

function calculateAnomalyBuildup() {
    const anomalyMV = parseFloat(document.getElementById('anomalyMV').value);
    const anomalyRes = parseFloat(document.getElementById('anomalyRes').value);

    if (isNaN(anomalyMV) || isNaN(anomalyRes)) {
        document.getElementById('anomalyBuildupResult').innerText = 'Please enter valid Anomaly MV and RES Multiplier values.';
        return;
    }

    const anomalyBuildup = anomalyMV * anomalyRes;
    document.getElementById('anomalyBuildupResult').innerText = `Anomaly Buildup: ${anomalyBuildup.toFixed(2)}`;
}
