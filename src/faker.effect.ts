import { Effects } from '@crowbartools/firebot-custom-scripts-types/types/effects';
import EffectType = Effects.EffectType;

interface EffectModel {
	module: string
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
	optionsTemplate: `
	<eos-container header="Select a FakerJS Module" pad-top="true">
		<div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="faker-effect-type">{{effect.module ? effect.module : 'Pick one'}}</span> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu faker-effect-dropdown">
                <li ng-repeat="module in faker_modules"
                    ng-click="effect.module = module.name">
                    <a href>{{module.name}}</a>
                </li>
            </ul>
        </div>
		<a href="https://fakerjs.dev/api/{{effect.module ? effect.module.split('.').join('#') : ''}}" target="_blank"><i class="fad fa-book-open"></i> Documentation</a>
	</eos-container>
	`,
	optionsController: ($scope) => {
		const known_modules = [
			// "airline",
			// "animal",
			// "book",
			// "color",
			// "commerce",
			// "company",
			// "database",
			// "datatype",
			// "date",
			// "finance",
			// "food",
			// "git",
			// "hacker",
			// "helpers",
			// "image",
			// "internet",
			// "location",
			// "lorem",
			// "music",
			// "number",
			// "person",
			// "phone",
			// "science",
			// "string",
			// "system",
			// "vehicle",
			"word.adjective",
			"word.adverb",
			"word.conjunction",
			"word.interjection",
			"word.noun",
			"word.preposition",
			"word.sample",
			"word.verb",
			"word.words"
		];

		$scope.faker_modules = known_modules.map((value) => ({ name: value }));
	},
	optionsValidator: effect => {
		const errors: string[] = [];

		if (!effect.module?.length) {
			errors.push('Please select a module.');
		}

		return errors;
	},
	onTriggerEvent: async scope => {
		const effect = scope.effect;
		const module = effect.module;
	}
};

export default effect;
