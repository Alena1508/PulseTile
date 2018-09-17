import _ from 'lodash/fp';
import { createSelector } from 'reselect';




import { feedsSelector } from '../plugins/Feeds/selectors';















const patientTopThreeThingsSelector = createSelector(
    ({ patientsTopThreeThings }) => patientsTopThreeThings,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsTopThreeThings, userId) => {
      let topThreeThings = {};
      if (patientsTopThreeThings[userId]) {
        topThreeThings = patientsTopThreeThings[userId];
      } else {
        topThreeThings = [{text: 'Loading ...'}, '', '', ''];
      }
      return topThreeThings;
    }
);




const patientVaccinationsSelector = createSelector(
    ({ patientsVaccinations }) => patientsVaccinations,
    (state, props) => _.getOr(null, 'match.params.userId', props),
    (patientsVaccinations, userId) => {
      let vaccinations = {};
      if (patientsVaccinations[userId]) {
        vaccinations = patientsVaccinations[userId];
      } else {
        vaccinations = [{text: 'Loading ...'}, '', '', ''];
      }
      return vaccinations;
    }
);



export const themeSynopsisSelector = createSelector(


    feedsSelector,


    patientTopThreeThingsSelector,


    patientVaccinationsSelector,

    (
    
    
        feeds,
    
    
        topThreeThings,
    
    
        vaccinations,
    
    ) => {
        return {
            
            
                feeds: feeds,
            
            
                topThreeThings: topThreeThings,
            
            
                vaccinations: vaccinations,
            
        };
    }
);