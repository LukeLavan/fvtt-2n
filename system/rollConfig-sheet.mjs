import {TwoNItemSheet} from './item-sheet.mjs';

export class TwoNRollConfigSheet extends TwoNItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['TwoN', 'sheet', 'item'],
            width: 360,
            height: 420,
            tabs: [],
        });
    }

    get template() {
        return `systems/fvtt-2n/templates/rollConfig-sheet.html`;
    }

    async getData(options) {
        const data = await super.getData(options);
        data.enrichedHTML = await TextEditor.enrichHTML(
            this.object.system.description,
            {async: true}
        );
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
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

    /**
     * calls this.actor.update and updates parent actor's rollConfig item (this)
     * to use the given mods array
     */
    async _updateMods(mods) {
        await this.actor.update({
            items: [
                {
                    _id: this.item.id,
                    'system.mods': mods,
                },
            ],
        });
    }

    /** also triggers this.render() */
    async rollModCreate() {
        const mods = this.item.system.mods;
        mods.push({
            name: 'New modifier',
            mod: '',
            roll: undefined,
            active: true,
            locked: false,
        });
        await this._updateMods(mods);
        this.render();
    }

    /** does not trigger this.render() */
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

        await this._updateMods(mods);
    }

    /** also triggers this.render() */
    async rollModDelete(event) {
        const currentTarget = $(event.currentTarget);
        const index = currentTarget.data('index');

        let mods = this.item.system.mods;
        if (mods.length === 1) mods = [];
        else mods.splice(index, index);

        await this._updateMods(mods);
        this.render();
    }

    /** also triggers this.render() */
    async rollModLock(event) {
        const currentTarget = $(event.currentTarget);
        const index = currentTarget.data('index');

        const mods = this.item.system.mods;
        mods[index].locked = !mods[index].locked;

        await this._updateMods(mods);
        this.render();
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
        /** the final value to add to the roll, evaluating all sub-rolls */
        let sumMod = 0;
        /** a string representing the sum value of mods, adding flat values and preserving subrolls */
        let strMod = '';
        /** the sum value of all flat mods (ie, only mods such that isNaN(mod)) */
        let sumModFlat = 0;

        for (let i = 0; i < mods.length; ++i) {
            if (!mods[i].active) continue;
            // evaluate each mod as a new roll, coercing numbers to strings
            mods[i].roll = new Roll('' + mods[i].mod);
            await mods[i].roll.evaluate({async: true});
            sumMod += mods[i].roll.total;

            // build strMod
            // TODO: combine like terms of dice ('d6 + 2d6 - 2d6' -> '3d6 - 2d6')
            //       positive dice and negative dice shouldn't combine
            if (isNaN(mods[i].mod)) {
                if (strMod === '') strMod = mods[i].mod;
                else {
                    if (mods[i].mod.charAt(0) != '-')
                        strMod += ' + ' + mods[i].mod;
                    else strMod += ' - ' + mods[i].mod.substring(1);
                }
            } else sumModFlat += +mods[i].mod; // all flat mods are combined
        }

        if (sumModFlat != 0)
            strMod +=
                (strMod === '' ? '' : sumModFlat > 0 ? ' + ' : ' - ') +
                Math.abs(sumModFlat);

        let roll = new Roll(this.item.system.roll + '+' + sumMod);
        await roll.evaluate({async: true});

        let success;
        if (this.item.system.comparison)
            success = this._rollDetermineSuccess(
                roll.total,
                this.item.system.comparison,
                this.item.system.target
            );

        const html = await renderTemplate(
            'systems/fvtt-2n/templates/rollResult.html',
            {
                roll,
                rollConfig: this.item.system,
                sumMod,
                success,
            }
        );

        return ChatMessage.create({
            flavor: `<h3>${this.item.name}: ${
                this.item.system.roll + (strMod ? ' + ' + strMod : '')
            }</h3>`,
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
