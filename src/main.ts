import { Firebot, ScriptModules } from '@crowbartools/firebot-custom-scripts-types';
import { autoload } from './autoload';
import { EventSource } from '@crowbartools/firebot-custom-scripts-types/types/modules/event-manager';

interface Params { }

const script: Firebot.CustomScript<Params> = {
	getScriptManifest: () => {
		return {
			name: 'MattachineGG\'s Faker',
			description: 'A custom script for generating fake data.',
			author: 'MattachineGG',
			version: '1.0.0',
			firebotVersion: '5'
		};
	},
	getDefaultParameters: () => ({}),
	run: async runRequest => {
		const eventSource: EventSource = {
			id: 'faker',
			name: 'Fake Data',
			events: []
		};
		autoload(runRequest.modules, eventSource);
	}
};

export let modules: ScriptModules;
export default script;
