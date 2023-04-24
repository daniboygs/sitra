const fs = require('browserify-fs');

module.exports = async function trainnlp(manager, requests) {
    /*if (fs.existsSync('./model.nlp')) {
      manager.load('./model.nlp');
      return;
    }
    manager.load('./model.nlp');*/
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    console.log(requests);

    let catCrime = '';
    let sinonims = [];
    const crimes = {
      crime: "",
      sinonims: []
    };

    requests.sinonims.forEach(crime => {
        if(crime.Grupo != catCrime && catCrime != ''){
          manager.addNamedEntityText(
            'delito',
            catCrime,
            ['es'],
            sinonims,
          );
          sinonims=[];
        }
        else{
          sinonims.push(crime.Sinonimo);
        }
        catCrime = crime.Grupo;
      }
    );
    
    /*requests.crimes.forEach(crime => {
        manager.addNamedEntityText(
          'delito',
          crime.Grupo,
          ['es'],
          crime.Grupo,
        );
        //console.log(crime.CatModalidadesEstadisticasID+".-"+crime.Grupo);
      }
    );*/

    requests.fiscalias.forEach(fiscalia => {
        manager.addNamedEntityText(
          'fiscalia',
          fiscalia.Nombre,
          ['es'],
          fiscalia.Nombre,
        );
      }
    );

    requests.cities.forEach(city => {
        manager.addNamedEntityText(
          'municipio',
          city.Nombre,
          ['es'],
          city.Nombre,
        );
      }
    );

    requests.status.forEach(s => {
        manager.addNamedEntityText(
          'estatus',
          s.Nombre,
          ['es'],
          s.Nombre,
        );
      }
    );

    requests.weapons.forEach(weapon => {
        manager.addNamedEntityText(
          'arma',
          weapon.Nombre,
          ['es'],
          weapon.Nombre,
        );
      }
    );

    requests.professions.forEach(profession => {
        manager.addNamedEntityText(
          'profesion',
          profession.Nombre,
          ['es'],
          profession.Nombre,
        );
      }
    );

    requests.nationalities.forEach(nationality => {
        manager.addNamedEntityText(
          'nacionalidad',
          nationality.Nombre,
          ['es'],
          nationality.Nombre,
        );
      }
    );

    requests.scholarships.forEach(scholarship => {
        manager.addNamedEntityText(
          'escolaridad',
          scholarship.Nombre,
          ['es'],
          scholarship.Nombre,
        );
      }
    );

    requests.relationships.forEach(relationship => {
        manager.addNamedEntityText(
          'parentesco',
          relationship.Nombre,
          ['es'],
          relationship.Nombre,
        );
      }
    );

    requests.years.forEach(year => {
        manager.addNamedEntityText(
          'año_true',
          year.anio,
          ['es'],
          year.anio,
        );
      }
    );

    manager.addNamedEntityText(
      'año_false',
      'year.false',
      ['es'],
      ["2000"],
    );

    manager.addNamedEntityText('sexo','masculino',['es'],['masculino', 'no reconocido', 'no identificado']);
    manager.addNamedEntityText('sexo','femenino',['es'],['femenino', 'femina', 'mujer', 'mujeres']);
    manager.addNamedEntityText('sexo','moral',['es'],['moral', 'empresa', 'empresas']);
    manager.addNamedEntityText('sexo','desconocido',['es'],['desconocido', 'no reconocido', 'no identificado']);

    manager.addNamedEntityText('r','robo',['es'],['robo','hurto','falso testimonio']);

    
    manager.addNamedEntityText('peticion','peticion',['es'],['quiero', 'quisiera', 'dame', 'enseñame', 'exijo', 'solicito', 'reclamo', 'muestrame', 'quiero saber', 'quisiera saber', 'exijo saber', 'solicito saber', 'reclamo saber', 'quiero conocer', 'quisiera conocer', 'exijo conocer', 'solicito conocer', 'reclamo conocer', 'solicito',  'puedes mostrar',  'puedes dar', 'puedes enseñar', 'quiero que des', 'quiero que muestres', 'quiero que enseñes', 'solicito que des', 'solicito que muestres', 'solicito que enseñes', 'exijo que des', 'exijo que muestres', 'exijo que enseñes', 'puedes darme', 'puedes enseñarme', 'puedes mostrarme']);


    /*manager.addNamedEntityText(
      'delito',
      'homicidio',
      ['es'],
      ['homicidio', 'Homicidio doloso', 'Homicidio culposo'],
    );*/

    //manager.addDocument('es', 'quiero %delito%', 'greetings.showDelito');

    manager.addDocument('es', 'quiero %delito% de la fiscalia de %fiscalia% de la ciudad de %city%', 'greetings.showPetition');


    manager.addDocument(
      'es',
      '%r%',
      'r.test',
    );
    

    manager.addDocument(
      'es',
      'he visto a %hero%',
      'greetings.sawhero',
    );
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    manager.addDocument('es', 'hola', 'greetings.hello');
    manager.addDocument('es', 'holi', 'greetings.hello');
    manager.addDocument('es', 'hola robot', 'greetings.hello');
    manager.addDocument('es', 'hello', 'greetings.hello');
    manager.addDocument('es', 'hola amigo', 'greetings.hello');
    manager.addDocument('es', 'hola amigito', 'greetings.hello');
    manager.addDocument('es', 'hi', 'greetings.hello');

    
    manager.addDocument('es', 'adios', 'farewell.bye');
    manager.addDocument('es', 'adios cuidate', 'farewell.bye');
    manager.addDocument('es', 'nos vemos', 'farewellbyes');
    manager.addDocument('es', 'hasta la proxima', 'farewell.bye');
    manager.addDocument('es', 'debo irme', 'farewell.bye');
    manager.addDocument('es', 'me ire', 'farewell.bye');
    manager.addDocument('es', 'hasta luego', 'farewell.bye');
    manager.addDocument('es', 'ya me voy', 'farewell.bye');
    manager.addDocument('es', 'me voy', 'farewell.bye');
    manager.addDocument('es', 'nos vemos despues', 'farewell.bye');
    manager.addDocument('es', 'hasta la proxima', 'farewell.bye');
    manager.addDocument('es', 'bye', 'farewell.bye');
    manager.addDocument('es', 'bye bye', 'farewell.bye');
    
  
    manager.addDocument('es', 'que edad tienes', 'conversational.age');
    manager.addDocument('es', 'cuantos años tienes', 'conversational.age');
    manager.addDocument('es', 'tu edad', 'conversational.age');
    manager.addDocument('es', 'tus años', 'conversational.age');


    manager.addDocument('es', 'como estas', 'conversational.mood');
    manager.addDocument('es', 'como te encuentras', 'conversational.mood');
    manager.addDocument('es', 'como te encuentras hoy', 'conversational.mood');
    manager.addDocument('es', 'como te encuentras el dia de hoy', 'conversational.mood');


    manager.addDocument('es', 'hola como estas', 'conversational.holaestado');


    manager.addDocument('es', 'gracias', 'conversational.thanks');
    manager.addDocument('es', 'muchas gracias', 'conversational.thanks');
    manager.addDocument('es', 'te lo agradezco', 'conversational.thanks');
    manager.addDocument('es', 'te lo agradezco mucho', 'conversational.thanks');
    manager.addDocument('es', 'mil gracias', 'conversational.thanks');
    manager.addDocument('es', 'te lo agradezco muchisimo', 'conversational.thanks');
    manager.addDocument('es', 'me has ayudado', 'conversational.thanks');
    manager.addDocument('es', 'me has ayudado mucho', 'conversational.thanks');
    manager.addDocument('es', 'me has ayudado muchisimo', 'conversational.thanks');


    manager.addDocument('es', 'quiero saber los delito.true de año.true', 'greetings.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true del año año.true', 'greetings.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de año.true y año.true', 'greetings.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de los años año.true y año.true', 'greetings.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de los años años.true', 'greetings.peticionDelitoAño');



    manager.addDocument('es', 'quiero saber los delito.true de año.true', 'petition.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true del año año.true', 'petition.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de año.true y año.true', 'petition.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de los años año.true y año.true', 'petition.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de los años años.true', 'petition.peticionDelitoAño');



    manager.addDocument('es', 'quiero saber delito.true de año.true', 'petition.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true del año año.true', 'petition.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de año.true y año.true', 'petition.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de los años año.true y año.true', 'petition.peticionDelitoAño');
    manager.addDocument('es', 'quiero saber los delito.true de los años años.true', 'petition.peticionDelitoAño');
    

    manager.addDocument('es', '%peticion% %delito%', 'petition.crime');
    manager.addDocument('es', '%delito% %peticion%', 'petition.crime');
    manager.addDocument('es', '%delito%', 'petition.crime');


    manager.addDocument('es', '%peticion% %delito% %año_true%', 'petition.crime_year');
    manager.addDocument('es', '%peticion% %año_true% %delito%', 'petition.crime_year');
    manager.addDocument('es', '%año_true% %delito% %peticion%', 'petition.crime_year');
    manager.addDocument('es', '%delito% %año_true% %peticion%', 'petition.crime_year');
    manager.addDocument('es', '%delito% %año_true%', 'petition.crime_year');
    manager.addDocument('es', '%año_true% %delito%', 'petition.crime_year');

    
    manager.addDocument('es', '%peticion% %delito% %año_true% %año_true%', 'petition.crime_years_period');
    manager.addDocument('es', '%peticion% %año_true% %delito% %año_true%', 'petition.crime_years_period');
    manager.addDocument('es', '%año_true% %delito% %peticion% %año_true%', 'petition.crime_years_period');
    manager.addDocument('es', '%delito% %año_true% %peticion% %año_true%', 'petition.crime_years_period');
    manager.addDocument('es', '%delito% %año_true% %año_true%', 'petition.crime_years_period');
    manager.addDocument('es', '%año_true% %año_true% %delito%', 'petition.crime_years_period');


    manager.addDocument('es', '%peticion% %delito% %año_true% y %año_true%', 'petition.crime_year_&_year');
    manager.addDocument('es', '%peticion% %año_true% %delito% y %año_true%', 'petition.crime_year_&_year');
    manager.addDocument('es', '%año_true% %delito% %peticion% y %año_true%', 'petition.crime_year_&_year');
    manager.addDocument('es', '%delito% %año_true% %peticion% y %año_true%', 'petition.crime_year_&_year');
    manager.addDocument('es', '%delito% %año_true% y %año_true%', 'petition.crime_year_&_year');
    manager.addDocument('es', '%año_true% y %año_true% %delito%', 'petition.crime_year_&_year');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log('Training, please wait..');
    //const hrstart = process.hrtime();
    //await manager.train();
    //const hrend = process.hrtime(hrstart);
    //console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    console.log('Trained!');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    manager.addAnswer('es', 'r.test', 'la peticion de : {{r}}');

    manager.addAnswer('es', 'petition.crime', 'C/{{delito}}'); //crime

    manager.addAnswer('es', 'petition.crime_year', 'CY/{{delito}}/{{año_true}}'); //crime year

    manager.addAnswer('es', 'petition.crime_years_period', 'CPY/{{delito}}/{{año_true}}/{{año_true}}'); //crime years period

    manager.addAnswer('es', 'petition.crime_year_&_year', 'CYY/{{delito}}/{{año_true}}/{{año_true}}'); //crime year & year

    manager.addAnswer('es', 'greetings.hello', 'Hola');
    manager.addAnswer('es', 'greetings.hello', 'Que tal');
    manager.addAnswer('es', 'greetings.hello', 'Que hay');


    manager.addAnswer('es', 'farewell.bye', 'Hasta la proxima');
    manager.addAnswer('es', 'farewell.bye', 'Nos vemos');


    manager.addAnswer('es', 'conversational.age', 'Me crearon en 2019');
    manager.addAnswer('es', 'conversational.age', 'Fui creado en 2019');


    manager.addAnswer('es', 'conversational.mood', 'Me siento muy bien gracias');
    manager.addAnswer('es', 'conversational.mood', 'Me siento de maravilla');
    manager.addAnswer('es', 'conversational.mood', 'Me siento genial');


    manager.addAnswer('es', 'conversational.thanks', 'No hay de que');
    manager.addAnswer('es', 'conversational.thanks', 'De nada');
    manager.addAnswer('es', 'conversational.thanks', 'Es un placer');
    manager.addAnswer('es', 'conversational.thanks', 'Estoy para servirte');



    manager.addAnswer('es', 'conversational.holaestado', 'Hola, Soy un bot, no puedo sentir pero gracias por preguntar');


    manager.addAnswer('es', 'greetings.peticionDelitoAño', 'peticion delito/año');
    

    //manager.addAnswer('es', 'greetings.showDelito', 'delito: {{delito}}');

    manager.addAnswer('es', 'greetings.showPetition', 'delito: {{delito}}, fiscalia: {{fiscalia}}, city: {{city}}');

    manager.addAnswer('es', 'greetings.sawhero', 'hero: {{hero}}');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //manager.save('./model.nlp', true);
  };