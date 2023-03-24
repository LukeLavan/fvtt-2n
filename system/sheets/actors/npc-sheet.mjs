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

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.npc-lock').click(this._lockToggle.bind(this));
    }

    _lockToggle() {
        this.actor.update({system: {locked: !this.actor.system.locked}});
    }
}
