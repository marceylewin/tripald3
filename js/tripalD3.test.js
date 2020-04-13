/**
 * @file
 * Testing functionality.
 *
 * Provides functions to test data and charts, as well as, to generate "random"
 * data to test Tripal D3 charts. Due to the application no effort was made to
 * chose the "best" random algorithms. ;-p
 */
tripalD3.test = {

  /**
   * Test that the data for simplepie, simpledonut, & simplebar meet requirements.
   *
   * @param data
   *   The data to be tested
   * @param dataLabel
   *   The label to use in errors when referring to the data (Default: "data").
   * @return
   *   true if the data meets requirements and false otherwise.
   */
  'isSingleSeriesCompliant': function (data, dataLabel) {

    dataLabel = dataLabel || "data";

    if (!Array.isArray(data)) {
      console.error("The " + dataLabel + " should be an ARRAY where each element has a label and a count.");
      return false;
    }
    if (data.length == 0) {
      console.error("The " + dataLabel + " must not be empty.");
      return false;
    }
    return data.every(function(element) {
      if (!("label" in element)) {
        console.error("Every element of " + dataLabel + " must be an object with a LABEL key. This element doesn't comply: " + JSON.stringify(element));
        return false;
      }
      else if (!("count" in element)) {
        console.error("Every element of " + dataLabel + " must be an object with a COUNT key. This element doesn't comply: " + JSON.stringify(element));
        return false;
      }
      else {
        return true;
      }
    });
  },

  /**
   * Test that the data for multidonut meet requirements.
   *
   * @param data
   *   The data to be tested
   * @param dataLabel
   *   The label to use in errors when referring to the data (Default: "data").
   * @return
   *   true if the data meets requirements and false otherwise.
   */
  'isMultiSeriesCompliant': function (data, dataLabel) {

    dataLabel = dataLabel || "data";

    if (!Array.isArray(data)) {
      console.error("The data should be an ARRAY where each element has a series label and a parts array.");
      return false;
    }
    // Check that EVERY element has a label and parts array.
    return data.every(function(element) {
      if (!("label" in element)) {
        console.error("Every element must be an object with a LABEL key. This element doesn't comply: " + JSON.stringify(element));
        return false;
      }
      if (!("parts" in element)) {
        console.error("Every element must be an object with a PARTS key. This element doesn't comply: " + JSON.stringify(element));
        return false;
      }
      if (!Array.isArray(element.parts)) {
        console.error("The value of the PARTS key should be an ARRAY. This element doesn't comply: " + JSON.stringify(element));
        return false;
      }
      // Check that EVERY element of the parts array has a label & count.
      return tripalD3.test.isSingleSeriesCompliant(element.parts, "parts array");
    });

  },

  /**
   * Generate a single-series label/count dataset.
   * Suitable for use with simplepie, simpledonut, simplebar.
   *
   * @param number
   *   The number of categories to generate.
   * @param maxCount
   *   The maximum number the count element should be.
   * @param minCount
   *   The minimum number the count element should be.
   */
  'randomSingleSeries': function(number, maxCount, minCount) {

    // Set some defaults.
    number = number || 5;
    maxCount = maxCount || 10000;
    minCount = minCount || 500;

    // get random labels for each member of the dataset.
    var labels = tripalD3.test.randomLabels(number);

    // Now generate the dataset.
    var dataset = [];
    labels.forEach(function(label) {
      var count = Math.floor(Math.random() * (maxCount - minCount)) + minCount;
      dataset.push({
        'label': label,
        'count': count,
      });
    });

    return dataset;
  },
  
  //------------------------------------------------------
  'isFrequencyDataCompliant': function (data, dataLabel) {

    dataLabel = dataLabel || "data";

  /**  if (!Array.isArray(data)) {
      console.error("The " + dataLabel + " should be a set where each element has a dataLabel and a datum.");
      return false;
    }
    */
    if (data.length == 0) {
      console.error("The " + dataLabel + " must not be empty.");
      return false;
    }
    return data.every(function(element) {
      if (!(typeOf element == 'number')) {
        return false;
      }
  /** return data.every(function(element) {
      if (!("dataLabel" in element)) {
        console.error("Every element of " + dataLabel + " must be an object with a DATALABEL key. This element doesn't comply: " + JSON.stringify(element));
        return false;
      }
      else if (!("datum" in element)) {
        console.error("Every element of " + dataLabel + " must be an object with a DATUM key. This element doesn't comply: " + JSON.stringify(element));
        return false;
      }
      */
      else {
        return true;
      }
    });
  },

  /**
   * Generate random words to be used as labels. All labels consist of two parts
   * to test that your chart correctly handles spaces.
   *
   * @param number
   *   The number of labels you want returned. Maximum of 200.
   *
   * @return
   *   An array containing the number of labels you requested.
   */
  'randomLabels' : function(number) {

    // The list of possible labels.
    // Possible labels were generated by http://www.fantasynamegenerators.com/latin-names.php
    // with a bias towards female names.
    var allLabels = [
      'Demaenetus Cassius', 'Pseudolus Opis', 'Franciscus Longinus', 'Peniculus Tiberinus',
      'Stalagmus Sisenna', 'Adulescens Ripanus', 'Philoxenus Terenteius', 'Cario Britannicus',
      'Philolaches Seneca', 'Hegio Gaius', 'Bruttia Constans', 'Cloelia Tranio', 'Caecia Volturcius',
      'Vassenia Rutilius', 'Cosconia Camerarius', 'Duronia Abercius', 'Stertinia Sellic',
      'Antistia Lartius', 'Aburia Tutor', 'Modia Ignatius', 'Milphidippa Mico', 'Maelia Lucanus',
      'Didia Vergilius', 'Spuria Arcadius', 'Suedia Papinian', 'Rutilia Frumentius', 'Pomponia Herculius',
      'Titiedia Hilaris', 'Ampelisca Ventor', 'Duccia Viator', 'Nemetoria Trupo', 'Cocceia Maius',
      'Rufria Frugius', 'Sennia Opilio', 'Rusonia Fidelis', 'Secundia Sebastius', 'Minicia Rector',
      'Bucculeia Constans', 'Cluilia Cremutius', 'Caepasia Caldus', 'Carvilia Cencius', 'Aquillia Bonus',
      'Caedicia Naso', 'Faenia Martius', 'Attia Senecio', 'Cocceia Publicus', 'Otacilia Ambrosius',
      'Urgulania Dalmatius', 'Fulcinia Valens', 'Gratidia Firmus', 'Caedicia Papus', 'Bantia Auspex',
      'Septia Tarquinius', 'Peltrasia Maursus', 'Rutilia Nazarius', 'Vipstana Scipio', 'Mallia Turpilius',
      'Viridia Carnifex', 'Artoria Albani', 'Minicia Tiberinus', 'Canuleia Florens', 'Metilia Fronto',
      'Curtia Italicus', 'Liburnia Luccius', 'Annia Vitus', 'Cantilia Burcanius', 'Plautia Naevius',
      'Seia Hortensius', 'Cocceia Fabius', 'Augustina Sisinnius', 'Lucia Afer', 'Sornatia Vettonius',
      'Angela Congrio', 'Calventia Fadus', 'Tertinia Figulus', 'Dillia Leon', 'Sestia Lucius',
      'Vitruvia Pacatius', 'Curia Minicius', 'Papiria Pomponius', 'Julia Pratensis', 'Caeparia Plautus',
      'Babudia Geminius', 'Grania Tertulus', 'Fufia Marcallas', 'Norbana Sudrenus', 'Caesonia Lupercus',
      'Tertinia Surinus', 'Aquillia Trogus', 'Lafrenia Carbo', 'Festinia Iavolenus', 'Pontia Claudius',
      'Cominia Symphorian', 'Lucceia Novellius', 'Baebia Tertius', 'Epidia Licinius', 'Vassenia Lucan',
      'Manlia Nabor', 'Vibidia Marcellinus', 'Munia Novation', 'Caepasia Sisenna', 'Quinctia Metunus',
      'Volusia Gratian', 'Allectia Eumenius', 'Titiedia Zeno', 'Artoria Meminius', 'Titinia Hermina',
      'Bruttia Palicamus', 'Murria Latinius', 'Pompilia Sura', 'Dionysia Osterius', 'Cominia Elvorix',
      'Lucretia Iavolenus', 'Pontidia Sisinnius', 'Cluntia Curio', 'Urgulania Super', 'Dillia Lupinus',
      'Floridia Superbus', 'Floronia Ulixes', 'Hortensia Alethius', 'Icilia Quintilius', 'Baebia Crispian',
      'Vatinia Tullius', 'Calpurnia Bonifatius', 'Labiena Fimbria', 'Festinia Asina', 'Canidia Mercurialis',
      'Aquillia Telesinus', 'Petellia Typhoeus', 'Papinia Siricus', 'Papia Genesius', 'Septia Carnifex',
      'Ummidia Verus', 'Faleria Tremellius', 'Sidonia Sylvius', 'Albatia Pulcherius', 'Maximia Pachomius',
      'Juventia Habitus', 'Sallustia Sacerdos', 'Arria Hesychius', 'Sentia Verrucosis', 'Amatia Scato',
      'Ampelisca Panaetius', 'Caecia Catius', 'Tremellia Valerian', 'Floronia Zosimus', 'Gratidia Rufinius',
      'Papia Maximian', 'Placidia Dubitatius', 'Secundia Sympronian', 'Uulia Porphyrius', 'Duronia Pacatius',
      'Volusena Sentius', 'Manilia Musicus', 'Opsia Scaevola', 'Hirtia Scribonius', 'Sempronia Gryllus',
      'Atria Pelagius', 'Atronia Peregrinus', 'Herennia Laurentius', 'Alcesimus Nabor', 'Ludovicus Capiton',
      'Pius Messala', 'Turbalio Galenus', 'Henricus Fortunatus', 'Lyco Balduinus', 'Peniculus Pudentius',
      'Lystiteles Tertullian', 'Periplectomenus Frigidian', 'Gallicles Limetanus', 'Sceledrus Romulius',
      'Dordalus Tiburtius', 'Cario Eutherius', 'Dinia Christius', 'Cleareta Symmachus', 'Sphaerio Ulfila',
      'Adulescens Ennodius', 'Artamo Typhoeus', 'Lorarii Fuscus', 'Chrysalus Ancus', 'Aristophontes Iustinius',
      'Petrus Paratus', 'Philoxenus Papinian', 'Milphio Zeno', 'Delphium Perperna', 'Sparax Victricius',
      'Philto Evodius', 'Sceledrus Vedrix', 'Cyamus Regulus', 'Lyco Toutius', 'Stadius Pantensus',
      'Sergius Verullus', 'Philocomasium Spendius', 'Augustinus Allectus', 'Demaenetus Musa',
      'Advocati Censorinus', 'Cario Eugenus', 'Ballio Venantius', 'Lena Tibullus', 'Crocotium Gallio'
    ];

    // First we sort the labels randomly...
    allLabels.sort(function() {return 0.5 - Math.random()});

    // We only support a max of 200 random labels...
    if (number > 200) {
      console.warn("TripalD3 random label generator only supports at most 200 random labels.") ;
      return allLabels;
    }
    else {
      // Return the number of labels we need.
      return allLabels.slice(0, number);
    }
  },
}
