export const table_05_wis = (data) => {
    const wis = data.wis;
    switch (wis) {
        case 1:
            data.magicDefenseAdjust = -6;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 80;
            break;
        case 2:
            data.magicDefenseAdjust = -4;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 60;
            break;
        case 3:
            data.magicDefenseAdjust = -3;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 50;
            break;
        case 4:
            data.magicDefenseAdjust = -2;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 45;
            break;
        case 5:
            data.magicDefenseAdjust = -1;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 40;
            break;
        case 6:
            data.magicDefenseAdjust = -1;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 35;
            break;
        case 7:
            data.magicDefenseAdjust = -1;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 30;
            break;
        case 8:
            data.magicDefenseAdjust = 0;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 25;
            break;
        case 9:
            data.magicDefenseAdjust = 0;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 20;
            break;
        case 10:
            data.magicDefenseAdjust = 0;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 15;
            break;
        case 11:
            data.magicDefenseAdjust = 0;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 10;
            break;
        case 12:
            data.magicDefenseAdjust = 0;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 5;
            break;
        case 13:
            data.magicDefenseAdjust = 0;
            data.bonusSpells = '1st';
            data.chanceSpellFailure = 0;
            break;
        case 14:
            data.magicDefenseAdjust = 0;
            data.bonusSpells = '1st';
            data.chanceSpellFailure = 0;
            break;
        case 15:
            data.magicDefenseAdjust = 1;
            data.bonusSpells = '2nd';
            data.chanceSpellFailure = 0;
            break;
        case 16:
            data.magicDefenseAdjust = 2;
            data.bonusSpells = '2nd';
            data.chanceSpellFailure = 0;
            break;
        case 17:
            data.magicDefenseAdjust = 3;
            data.bonusSpells = '3rd';
            data.chanceSpellFailure = 0;
            break;
        case 18:
            data.magicDefenseAdjust = 4;
            data.bonusSpells = '4th';
            data.chanceSpellFailure = 0;
            break;
        case 19:
            data.magicDefenseAdjust = 4;
            data.bonusSpells = '1st, 3rd';
            data.chanceSpellFailure = 0;
            break;
        case 20:
            data.magicDefenseAdjust = 4;
            data.bonusSpells = '2nd, 4th';
            data.chanceSpellFailure = 0;
            break;
        case 21:
            data.magicDefenseAdjust = 4;
            data.bonusSpells = '3rd, 5th';
            data.chanceSpellFailure = 0;
            break;
        case 22:
            data.magicDefenseAdjust = 4;
            data.bonusSpells = '4th, 5th';
            data.chanceSpellFailure = 0;
            break;
        case 23:
            data.magicDefenseAdjust = 4;
            data.bonusSpells = '1st, 6th';
            data.chanceSpellFailure = 0;
            break;
        case 24:
            data.magicDefenseAdjust = 4;
            data.bonusSpells = '5th, 6th';
            data.chanceSpellFailure = 0;
            break;
        case 25:
            data.magicDefenseAdjust = 4;
            data.bonusSpells = '6th, 7th';
            data.chanceSpellFailure = 0;
            break;
        default:
            data.magicDefenseAdjust = 0;
            data.bonusSpells = 'None';
            data.chanceSpellFailure = 0;
            break;
    }
};
