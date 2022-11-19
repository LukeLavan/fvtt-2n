import {TwoNItemSheet} from '../item-sheet.mjs';

export class TwoNWeaponSheet extends TwoNItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 320,
            height: 480,
        });
    }

    async getData() {
        const data = await super.getData();

        data.data.descriptionHTML = await TextEditor.enrichHTML(
            this.object.system.description,
            {async: true}
        );

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
    }
}
