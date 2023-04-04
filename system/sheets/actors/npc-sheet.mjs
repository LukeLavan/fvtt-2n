import {TwoNActorSheet} from '../actor-sheet.mjs';

export class TwoNNPCCharacterActorSheet extends TwoNActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: 'systems/fvtt-2n/templates/sheets/actors/npc-sheet.html',
        });
    }

    async getData() {
        const data = super.getData();

        data.data.descriptionHTML = await TextEditor.enrichHTML(
            this.object.system.description,
            {async: true}
        );

        data.data.numAppearingHTML = await TextEditor.enrichHTML(
            this.object.system.numAppearing,
            {async: true}
        );

        data.data.hitDiceHTML = await TextEditor.enrichHTML(
            this.object.system.hitDice,
            {async: true}
        );

        data.data.toHitHTML = await TextEditor.enrichHTML(
            this.object.system.toHit,
            {async: true}
        );

        data.data.numAttacksHTML = await TextEditor.enrichHTML(
            this.object.system.numAttacks,
            {async: true}
        );

        data.data.damageHTML = await TextEditor.enrichHTML(
            this.object.system.damage,
            {async: true}
        );

        data.data.magicResistHTML = await TextEditor.enrichHTML(
            this.object.system.magicResist,
            {async: true}
        );

        data.data.moraleHTML = await TextEditor.enrichHTML(
            this.object.system.morale,
            {async: true}
        );

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.npc-lock').click(this._lockToggle.bind(this));

        html.find('.npc-stats-control').click(() => {
            const stats = html.find('.npc-stats'),
                icon = html.find('.npc-stats-control i.fas');
            stats.toggleClass('npc-stats-hidden');
            if (stats.hasClass('npc-stats-hidden'))
                icon.addClass('fa-caret-up').removeClass('fa-caret-down');
            else icon.addClass('fa-caret-down').removeClass('fa-caret-up');
        });
    }

    _lockToggle() {
        this.actor.update({system: {locked: !this.actor.system.locked}});
    }
}
