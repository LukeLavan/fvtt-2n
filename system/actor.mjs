import {table_00_per} from './tables/phb/00_per.js';
import {table_01_str} from './tables/phb/01_str.js';
import {table_02_dex} from './tables/phb/02_dex.js';
import {table_03_con} from './tables/phb/03_con.js';
import {table_04_int} from './tables/phb/04_int.js';
import {table_05_wis} from './tables/phb/05_wis.js';
import {table_06_cha} from './tables/phb/06_cha.js';

export const createActor = async (actor) => {
    // default 'equipment' gearTab
    const gearTab = await Item.create(
        {
            name: 'Equipment',
            type: 'gearTab',
            data: {
                equipped: true,
                default: true,
                locked: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.defaultGearTab': gearTab._id});
    actor.update({'data.equipmentGearTab': gearTab._id});
    actor.system.defaultGearTab = gearTab._id;
    actor.system.equipmentGearTab = gearTab._id;

    // stat-based combat modifiers
    const statHitMod = await Item.create(
        {
            name: 'STR/DEX',
            type: 'hitMod',
            data: {
                melee: '0',
                missile: '0',
                locked: true,
                protected: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.statHitMod': statHitMod._id});

    const statAcMod = await Item.create(
        {
            name: 'DEX',
            type: 'acMod',
            data: {
                dexterity: '0',
                locked: true,
                protected: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.statAcMod': statAcMod._id});

    // encumbrance-based combat modifiers
    const encumbranceHitMod = await Item.create(
        {
            name: 'Encumbrance',
            type: 'hitMod',
            data: {
                melee: '0',
                missile: '0',
                thrown: '0',
                locked: true,
                protected: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.encumbranceHitMod': encumbranceHitMod._id});

    const encumbranceAcMod = await Item.create(
        {
            name: 'Encumbrance',
            type: 'acMod',
            data: {
                natural: '0',
                locked: true,
                protected: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.encumbranceAcMod': encumbranceAcMod._id});
};

export class TwoNActor extends Actor {
    prepareDerivedData() {
        switch (this.type) {
            case 'pc':
                this._preparePCDerivedData(this.system);
                break;
        }
    }

    _preparePCDerivedData(data) {
        this._preparePCDerivedDataAbilities(data);
        data.hitDieRollAdjusted = data.hitDieRoll + ' + ' + data.hitPointAdjust;
        this._preparePCDerivedDataItems(data); // must be before encumbrance
        this._preparePCDerivedDataEncumbrance(data); // must be before ac/hitAdjust
        this._preparePCDerivedDataSavingThrows(data);
        this._preparePCDerivedDataAC(data);
        this._preparePCDerivedDataHitAdjust(data);
    }

    _preparePCDerivedDataAbilities(data) {
        table_01_str(data);
        table_02_dex(data);
        table_03_con(data);
        table_04_int(data);
        table_05_wis(data);
        table_06_cha(data);
        table_00_per(data);
    }

    _preparePCDerivedDataSavingThrows(data) {
        const throws = data.savingThrows;
        throws.ppd = 0;
        throws.rsw = 0;
        throws.pepo = 0;
        throws.brw = 0;
        throws.spell = 0;
        for (let i of this.items) {
            const itemData = i.system;
            if (i.type === 'throwMod' && itemData.active) {
                const ppd = parseInt(itemData.ppd) || 0;
                const rsw = parseInt(itemData.rsw) || 0;
                const pepo = parseInt(itemData.pepo) || 0;
                const brw = parseInt(itemData.brw) || 0;
                const spell = parseInt(itemData.spell) || 0;
                const all = parseInt(itemData.all) || 0;
                throws.ppd += ppd + all;
                throws.rsw += rsw + all;
                throws.pepo += pepo + all;
                throws.brw += brw + all;
                throws.spell += spell + all;
            }
        }
    }

    _preparePCDerivedDataAC(data) {
        // recalculate statAcMod
        if (data.statAcMod) {
            const item = this.items.get(data.statAcMod);
            item.system.dexterity = data.defenseAdjust;
        }

        // recalculate encumbranceAcMod
        if (data.encumbranceAcMod) {
            const item = this.items.get(data.encumbranceAcMod);
            switch (data.currentEncumbrance) {
                case 'base':
                    item.system.natural = '0';
                    break;
                case 'light':
                    item.system.natural = '0';
                    break;
                case 'medium':
                    item.system.natural = '-1';
                    break;
                case 'heavy':
                    item.system.natural = '-2';
                    break;
                case 'severe':
                    item.system.natural = '-3';
                    break;
            }
        }

        // calculate total ac
        const ac = data.armorClasses;
        for (let i of this.items) {
            const itemData = i.system;
            if (i.type === 'acMod' && itemData.active) {
                const natural = parseInt(itemData.natural) || 0;
                const dexterity = parseInt(itemData.dexterity) || 0;
                const armor = parseInt(itemData.armor) || 0;
                const shield = parseInt(itemData.shield) || 0;
                const magic = parseInt(itemData.magic) || 0;
                ac.natural += natural;
                ac.dexterity += dexterity;
                ac.armor += armor;
                ac.shield += shield;
                ac.magic += magic;
            }
        }

        ac.total = ac.natural + ac.dexterity + ac.armor + ac.shield + ac.magic;
        ac.touch = ac.natural + ac.dexterity + ac.shield + ac.magic;
        ac.back = ac.natural + ac.armor + ac.magic;
        ac.surprise = ac.total - 2;
    }

    _preparePCDerivedDataHitAdjust(data) {
        // recalculate statHitMod
        if (data.statHitMod) {
            const item = this.items.get(data.statHitMod);
            item.system.melee = data.meleeHitAdjust;
            item.system.missile = data.missileHitAdjust;
        }

        // recalculate encumbranceHitMod
        if (data.encumbranceHitMod) {
            const item = this.items.get(data.encumbranceHitMod);
            switch (data.currentEncumbrance) {
                case 'base':
                    item.system.melee = '0';
                    item.system.missile = '0';
                    item.system.thrown = '0';
                    break;
                case 'light':
                    item.system.melee = '0';
                    item.system.missile = '0';
                    item.system.thrown = '0';
                    break;
                case 'medium':
                    item.system.melee = '-1';
                    item.system.missile = '-1';
                    item.system.thrown = '-1';
                    break;
                case 'heavy':
                    item.system.melee = '-2';
                    item.system.missile = '-2';
                    item.system.thrown = '-2';
                    break;
                case 'severe':
                    item.system.melee = '-4';
                    item.system.missile = '-4';
                    item.system.thrown = '-4';
                    break;
            }
        }

        // calculate total mods
        const hit = data.hitAdjust;
        for (let i of this.items) {
            const itemData = i.system;
            if (i.type === 'hitMod' && itemData.active) {
                const melee = parseInt(itemData.melee) || 0;
                const missile = parseInt(itemData.missile) || 0;
                const thrown = parseInt(itemData.thrown) || 0;
                hit.melee += melee;
                hit.missile += missile;
                hit.thrown += thrown;
            }
        }
    }

    _preparePCDerivedDataItems(data) {
        let gearTabs = new Map();
        let rollConfigs = new Map();
        const spellTabs = data.spellTabs;
        const weapons = [];
        const combatMods = {
            acMods: [],
            hitMods: [],
            throwMods: [],
        };
        const proficiencies = {
            nonweapon: [],
            weapon: [],
        };

        // TODO: move some of this logic into an abstract function on TwoNItem
        //       that children classes implement
        //       Organizing items into collections is fine, but calculating item
        //       system properties shouldn't go here
        this.items.forEach((item) => {
            if (item.type === 'gearTab') {
                gearTabs.set(item.id, {
                    tab: item,
                    items: [],
                });

                // TODO: configurable coin weight(s)
                const wealth = item.system.wealth;
                wealth.weight =
                    (2 * wealth.copper +
                        2 * wealth.silver +
                        2 * wealth.gold +
                        2 * wealth.platinum +
                        2 * wealth.mithril +
                        2 * wealth.iron) /
                    100;

                item.system.length = 0;
                item.system.weight = wealth.weight;
            } else if (item.type === 'gear') {
                if (gearTabs.has(item.system.tab)) {
                    const tab = gearTabs.get(item.system.tab);
                    tab.items.push(item);
                    tab.tab.system.length += 1;
                    tab.tab.system.weight +=
                        Number(item.system.weight) *
                        Number(item.system.quantity);
                }
            } else if (item.type === 'nonWeaponProficiency') {
                item.system.total =
                    Number(item.system.base) + Number(item.system.adjust);
                proficiencies.nonweapon.push(item);
            } else if (item.type === 'spell')
                spellTabs[item.system.level].spells.push(item);
            else if (item.type === 'weapon') weapons.push(item);
            else if (item.type === 'acMod') combatMods.acMods.push(item);
            else if (item.type === 'hitMod') combatMods.hitMods.push(item);
            else if (item.type === 'throwMod') combatMods.throwMods.push(item);
            else if (item.type === 'weaponProficiency')
                proficiencies.weapon.push(item);
            else if (item.type === 'rollConfig')
                rollConfigs.set(item.system.rollid, item);
        });

        // sort gearTabs by their index
        gearTabs = new Map(
            [...gearTabs.entries()].sort(
                (a, b) => a[1].tab.system.index - b[1].tab.system.index
            )
        );

        const sortByIndex = (a, b) => a.system.index - b.system.index;
        const normalizeIndicies = (items) => {
            for (let i = 0; i < items.length; ++i) items[i].system.index = i;
        };

        let tabindex = 0;
        gearTabs.forEach((tab) => {
            tab.tab.system.index = tabindex++;
            tab.items.sort(sortByIndex);
            normalizeIndicies(tab.items);
        });

        weapons.sort(sortByIndex);
        normalizeIndicies(weapons);

        combatMods.acMods.sort((a, b) => a.system.index - b.system.index);
        combatMods.hitMods.sort((a, b) => a.system.index - b.system.index);
        combatMods.throwMods.sort((a, b) => a.system.index - b.system.index);
        normalizeIndicies(combatMods.acMods);
        normalizeIndicies(combatMods.hitMods);
        normalizeIndicies(combatMods.throwMods);

        proficiencies.nonweapon.sort(sortByIndex);
        proficiencies.weapon.sort(sortByIndex);
        normalizeIndicies(proficiencies.nonweapon);
        normalizeIndicies(proficiencies.weapon);

        for (let tab in spellTabs) {
            spellTabs[tab].spells.sort(sortByIndex);
            normalizeIndicies(spellTabs[tab].spells);
        }

        // rollConfig items are removed if linked to an item not present in parent actor
        for (let [rollid, rollConfig] of rollConfigs) {
            const linkedid = rollConfig.system.linkedid;
            if (linkedid && !this.items.has(linkedid)) {
                rollConfigs.delete(rollid);
                this.deleteEmbeddedDocuments('Item', [rollConfig.id]);
            }
        }

        data.gearTabs = gearTabs;
        data.rollConfigs = rollConfigs;
        data.spellTabs = spellTabs;
        data.weapons = weapons;
        data.combatMods = combatMods;
        data.proficiencies = proficiencies;
    }

    _preparePCDerivedDataEncumbrance(data) {
        // calculate equipped weight
        let equippedWeight = 0;
        data.gearTabs.forEach((tab) => {
            const tabData = tab.tab.system;
            if (tabData.equipped) equippedWeight += tabData.weight;
        });
        data.equippedWeight = equippedWeight;

        // calculate movement modifiers
        const baseSpeed = data.speed;
        const speedLevels = {
            base: baseSpeed,
            light: Math.floor(baseSpeed * (2 / 3)),
            medium: Math.floor(baseSpeed * (1 / 2)),
            heavy: Math.floor(baseSpeed * (1 / 3)),
            severe: 1,
        };
        data.speedLevels = speedLevels;

        // determine which encumbrance category currently applies
        let currentEncumbrance;
        let speedMod;
        const weightLimits = data.weightLimits;
        if (weightLimits) {
            if (equippedWeight <= weightLimits.base) {
                currentEncumbrance = 'base';
                speedMod = speedLevels.base;
            } else if (equippedWeight <= weightLimits.light) {
                currentEncumbrance = 'light';
                speedMod = speedLevels.light;
            } else if (equippedWeight <= weightLimits.medium) {
                currentEncumbrance = 'medium';
                speedMod = speedLevels.medium;
            } else if (equippedWeight <= weightLimits.heavy) {
                currentEncumbrance = 'heavy';
                speedMod = speedLevels.heavy;
            } else if (equippedWeight <= weightLimits.severe) {
                // TODO: no logic for being over severe category
                currentEncumbrance = 'severe';
                speedMod = speedLevels.severe;
            }
        }
        data.currentEncumbrance = currentEncumbrance;
        data.speedMod = speedMod;
    }
}
