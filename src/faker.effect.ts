import { Effects } from '@crowbartools/firebot-custom-scripts-types/types/effects';
import EffectType = Effects.EffectType;
import { faker } from '@faker-js/faker';

interface EffectModel {
	module: string
}

const effect: EffectType<EffectModel> = {
	definition: {
		id: 'mattachinegg:faker:data',
		name: 'Faker',
		description: 'Get fake data.',
		icon: 'fad fa-mask',
		categories: [
			'fun',
			'integrations'
		],
		outputs: [{
			label: 'Faker Data',
			description: 'The faked data. The faked data can either be a string, or in JSON format depending on the module used.',
			defaultName: 'fakerData'
		}]
	},
	optionsTemplate: `
	<eos-container header="Select a Faker Module" pad-top="true">
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
		// TODO: It would be nice to get this dynamically, if possible, including the methods parameters.
		// https://fakerjs.dev/api/
		const known_modules = [
			"airline.aircraftType",
			"airline.airline",
			"airline.airplane",
			"airline.airport",
			"airline.flightNumber",
			"airline.recordLocator",
			"airline.seat",
			"animal.bear",
			"animal.bird",
			"animal.cat",
			"animal.cetacean",
			"animal.cow",
			"animal.crocodilia",
			"animal.dog",
			"animal.fish",
			"animal.horse",
			"animal.insect",
			"animal.lion",
			"animal.petName",
			"animal.rabbit",
			"animal.rodent",
			"animal.snake",
			"animal.type",
			"book.author",
			"book.format",
			"book.genre",
			"book.publisher",
			"book.series",
			"book.title",
			"color.cmyk",
			"color.colorByCSSColorSpace",
			"color.cssSupportedFunction",
			"color.cssSupportedSpace",
			"color.hsl",
			"color.human",
			"color.hwb",
			"color.lab",
			"color.lch",
			"color.rgb",
			"color.space",
			"commerce.department",
			"commerce.isbn",
			"commerce.price",
			"commerce.product",
			"commerce.productAdjective",
			"commerce.productDescription",
			"commerce.productMaterial",
			"commerce.productName",
			"company.buzzAdjective",
			"company.buzzNoun",
			"company.buzzPhrase",
			"company.buzzVerb",
			"company.catchPhrase",
			"company.catchPhraseAdjective",
			"company.catchPhraseDescriptor",
			"company.catchPhraseNoun",
			"company.name",
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
			"system.commonFileExt",
			"system.commonFileName",
			"system.commonFileType",
			"system.cron",
			"system.directoryPath",
			"system.fileExt",
			"system.fileName",
			"system.filePath",
			"system.fileType",
			"system.mimeType",
			"system.networkInterface",
			"system.semver",
			"vehicle.bicycle",
			"vehicle.color",
			"vehicle.fuel",
			"vehicle.manufacturer",
			"vehicle.model",
			"vehicle.type",
			"vehicle.vehicle",
			"vehicle.vin",
			"vehicle.vrm",
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
		const faker_module: string = scope.effect.module;
		const parts = faker_module.split('.'); // Split the module into property and method parts

		// Use reduce to traverse the faker object dynamically
		let result: any = faker;
		for (let i = 0; i < parts.length; i++) {
			if (result && result[parts[i]] !== undefined) {
				result = result[parts[i]];
			} else {
				// TODO: Handle invalid method case
				return;
			}
		}

		if (typeof result === 'function') {
			const fakerData = result();

			return {
				success: true,
				outputs: {
					fakerData
				}
			};
		} else {
			// TODO: Handle invalid method case
			return;
		}
	}
};

export default effect;
