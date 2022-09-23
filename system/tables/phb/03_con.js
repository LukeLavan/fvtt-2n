export const table_03_con = (data) => {
    const con = data.con;
    switch (con) {
        case 1:
            data.hitPointAdjust = -3;
            data.systemShock = 25;
            data.poisonSave = -2;
            data.regen = 'None';
            break;
        case 2:
            data.hitPointAdjust = -2;
            data.systemShock = 30;
            data.poisonSave = -1;
            data.regen = 'None';
            break;
        case 3:
            data.hitPointAdjust = -2;
            data.systemShock = 35;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 4:
            data.hitPointAdjust = -1;
            data.systemShock = 40;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 5:
            data.hitPointAdjust = -1;
            data.systemShock = 45;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 6:
            data.hitPointAdjust = -1;
            data.systemShock = 50;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 7:
            data.hitPointAdjust = 0;
            data.systemShock = 55;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 8:
            data.hitPointAdjust = 0;
            data.systemShock = 60;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 9:
            data.hitPointAdjust = 0;
            data.systemShock = 65;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 10:
            data.hitPointAdjust = 0;
            data.systemShock = 70;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 11:
            data.hitPointAdjust = 0;
            data.systemShock = 75;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 12:
            data.hitPointAdjust = 0;
            data.systemShock = 80;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 13:
            data.hitPointAdjust = 0;
            data.systemShock = 85;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 14:
            data.hitPointAdjust = 0;
            data.systemShock = 88;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 15:
            data.hitPointAdjust = 1;
            data.systemShock = 90;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 16:
            data.hitPointAdjust = 2;
            data.systemShock = 95;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 17:
            data.hitPointAdjust = 2;
            data.systemShock = 97;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 18:
            data.hitPointAdjust = 2;
            data.systemShock = 99;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
        case 19:
            data.hitPointAdjust = 2;
            data.systemShock = 99;
            data.poisonSave = 1;
            data.regen = 'None';
            break;
        case 20:
            data.hitPointAdjust = 2;
            data.systemShock = 99;
            data.poisonSave = 1;
            data.regen = '1/6 turns';
            break;
        case 21:
            data.hitPointAdjust = 2;
            data.systemShock = 99;
            data.poisonSave = 2;
            data.regen = '1/5 turns';
            break;
        case 22:
            data.hitPointAdjust = 2;
            data.systemShock = 99;
            data.poisonSave = 2;
            data.regen = '1/4 turns';
            break;
        case 23:
            data.hitPointAdjust = 2;
            data.systemShock = 99;
            data.poisonSave = 3;
            data.regen = '1/3 turns';
            break;
        case 24:
            data.hitPointAdjust = 2;
            data.systemShock = 99;
            data.poisonSave = 3;
            data.regen = '1/2 turns';
            break;
        case 25:
            data.hitPointAdjust = 2;
            data.systemShock = 100;
            data.poisonSave = 4;
            data.regen = '1 turn';
            break;
        default:
            data.hitPointAdjust = 0;
            data.systemShock = 0;
            data.poisonSave = 0;
            data.regen = 'None';
            break;
    }
};
