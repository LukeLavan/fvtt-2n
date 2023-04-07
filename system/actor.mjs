import {playerCharacterPrepareDerivedData} from './utils/playerCharacterPrepareDerivedData.mjs';

export class TwoNActor extends Actor {
    prepareDerivedData() {
        switch (this.type) {
            case 'pc':
                return playerCharacterPrepareDerivedData(this);
            case 'npc':
                return;
        }
    }
}
