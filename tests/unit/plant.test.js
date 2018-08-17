const Plant = require('../../lib/models/plant');
require('chai');

describe('plant model', () => {

    it('validates with required fields', () => {
        const tomato = new Plant({
            name: 'tomato',
            spread: 8,
            img: 'https://bonnieplants.com/wp-content/uploads/landing-pages/tomatoes/9-ways-to-grow-tomatoes-on-vine-feature.jpg'
        });
        return tomato.validate();
    });
});