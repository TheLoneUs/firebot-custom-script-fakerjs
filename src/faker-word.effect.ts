import { Effects } from '@crowbartools/firebot-custom-scripts-types/types/effects';
import template from './faker-word.html';
import { modules } from './main';
import { faker } from '@faker-js/faker';
import EffectType = Effects.EffectType;

interface EffectModel {
	method: string,
	description: string
}

const effect: EffectType<EffectModel> = {
	definition: {
		id: 'mattachinegg:fakerjs:words',
		name: 'Fake Words',
		description: 'Get random word(s).',
		icon: 'fad fa-microphone-alt',
		categories: [
			'fun',
			'integrations'
		],
		outputs: [{
			label: 'Word(s)',
			description: 'The random word(s).',
			defaultName: 'randomWords'
		}]
	},
	optionsTemplate: template,
	optionsController: ($scope, backendCommunicator: any, $q: any) => {
		const faker_methods = backendCommunicator.fireEventSync('words-get-methods');
		$scope.faker_methods = faker_methods;

		if ($scope.effect.method == null) {
			$scope.effect.method = faker_methods[0];
		}
	},
	onTriggerEvent: async scope => {
		const effect = scope.effect;
		const method = effect.method;

		modules.logger.error(`Faker module: words, method: ${method}: ${faker.word.words()}`);
	}
};

export default effect;
