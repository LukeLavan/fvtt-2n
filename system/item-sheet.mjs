export class TwoNItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['TwoN', 'sheet', 'item'],
            width: 520,
            height: 480,
            tabs: [],
        });
    }

    get template() {
        return `systems/fvtt-2n/templates/${this.item.type}-sheet.html`;
    }

    async getData(options) {
        const data = await super.getData(options);
        data.enrichedHTML = await TextEditor.enrichHTML(
            this.object.system.description,
            {async: true}
        );
        return data;
    }
}
