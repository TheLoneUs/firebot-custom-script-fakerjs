import { Effects } from '@crowbartools/firebot-custom-scripts-types/types/effects';
import EffectType = Effects.EffectType;
import { faker } from '@faker-js/faker';

interface EffectModel {
	module_parent: string,
	module: string,
	options: string
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
	<eos-container header="Select a Faker Module & Method" pad-top="true">
		<div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="faker-effect-type">{{effect.module_parent ? effect.module_parent : 'Pick one'}}</span> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu faker-effect-dropdown">
                <li ng-repeat="module_parent in faker_module_parents"
                    ng-click="effect.module_parent = module_parent.name; effect.module = null">
                    <a href>{{module_parent.name}}</a>
                </li>
            </ul>
        </div>
		<div class="btn-group" ng-show="effect.module_parent">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="faker-effect-type">{{effect.module ? effect.module : 'Pick one'}}</span> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu faker-effect-dropdown">
                <li ng-repeat="module in faker_modules | filter: {name: effect.module_parent + '.'}"
                    ng-click="effect.module = module.name">
                    <a href>{{module.name}}</a>
                </li>
            </ul>
        </div>
		<a href="https://v9.fakerjs.dev/api/{{effect.module ? effect.module.split('.').join('#').toLowerCase() : ''}}" target="_blank"><i class="fad fa-book-open"></i> Documentation</a>
	</eos-container>
	<eos-container header="Options" pad-top="true">
		<firebot-input
			model="effect.options"
			use-text-area="true"
			placeholder-text="(Optional)
See FakerJS documentation linked above for request options.
Faker will typically return a single string when no options are supplied."
			rows="10"
			cols="40">
		</firebot-input>
	</eos-container>
	`,
	optionsController: ($scope) => {
		// TODO: It would be nice to get this dynamically, if possible, including the methods parameters.
		// https://https://v9.fakerjs.dev/api/
		const known_modules = {
			"airline": {
				"aircraftType": {},
				"airline": {},
				"airplane": {},
				"airport": {},
				"flightNumber": {},
				"recordLocator": {},
				"seat": {},
			},
			"animal": {
				"bear": {},
				"bird": {},
				"cat": {},
				"cetacean": {},
				"cow": {},
				"crocodilia": {},
				"dog": {},
				"fish": {},
				"horse": {},
				"insect": {},
				"lion": {},
				"petName": {},
				"rabbit": {},
				"rodent": {},
				"snake": {},
				"type": {},
			},
			"book": {
				"author": {},
				"format": {},
				"genre": {},
				"publisher": {},
				"series": {},
				"title": {},
			},
			"color": {
				"cmyk": {},
				"colorByCSSColorSpace": {},
				"cssSupportedFunction": {},
				"cssSupportedSpace": {},
				"hsl": {},
				"human": {},
				"hwb": {},
				"lab": {},
				"lch": {},
				"rgb": {},
				"space": {},
			},
			"commerce": {
				"department": {},
				"isbn": {},
				"price": {},
				"product": {},
				"productAdjective": {},
				"productDescription": {},
				"productMaterial": {},
				"productName": {},
			},
			"company": {
				"buzzAdjective": {},
				"buzzNoun": {},
				"buzzPhrase": {},
				"buzzVerb": {},
				"catchPhrase": {},
				"catchPhraseAdjective": {},
				"catchPhraseDescriptor": {},
				"catchPhraseNoun": {},
				"name": {},
			},
			"database": {
				"collation": {},
				"column": {},
				"engine": {},
				"mongodbObjectId": {},
				"type": {},
			},
			"datatype": {
				"boolean": {}
			},
			"date": {
				"anytime": {},
				"between": {},
				"betweens": {},
				"birthdate": {},
				"future": {},
				"month": {},
				"past": {},
				"recent": {},
				"soon": {},
				"timeZone": {},
				"weekday": {},
			},
			"finance": {
				"accountName": {},
				"accountNumber": {},
				"amount": {},
				"bic": {},
				"bitcoinAddress": {},
				"creditCardCVV": {},
				"creditCardIssuer": {},
				"creditCardNumber": {},
				"currency": {},
				"currencyCode": {},
				"currencyName": {},
				"currencySymbol": {},
				"ethereumAddress": {},
				"iban": {},
				"litecoinAddress": {},
				"pin": {},
				"routingNumber": {},
				"transactionDescription": {},
				"transactionType": {},
			},
			"food": {
				"adjective": {},
				"description": {},
				"dish": {},
				"ethnicCategory": {},
				"fruit": {},
				"ingredient": {},
				"meat": {},
				"spice": {},
				"vegetable": {},
			},
			"git": {
				"branch": {},
				"commitDate": {},
				"commitEntry": {},
				"commitMessage": {},
				"commitSha": {},
			},
			"hacker": {
				"abbreviation": {},
				"adjective": {},
				"ingverb": {},
				"noun": {},
				"phrase": {},
				"verb": {},
			},
			"image": {
				"avatar": {},
				"avatarGitHub": {},
				"dataUri": {},
				"personPortrait": {},
				"url": {},
				"urlLoremFlickr": {},
				"urlPicsumPhotos": {},
			},
			"internet": {
				"color": {},
				"displayName": {},
				"domainName": {},
				"domainSuffix": {},
				"domainWord": {},
				"email": {},
				"emoji": {},
				"exampleEmail": {},
				"httpMethod": {},
				"httpStatusCode": {},
				"ip": {},
				"ipv4": {},
				"ipv6": {},
				"jwt": {},
				"jwtAlgorithm": {},
				"mac": {},
				"password": {},
				"port": {},
				"protocol": {},
				"url": {},
				"userAgent": {},
				"username": {},
			},
			"location": {
				"buildingNumber": {},
				"cardinalDirection": {},
				"city": {},
				"continent": {},
				"country": {},
				"countryCode": {},
				"county": {},
				"direction": {},
				"language": {},
				"latitude": {},
				"longitude": {},
				"nearbyGPSCoordinate": {},
				"ordinalDirection": {},
				"secondaryAddress": {},
				"state": {},
				"street": {},
				"streetAddress": {},
				"timeZone": {},
				"zipCode": {},
			},
			"lorem": {
				"lines": {},
				"paragraph": {},
				"paragraphs": {},
				"sentence": {},
				"sentences": {},
				"slug": {},
				"text": {},
				"word": {},
				"words": {},
			},
			"music": {
				"album": {},
				"artist": {},
				"genre": {},
				"songName": {},
			},
			"number": {
				"bigInt": {},
				"binary": {},
				"float": {},
				"hex": {},
				"int": {},
				"octal": {},
				"romanNumeral": {},
			},
			"person": {
				"bio": {},
				"firstName": {},
				"fullName": {},
				"gender": {},
				"jobArea": {},
				"jobDescriptor": {},
				"jobTitle": {},
				"jobType": {},
				"lastName": {},
				"middleName": {},
				"prefix": {},
				"sex": {},
				"sexType": {},
				"suffix": {},
				"zodiacSign": {},
			},
			"phone": {
				"imei": {},
				"number": {},
			},
			"science": {
				"chemicalElement": {},
				"unit": {},
			},
			"string": {
				"alpha": {},
				"alphanumeric": {},
				"binary": {},
				"fromCharacters": {},
				"hexadecimal": {},
				"nanoid": {},
				"numeric": {},
				"octal": {},
				"sample": {},
				"symbol": {},
				"ulid": {},
				"uuid": {},
			},
			"system": {
				"commonFileExt": {},
				"commonFileName": {},
				"commonFileType": {},
				"cron": {},
				"directoryPath": {},
				"fileExt": {},
				"fileName": {},
				"filePath": {},
				"fileType": {},
				"mimeType": {},
				"networkInterface": {},
				"semver": {},
			},
			"vehicle": {
				"bicycle": {},
				"color": {},
				"fuel": {},
				"manufacturer": {},
				"model": {},
				"type": {},
				"vehicle": {},
				"vin": {},
				"vrm": {},
			},
			"word": {
				"adjective": {},
				"adverb": {},
				"conjunction": {},
				"interjection": {},
				"noun": {},
				"preposition": {},
				"sample": {},
				"verb": {},
				"words": {},
			}
		};

		$scope.faker_module_parents = Object.keys(known_modules).map(name => ({ name }));
		$scope.faker_modules = Object.entries(known_modules).flatMap(([module_name, methods]) =>
			Object.keys(methods).map(method => ({ name: `${module_name}.${method}` }))
		);
	},
	optionsValidator: effect => {
		const errors: string[] = [];

		if (!effect.module?.length) {
			errors.push('Please select a module.');
		}

		if (effect.options?.length) {
			try {
				// Attempt to parse options if it's a string
				if (typeof effect.options === 'string' && effect.options.trim() !== '') {
					JSON.parse(effect.options);
				}
			} catch (error) {
				errors.push('Invalid options format. Please provide a valid JSON object or array.');
			}
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
			let options = scope.effect.options;
			let fakerData: any = null;

			if (typeof options === 'string' && options.trim() !== '') {
				options = JSON.parse(options);
				fakerData = result(options);
			} else {
				fakerData = result();
			}

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
