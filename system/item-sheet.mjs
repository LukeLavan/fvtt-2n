export class TwoDotNealItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['twodotneal', 'sheet', 'item'],
            width: 520,
            height: 480,
            tabs: [],
        });
    }

    get template() {
        return `systems/fvtt-2neal/templates/${this.item.data.type}-sheet.html`;
    }
}
