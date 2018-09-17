import { get } from 'lodash';
import { themeConfigs } from '../../../themes.config';



import feeds from '../plugins/Feeds/index';

const feedsTitle = get(themeConfigs.patientsSummaryTitles, 'feeds', 'Feeds');


import topThreeThings from '../plugins/TopThreeThings/index';

import { topThreeThingsPrevImage } from '../plugins/TopThreeThings/ImageSource';

const topThreeThingsTitle = get(themeConfigs.patientsSummaryTitles, 'topThreeThings', 'Top Three Things');


import vaccinations from '../plugins/Vaccinations/index';

import { vaccinationsPrevImage } from '../plugins/Vaccinations/ImageSource';

const vaccinationsTitle = get(themeConfigs.patientsSummaryTitles, 'vaccinations', 'Vaccinations');



/**
 * The list of none-core plugins which are included to the current theme
 *
 * @return array
 */
export const themePlugins = [


    feeds,


    topThreeThings,


    vaccinations,

];

/**
 * This information is necessary for menu and URL
 *
 * @return array
 */
export const themePluginsPages = {


    'feeds': {
            breadcrumbs: [{
                title: feedsTitle,
                state: '/feeds',
            }],
        },


    'topThreeThings': {
            breadcrumbs: [{
                title: topThreeThingsTitle,
                state: '/topThreeThings',
            }],
        },


    'vaccinations': {
            breadcrumbs: [{
                title: vaccinationsTitle,
                state: '/vaccinations',
            }],
        },

};

/**
 * This information is necessary for Patient Summary
 *
 * @return array
 */
export const themePatientSummaryConfig = [






    {
      key: 'topThreeThings',
      title: 'Top Three Things',
      titleCheckboxes: 'Top Three Things',
      state: 'topThreeThings',
      nameCheckboxes: 'topThreeThings',
      imgPreview: topThreeThingsPrevImage,
      isDefaultSelected: true,
    },




    {
      key: 'vaccinations',
      title: 'Vaccinations',
      titleCheckboxes: 'Vaccinations',
      state: 'vaccinations',
      nameCheckboxes: 'vaccinations',
      imgPreview: vaccinationsPrevImage,
      isDefaultSelected: true,
    },


];

/**
 * This information is necessary for Unit-tests
 */
export const testStoreContent = {






    patientsTopThreeThings: {},




    patientsVaccinations: {},


};
