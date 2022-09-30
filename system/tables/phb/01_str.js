export const table_01_str = (data) => {
    const str = data.str;
    switch (str) {
        case 1:
            data.meleeHitAdjust = -5;
            data.meleeDamageAdjust = -4;
            data.weightAllowance = 1;
            data.maxPress = 3;
            data.openDoors = 1;
            data.bendBars = 0;
            break;
        case 2:
            data.meleeHitAdjust = -3;
            data.meleeDamageAdjust = -2;
            data.weightAllowance = 1;
            data.maxPress = 5;
            data.openDoors = 1;
            data.bendBars = 0;
            data.weightLimits = {
                base: 1,
                light: 2,
                medium: 3,
                heavy: 4,
                severe: 6,
            };
            break;
        case 3:
            data.meleeHitAdjust = -3;
            data.meleeDamageAdjust = -1;
            data.weightAllowance = 5;
            data.maxPress = 10;
            data.openDoors = 2;
            data.bendBars = 0;
            data.weightLimits = {
                base: 5,
                light: 6,
                medium: 7,
                heavy: 9,
                severe: 10,
            };
            break;
        case 4:
        case 5:
            data.meleeHitAdjust = -2;
            data.meleeDamageAdjust = -1;
            data.weightAllowance = 10;
            data.maxPress = 25;
            data.openDoors = 3;
            data.bendBars = 0;
            data.weightLimits = {
                base: 10,
                light: 13,
                medium: 16,
                heavy: 19,
                severe: 25,
            };
            break;
        case 6:
        case 7:
            data.meleeHitAdjust = -1;
            data.meleeDamageAdjust = 0;
            data.weightAllowance = 20;
            data.maxPress = 55;
            data.openDoors = 4;
            data.bendBars = 0;
            data.weightLimits = {
                base: 20,
                light: 29,
                medium: 38,
                heavy: 46,
                severe: 55,
            };
            break;
        case 8:
        case 9:
            data.meleeHitAdjust = 0;
            data.meleeDamageAdjust = 0;
            data.weightAllowance = 35;
            data.maxPress = 90;
            data.openDoors = 5;
            data.bendBars = 1;
            data.weightLimits = {
                base: 35,
                light: 50,
                medium: 65,
                heavy: 80,
                severe: 90,
            };
            break;
        case 10:
        case 11:
            data.meleeHitAdjust = 0;
            data.meleeDamageAdjust = 0;
            data.weightAllowance = 40;
            data.maxPress = 115;
            data.openDoors = 6;
            data.bendBars = 2;
            data.weightLimits = {
                base: 40,
                light: 58,
                medium: 76,
                heavy: 96,
                severe: 110,
            };
            break;
        case 12:
        case 13:
            data.meleeHitAdjust = 0;
            data.meleeDamageAdjust = 0;
            data.weightAllowance = 45;
            data.maxPress = 140;
            data.openDoors = 7;
            data.bendBars = 4;
            data.weightLimits = {
                base: 45,
                light: 69,
                medium: 93,
                heavy: 117,
                severe: 140,
            };
            break;
        case 14:
        case 15:
            data.meleeHitAdjust = 0;
            data.meleeDamageAdjust = 0;
            data.weightAllowance = 55;
            data.maxPress = 170;
            data.openDoors = 8;
            data.bendBars = 7;
            data.weightLimits = {
                base: 55,
                light: 85,
                medium: 115,
                heavy: 145,
                severe: 170,
            };
            break;
        case 16:
            data.meleeHitAdjust = 0;
            data.meleeDamageAdjust = 1;
            data.weightAllowance = 70;
            data.maxPress = 195;
            data.openDoors = 9;
            data.bendBars = 10;
            data.weightLimits = {
                base: 70,
                light: 100,
                medium: 130,
                heavy: 160,
                severe: 195,
            };
            break;
        case 17:
            data.meleeHitAdjust = 1;
            data.meleeDamageAdjust = 1;
            data.weightAllowance = 85;
            data.maxPress = 220;
            data.openDoors = 10;
            data.bendBars = 13;
            data.weightLimits = {
                base: 85,
                light: 121,
                medium: 157,
                heavy: 193,
                severe: 220,
            };
            break;
        case 18:
            //TODO: percentile strength
            data.meleeHitAdjust = 1;
            data.meleeDamageAdjust = 2;
            data.weightAllowance = 110;
            data.maxPress = 255;
            data.openDoors = 11;
            data.bendBars = 16;
            data.weightLimits = {
                base: 110,
                light: 149,
                medium: 188,
                heavy: 227,
                severe: 255,
            };
            break;
        case 19:
            data.meleeHitAdjust = 3;
            data.meleeDamageAdjust = 7;
            data.weightAllowance = 485;
            data.maxPress = 640;
            data.openDoors = 16;
            data.bendBars = 50;
            break;
        case 20:
            data.meleeHitAdjust = 3;
            data.meleeDamageAdjust = 8;
            data.weightAllowance = 535;
            data.maxPress = 700;
            data.openDoors = 17;
            data.bendBars = 60;
            break;
        case 21:
            data.meleeHitAdjust = 4;
            data.meleeDamageAdjust = 9;
            data.weightAllowance = 635;
            data.maxPress = 810;
            data.openDoors = 17;
            data.bendBars = 70;
            break;
        case 22:
            data.meleeHitAdjust = 4;
            data.meleeDamageAdjust = 10;
            data.weightAllowance = 785;
            data.maxPress = 970;
            data.openDoors = 18;
            data.bendBars = 80;
            break;
        case 23:
            data.meleeHitAdjust = 5;
            data.meleeDamageAdjust = 11;
            data.weightAllowance = 935;
            data.maxPress = 1130;
            data.openDoors = 18;
            data.bendBars = 90;
            break;
        case 24:
            data.meleeHitAdjust = 6;
            data.meleeDamageAdjust = 12;
            data.weightAllowance = 1235;
            data.maxPress = 1440;
            data.openDoors = 19;
            data.bendBars = 95;
            break;
        case 25:
            data.meleeHitAdjust = 7;
            data.meleeDamageAdjust = 14;
            data.weightAllowance = 1535;
            data.maxPress = 1750;
            data.openDoors = 19;
            data.bendBars = 99;
            break;
        default:
            data.meleeHitAdjust = 0;
            data.meleeDamageAdjust = 0;
            data.weightAllowance = 0;
            data.maxPress = 0;
            data.openDoors = 0;
            data.bendBars = 0;
            break;
    }
};
