export class TwoNItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['TwoN', 'sheet', 'item'],
            width: 520,
            height: 480,
        });
    }

    get template() {
        return `systems/fvtt-2n/templates/sheets/${this.item.type}-sheet.html`;
    }

    async getData(options) {
        const data = await super.getData(options);

        // TODO: move to child class
        data.enrichedHTML = await TextEditor.enrichHTML(
            this.object.system.description,
            {async: true}
        );

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.item-chat').click(this._toChat.bind(this, []));
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
        const templatePath = `systems/fvtt-2n/templates/chats/items/${this.item.type}.html`;
        const html = await renderTemplate(templatePath, this.item);

        return ChatMessage.create({
            flavor: `<h3>${this.item.name} (${this.item.type})</h3>`,
            content: html,
            'flags.fvtt-2n.itemSheet': true,
        });
    }
}
