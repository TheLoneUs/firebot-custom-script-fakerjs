import { Firebot, ScriptModules } from '@crowbartools/firebot-custom-scripts-types';
import { autoload } from './autoload';
import { EventSource } from '@crowbartools/firebot-custom-scripts-types/types/modules/event-manager';

interface Params { }

const script: Firebot.CustomScript<Params> = {
	getScriptManifest: () => {
		return {
			name: 'FakerJS by MattachineGG on Twitch',
			description: 'Custom script for generating fake data.',
			author: 'MattachineGG',
			version: '0.1.0',
			firebotVersion: '5'
		};
	},
	getDefaultParameters: () => {
		return {};
	},
	run: async runRequest => {
		const eventSource: EventSource = {
			id: 'fakerjs',
			name: 'Fake Data',
			events: []
		};
		autoload(runRequest.modules, eventSource);
	}
};

export let modules: ScriptModules;
export default script;
