import { Firebot, ScriptModules } from '@crowbartools/firebot-custom-scripts-types';
import { autoload } from './autoload';
import { faker } from '@faker-js/faker';
import { EventSource } from '@crowbartools/firebot-custom-scripts-types/types/modules/event-manager';

interface Params {}

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
		modules = runRequest.modules;

		modules.frontendCommunicator.on('get-faker-modules', () => {
			return Object.keys(faker.definitions).map((key) => (
					{
						name: key,
						description: `Generate fake ${key} data.`
					}
				)
			);
		});
	}
};

export let modules: ScriptModules;
export default script;
