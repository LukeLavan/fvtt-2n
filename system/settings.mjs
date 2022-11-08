/** Registers all settings defined in /system/settings.mjs */
export const registerSettings = () => {
    settings.map(({key, data}) => game.settings.register('fvtt-2n', key, data));
};

const settings = [
    {
        key: 'createItemTypesHidden',
        data: {
            name: 'Hidden Item Types',
            hint: 'Hides items in create item dialog (comma separated list)',
            scope: 'client',
            config: true,
            type: String,
            default:
                'throwMod, acMod, hitMod, gearTab, nonWeaponProficiency, rollConfig, weaponProficiency',
        },
    },
    {
        key: 'spellSheetShowsResidue',
        data: {
            name: 'Spell Sheet has Residue Section',
            hint: 'When false, spell sheet hides editable Residue section',
            scope: 'world',
            config: true,
            type: Boolean,
            default: false,
        },
    },
];
