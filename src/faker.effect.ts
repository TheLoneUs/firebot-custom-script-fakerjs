import { Effects } from '@crowbartools/firebot-custom-scripts-types/types/effects';
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
	optionsTemplate: `
	<eos-container header="Faker Module" pad-top="true">
		<div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="faker-effect-type">{{effect.module.name ? effect.module.name : 'Pick one'}}</span> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu faker-effect-dropdown">
                <li ng-repeat="module in faker_modules"
                    ng-click="effect.module.name = module.name">
                    <a href>{{module.name}}</a>
                </li>
            </ul>
        </div>
		<a href="https://fakerjs.dev/api/{{effect.module.name ? effect.module.name : ''}}" target="_blank"><i class="fad fa-book-open"></i> Documentation</a>
	</eos-container>
	`,
	optionsController: ($scope) => {
		const known_modules = [
			"airline",
			"animal",
			"book",
			"color",
			"commerce",
			"company",
			"database",
			"datatype",
			"date",
			"finance",
			"food",
			"git",
			"hacker",
			"helpers",
			"image",
			"internet",
			"location",
			"lorem",
			"music",
			"number",
			"person",
			"phone",
			"science",
			"string",
			"system",
			"vehicle",
			"word"
		];

		$scope.faker_modules = known_modules.map((value) => (
				{
					name: value,
					description: `Generate fake ${value} data.`
				}
			)
		);
	},
	onTriggerEvent: async scope => {
		const effect = scope.effect;
		const module = effect.module;
	}
};

export default effect;
