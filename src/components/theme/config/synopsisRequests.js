import _ from 'lodash/fp';


import { fetchFeedsRequest } from '../plugins/Feeds/ducks/fetch-feeds.duck';


import { fetchPatientTopThreeThingsSynopsisRequest } from '../plugins/TopThreeThings/ducks/fetch-patient-top-three-things.duck';


import { fetchPatientVaccinationsSynopsisRequest } from '../plugins/Vaccinations/ducks/fetch-patient-vaccinations.duck';


const generateFetchListOnMount = (fetchRequest) => {
    return {
        componentDidMount() {
            const { actions, match } = this.props;
            const userId = _.get('params.userId', match);
            if (userId) actions[fetchRequest]({ userId });
        },
        componentWillReceiveProps(nextProps) {
            const { actions, match } = this.props;
            const nextUserId = _.get('match.params.userId', nextProps);
            const userId = _.get('params.userId', match);
            if (nextUserId !== userId) {
                actions[fetchRequest]({ userId: nextUserId });
            }
        },
    }
};

const generateFetchDetailOnMount = (fetchRequest) => {
    return {
        componentDidMount() {
            const { actions, match } = this.props;
            const userId = _.get('params.userId', match);
            const sourceId = _.get('params.sourceId', match);
            if (userId && sourceId) actions[fetchRequest]({ userId, sourceId });
        },
    }
};

const generateArrayOnMount = (requestArray) => {
    return {
        componentDidMount() {
            const { actions, match } = this.props;
            const userId = _.get('params.userId', match);
            requestArray.forEach(item => {
                if (userId) actions[item]({ userId });
            });
        },
        componentWillReceiveProps(nextProps) {
            const { actions, match } = this.props;
            const nextUserId = _.get('match.params.userId', nextProps);
            const userId = _.get('params.userId', match);
            requestArray.forEach(item => {
                if (nextUserId !== userId) {
                    actions[item]({userId: nextUserId});
                }
            });
        },
    }
}







export const fetchPatientTopThreeThingsOnMount = (generateFetchListOnMount('fetchPatientTopThreeThingsRequest'));
export const fetchPatientTopThreeThingsDetailOnMount = (generateFetchDetailOnMount('fetchPatientTopThreeThingsDetailRequest'));




export const fetchPatientVaccinationsOnMount = (generateFetchListOnMount('fetchPatientVaccinationsRequest'));
export const fetchPatientVaccinationsDetailOnMount = (generateFetchDetailOnMount('fetchPatientVaccinationsDetailRequest'));




/**
 * This constant returns array of onMount's
 */
export const themeSynopsisOnMount = (generateArrayOnMount([






    'fetchPatientTopThreeThingsSynopsisRequest',




    'fetchPatientVaccinationsSynopsisRequest',


]));

/**
 * This constant returns array of requests
 */
export const themeSynopsisRequests = {


    fetchFeedsRequest,


    fetchPatientTopThreeThingsSynopsisRequest,


    fetchPatientVaccinationsSynopsisRequest,

};