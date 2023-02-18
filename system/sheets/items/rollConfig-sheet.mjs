import {TwoNItemSheet} from '../item-sheet.mjs';

export class TwoNRollConfigSheet extends TwoNItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 420,
            height: 420,
        });
    }

    async getData() {
        const data = await super.getData();

        // initial build of rollStr
        await this.actor.update({
            items: [
                {
                    _id: this.item.id,
                    'system.rollStr': this._buildRollStr(),
                },
            ],
        });

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('input').focus(this._inputFocus);

        html.find('.rollMod-create').click(this.rollModCreate.bind(this));
        html.find('.rollMod-edit').change(this.rollModEdit.bind(this));
        html.find('.rollMod-delete').click(this.rollModDelete.bind(this));
        html.find('.rollMod-lock').click(this.rollModLock.bind(this));
        html.find('.roll').click(this.roll.bind(this));

        html.find('.itemTable-sort').map((_i, el) => {
            // eslint-disable-next-line no-undef
            Sortable.create(el, {
                onUpdate: this._onUpdateDrag.bind(this),
                handle: '.itemTable-handle',
                filter: '[data-locked="true"]',
            });
        });
    }

    /** select contents of input on focus */
    _inputFocus() {
        const el = $(this);
        el.one('mouseup.mouseupSelect', () => {
            el.select();
            return false;
        })
            .one('mousedown', () => {
                el.off('mouseup.mouseupSelect');
            })
            .select();
    }

    _buildRollStr() {
        const mods = this.item.system.mods;
        const roll = this.item.system.roll;

        const dice = {};
        let flatMod = 0;

        // TODO: validate each mod and apply invalid state/style to individual rows
        for (let mod of mods) {
            if (!mod.active || !mod.mod) continue;

            const modSplit = mod.mod
                .replaceAll(' ', '')
                .replaceAll('-', ' -') // add a space to split on so the '-' is included in split
                .toLocaleLowerCase()
                .split(/[+ ]+/);

            for (let subMod of modSplit) {
                if (subMod === '') continue;
                if (!subMod.includes('d')) {
                    // flat modifier, no die roll
                    flatMod += Number.parseInt(subMod);
                    continue;
                } else {
                    // die modifier (eg, "3d20")
                    const dIndex = subMod.indexOf('d');
                    let dieRoll = subMod.substring(dIndex); // (eg, "d20")
                    let numDice = Number.parseInt(subMod.substring(0, dIndex)); // (eg, "3")

                    // NaN interpreted as 1 (eg, "d6" -> "1d6")
                    if (isNaN(numDice)) {
                        if (subMod.charAt(0) === '-') numDice = -1;
                        else numDice = 1;
                    }

                    // add sign to dieRoll, transfering negative from numDice to dieRoll
                    if (numDice < 0) {
                        numDice *= -1;
                        dieRoll = '-' + dieRoll;
                    } else if (numDice >= 0) {
                        dieRoll = '+' + dieRoll;
                    }

                    // insert into dice object
                    if (dieRoll in dice) {
                        // combine like terms
                        dice[dieRoll] += numDice;
                    } else {
                        // new key in dice object
                        dice[dieRoll] = numDice;
                    }
                }
            }
        }

        // unpack dice object to string
        let modStr = '';
        for (const [dieRoll, numDice] of Object.entries(dice)) {
            // dieRoll[0] is always the sign
            modStr += ' ' + dieRoll.charAt(0) + numDice + dieRoll.substring(1);
        }

        // add sign to flatMod if needed
        let flatModStr = flatMod.toString();
        if (flatModStr.charAt(0) != '-') flatModStr = ' +' + flatModStr;

        return roll + modStr + flatModStr;
    }

    /**
     * calls this.actor.update and updates parent actor's rollConfig item (this)
     * to use the given mods array and a rebuilt rollStr
     * Optionally calls this.render() - only do this for DOM changes to
     * lower the risk of focus losses
     */
    async _updateMods(mods, reRender) {
        await this.actor.update({
            items: [
                {
                    _id: this.item.id,
                    'system.mods': mods,
                    'system.rollStr': this._buildRollStr(),
                },
            ],
        });
        if (reRender) await this.render();
    }

    /**
     * calls this.actor.update and updates parent actor's rollConfig item (this)
     * to use given defaultMods array; also replaces any old protected mods with
     * new default mods
     */
    async _updateDefaultMods(defaultMods) {
        const mods = this.item.system.mods,
            nondefaultMods = mods.filter((mod) => !mod.protected);

        await this.actor.update({
            items: [
                {
                    _id: this.item.id,
                    'system.defaultMods': defaultMods,
                    'system.mods': defaultMods.concat(nondefaultMods),
                },
            ],
        });
    }

    async rollModCreate() {
        const mods = this.item.system.mods;
        mods.push({
            name: 'New modifier',
            mod: '',
            roll: undefined,
            active: true,
            locked: false,
            protected: false,
        });
        await this._updateMods(mods, true);
    }

    async rollModEdit(event) {
        const currentTarget = $(event.currentTarget);
        const index = currentTarget.data('index');
        const target = currentTarget.data('target');
        let value = currentTarget.val();

        // ensure checkbox values are booleans
        if (currentTarget.attr('type') === 'checkbox') {
            if (currentTarget.is(':checked')) value = true;
            else value = false;
        }

        const mods = this.item.system.mods;
        mods[index][target] = value;

        await this._updateMods(mods, false);
    }

    async rollModDelete(event) {
        const currentTarget = $(event.currentTarget);
        const index = currentTarget.data('index');

        let mods = this.item.system.mods;
        if (mods.length === 1) mods = [];
        else mods.splice(index, index);

        await this._updateMods(mods, true);
    }

    async rollModLock(event) {
        const currentTarget = $(event.currentTarget);
        const index = currentTarget.data('index');

        const mods = this.item.system.mods;
        mods[index].locked = !mods[index].locked;

        await this._updateMods(mods, true);
    }

    /**
     * @param {number} total the final result of the roll; left side of comparison
     * @param {string} comparison encodes the desired comparison type, e.g. '>='
     * @param {number} target right side of comparison
     *
     * @return {boolean} result of comparison
     */
    _rollDetermineSuccess(total, comparison, target) {
        switch (comparison) {
            case '>':
                return total > target;
            case '>=':
                return total >= target;
            case '<':
                return total < target;
            case '<=':
                return total <= target;
            case '==':
                return total == target;
            case '!=':
                return total != target;
        }
    }

    async roll() {
        const mods = this.item.system.mods;
        let modsSum = 0;

        // compute each mod individually
        for (const mod of mods) {
            if (!mod.active || !mod.mod) continue;

            const modRoll = new Roll(mod.mod);
            await modRoll.evaluate({async: true});

            mod.roll = modRoll;
            modsSum += modRoll.total;
        }

        // compute base roll and add sum of modifiers
        const roll = new Roll(this.item.system.roll + '+' + modsSum);
        await roll.evaluate({async: true});

        // re-render so that lastRoll updates
        this.item.system.lastRoll = roll;
        this.render();

        let success;
        if (this.item.system.comparison)
            success = this._rollDetermineSuccess(
                roll.total,
                this.item.system.comparison,
                this.item.system.target
            );

        const resultTemplate = this.item.system.resultTemplate;

        const html = await renderTemplate(
            `systems/fvtt-2n/templates/chats/rollResults/${resultTemplate}.html`,
            {
                roll,
                modsSum,
                rollConfig: this.item.system,
                success,
            }
        );

        return ChatMessage.create({
            flavor: `<h3>${this.item.name}: ${this.item.system.rollStr}</h3>`,
            content: html,
            'flags.fvtt-2n.rollResult': true,
        });
    }

    _onUpdateDrag(event) {
        const mods = this.item.system.mods;

        mods.splice(
            event.newDraggableIndex,
            0,
            mods.splice(event.oldDraggableIndex, 1)[0]
        );
        this._updateMods(mods);
    }
}
