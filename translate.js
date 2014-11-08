//=========================================================================
//                  // Configurations: START //
//=========================================================================
// Configuring $translateProvider
newMexico.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('english', {
        'LANGUAGE': 'Spanish',
        'HEADLINE': 'Introducing ngTranslate',
        'SUB_HEADLINE': 'Translations for your Angular Apps!',
        'TEXT': 'This works with every translation id combination.',
        'ONE': 'The woman eats an apple.',
        'TWO': 'The horse drinks milk.',
        'THREE': 'Three'
    });

    $translateProvider.translations('spanish', {
        'LANGUAGE': 'English',
        'HEADLINE': 'Introduciendo ngTranslate',
        'SUB_HEADLINE': 'Traducciones de sus Aplicaciones angulares!',
        'TEXT': 'Esto funciona con todas las combinaciones de id traducción.',
        'ONE': 'La mujer come una manzana.',
        'TWO': 'El caballo bebe leche.',
        'THREE': 'Tres'
    });

    $translateProvider.uses('english');
}]);
//=========================================================================
//                  // Configurations: END //
//=========================================================================