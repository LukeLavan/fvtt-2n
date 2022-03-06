export class TwoDotNealActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['twodotneal', 'sheet', 'actor'],
            template: 'systems/fvtt-2neal/templates/actor-sheet.html',
            width: 900,
            height: 700,
            tabs: [
                {
                    navSelector: '.sheet-tabs',
                    contentSelector: '.sheet-body',
                    initial: 'basic',
                },
            ],
        });
    }

    getData() {
        const context = super.getData();
        const actorData = context.actor.data;
        switch (actorData.type) {
            case 'pc':
                this._preparePCData(context);
                break;
        }
        context.rollData = context.actor.getRollData();
        return context;
    }

    _preparePCData(context) {
        context.alignmentChoices = {
            '(choose one)': '(choose one)',
            'Lawful Good': 'Lawful Good',
            'Lawful Neutral': 'Lawful Neutral',
            'Lawful Evil': 'Lawful Evil',
            'Neutral Good': 'Neutral Good',
            'Neutral Neutral': 'Neutral Neutral',
            'Neutral Evil': 'Neutral Evil',
            'Chaotic Good': 'Chaotic Good',
            'Chaotic Neutral': 'Chaotic Neutral',
            'Chaotic Evil': 'Chaotic Evil',
        };

        context.hitDieChoices = {
            d4: 'd4',
            d6: 'd6',
            d8: 'd8',
            d10: 'd10',
            d12: 'd12',
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.rollable').click(this._rollRollable.bind(this));

        html.find('.item-create').click(this._itemCreate.bind(this));

        html.find('.item-edit').change((ev) => {
            const currentTarget = $(ev.currentTarget);
            const id = currentTarget.parents('.item').attr('data-item-id');
            const target = currentTarget.attr('data-target');
            let value = currentTarget.val();
            // blank name marks item for deletion
            if (currentTarget.attr('data-name') && value === '') {
                return this.actor.deleteEmbeddedDocuments('Item', [id]);
            }
            // ensure checkbox values are booleans
            if (currentTarget.attr('type') === 'checkbox') {
                if (currentTarget.is(':checked')) value = true;
                else value = false;
            }
            let itemDifferential = {_id: id};
            itemDifferential[target] = value;
            this.actor.updateEmbeddedDocuments('Item', [itemDifferential]);
        });

        html.find('.item-lock').click((ev) => {
            const currentTarget = $(ev.currentTarget);
            const id = currentTarget.parents('.item').attr('data-item-id');
            const target = currentTarget.attr('data-target');
            let value = currentTarget.data('value');

            // toggle
            value = !value;

            let itemDifferential = {_id: id};
            itemDifferential[target] = value;
            this.actor.updateEmbeddedDocuments('Item', [itemDifferential]);
        });

        html.find('.item-delete').click((ev) => {
            const currentTarget = $(ev.currentTarget);
            const id = currentTarget.parents('.item').attr('data-item-id');
            const locked = currentTarget.data('locked');
            if (locked) return;
            this.actor.deleteEmbeddedDocuments('Item', [id]);
        });
    }

    //TODO: better success/failure roll
    _rollRollable(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        if (dataset.roll) {
            let roll = new Roll(dataset.roll, this.actor.data.data);
            let label = dataset.label ? `Rolling ${dataset.label}` : '';
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({actor: this.actor}),
                flavor: label,
            });
        }
    }

    async _itemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const type = header.dataset.type;
        const data = duplicate(header.dataset);
        const itemName = type.capitalize();
        const itemData = {
            name: itemName,
            type: type,
            data: data,
        };
        const item = await Item.create(itemData, {parent: this.actor});
        const focusbox = document.getElementById(item.id + '.source');
        focusbox.focus();
        focusbox.select();
        console.log(item);
        return item;
    }
}
