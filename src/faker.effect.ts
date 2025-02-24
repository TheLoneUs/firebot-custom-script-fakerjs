import { Effects } from '@crowbartools/firebot-custom-scripts-types/types/effects';
import template from './faker.html';
import EffectType = Effects.EffectType;

interface EffectModel {
	module: string,
	description: string
}

const effect: EffectType<EffectModel> = {
	definition: {
		id: 'mattachinegg:fakerjs:data',
		name: 'Faker',
		description: 'Get fake data.',
		icon: 'fad fa-mask',
		categories: [
			'fun',
			'integrations'
		],
		outputs: [{
			label: 'Fake Data',
			description: 'The faked data.',
			defaultName: 'fakerData'
		}]
	},
	optionsTemplate: template,
	optionsController: ($scope, backendCommunicator: any, $q: any) => {
		const faker_modules = backendCommunicator.fireEventSync('get-faker-modules');
		$scope.faker_modules = faker_modules;

		if ($scope.effect.module == null) {
			$scope.effect.module = faker_modules[0];
		}
	},
	onTriggerEvent: async scope => {
		const effect = scope.effect;
		const module = effect.module;
	}
};

export default effect;
