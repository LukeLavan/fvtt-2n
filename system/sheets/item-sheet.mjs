export class TwoNItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['TwoN', 'sheet', 'item'],
            width: 520,
            height: 480,
        });
    }

    get template() {
        return `systems/fvtt-2n/templates/sheets/items/${this.item.type}-sheet.html`;
    }

    async getData(options) {
        const data = await super.getData(options);

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.item-lock').click(this._lockToggle.bind(this));
        html.find('.item-chat').click(this._toChat.bind(this));
    }

    /**
     * Toggles the 'locked' property of `this.item`.
     */
    _lockToggle() {
        this.item.update({system: {locked: !this.item.system.locked}});
    }

    /**
     * Sends `this.item` to chat:
     *
     * Renders item-specific chat template located at
     * `"templates/chats/items/${this.item.type}.html"`
     * via `renderTemplate`.
     *
     * Passes `this.item` as context to the `renderTemplate` call.
     *
     * Finally, creates chat message via `ChatMessage.create`
     * with `<h3>${this.item.name}</h3>` as flavor
     * and rendered template as content.
     */
    async _toChat() {
        const templatePath = `systems/fvtt-2n/templates/chats/item-sheet-link.html`;
        const html = await renderTemplate(templatePath, this.item);

        return ChatMessage.create({
            flavor: `<h3>${this.item.name} (${this.item.type})</h3>`,
            content: html,
            'flags.fvtt-2n.itemSheet': true,
        });
    }
}
