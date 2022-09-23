export const table_02_dex = (data) => {
    const dex = data.dex;
    switch (dex) {
        case 1:
            data.missileHitAdjust = -6;
            data.defenseAdjust = -5;
            break;
        case 2:
            data.missileHitAdjust = -4;
            data.defenseAdjust = -5;
            break;
        case 3:
            data.missileHitAdjust = -3;
            data.defenseAdjust = -4;
            break;
        case 4:
            data.missileHitAdjust = -2;
            data.defenseAdjust = -3;
            break;
        case 5:
            data.missileHitAdjust = -1;
            data.defenseAdjust = -2;
            break;
        case 6:
            data.missileHitAdjust = 0;
            data.defenseAdjust = -1;
            break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
            data.missileHitAdjust = 0;
            data.defenseAdjust = 0;
            break;
        case 15:
            data.missileHitAdjust = 0;
            data.defenseAdjust = 1;
            break;
        case 16:
            data.missileHitAdjust = 1;
            data.defenseAdjust = 2;
            break;
        case 17:
            data.missileHitAdjust = 2;
            data.defenseAdjust = 3;
            break;
        case 18:
            data.missileHitAdjust = 2;
            data.defenseAdjust = 4;
            break;
        case 19:
        case 20:
            data.missileHitAdjust = 3;
            data.defenseAdjust = 4;
            break;
        case 21:
        case 22:
        case 23:
            data.missileHitAdjust = 4;
            data.defenseAdjust = 5;
            break;
        case 24:
        case 25:
            data.missileHitAdjust = 5;
            data.defenseAdjust = 6;
            break;
        default:
            data.missileHitAdjust = 0;
            data.defenseAdjust = 0;
    }
};
