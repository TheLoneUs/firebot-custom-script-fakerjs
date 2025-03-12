# [MattachineGG](https://allmylinks.com/mattachinegg)\'s Faker - A Custom Firebot Script
A script designed to help you get random data of all sorts in [Firebot](https://firebot.app/)!

The script is in BETA so testers are welcome, feel free to report any issues you may find.

### How to install
1. Download the latest release of [firebot-faker.js](https://github.com/TheLoneUs/firebot-custom-script-fakerjs/releases/latest/download/firebot-faker.js)
2. Open Firebot and head to Settings -> Scripts -> Manage Startup Scripts.
3. Enable custom scripts if they aren't already.
3. Click `Add New Script`.
4. Click on the `scripts folder` link and place `firebot-faker.js` in the directory.
5. Click the reload icon next to the `Pick one` dropdown to refresh available scripts.
6. Select `firebot-faker.js` in the dropdown.
7. Click `Save`!
    - You may also need to restart Firebot if the script doesn't seem to work.

### Quick Start
1. Add a `Faker` event and select which module you would like to use.
2. Use the output `$effectOutput[fakerData]` from the command however you'd like!
    - Data may be returned as a simple string or a JSON object depending on the module.
      See [FakerJS API Reference](https://v9.fakerjs.dev/api/) for specific information.

### Roadmap
1. Add ability to pass options into the faker library.
    - Allows things like min/max length or word count.
2. General project cleanup.
