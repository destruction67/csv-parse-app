import axios from 'axios';

import {CUSTOMER_CONSTANTS, TASK_MGMT_CONSTANTS, TASK_MGMT_KEYS, TOKEN} from '@/config/constants.config';
import {AlertService} from "@/service/AlertService";
import {UtilityService} from "@/service/UtilityService";

const initializeState = () => {
    return {
        customerInvites: [],
        isReloading: false,
    }
}


const state = {
    ...initializeState()
};


const mutations = {
    set_customerInvites(state, params) {
        state.customerInvites = params
    },

    set_is_reloading(state, payload) {
        state.isReloading = payload
    },
};


const actions = {

    async set_customerInvites({commit}, params) {
        commit('set_is_reloading', true)
        return await axios.get(CUSTOMER_CONSTANTS.GET_CUSTOMER_INVITES, {params}).then((r) => {
            commit('set_customerInvites', r.data)
            console.log('I got chu')
            commit('set_is_reloading', false)
            return true

        }).catch((er) => {
            commit('set_is_reloading', false)
            UtilityService.generateResponseMessage(er, 'Get Customer Invites')
            console.log(er, ' this is er')
            return false
        })
    },

    async save_customer_invite_csv({commit}, params) {
        commit('set_is_reloading', true)
        return axios.post(CUSTOMER_CONSTANTS.SAVE_CUSTOMER_INVITE_CSV, params, {
            'Content-Type': 'multipart/form-data',
            maxContentLength: 10000000,
            maxBodyLength: 10000000,

        }).then((r) => {
            commit('set_is_reloading', false)
            return true

        }).catch((r) => {
            commit('set_is_reloading', false)
            UtilityService.generateResponseMessage(r, 'Customer Invite CSV')
            return false

        })
    },


    // async save_customer_invite_csv({ commit }, formData) {
    //     commit('set_is_reloading', true);
    //     const saveCsv = await axios.post(CUSTOMER_CONSTANTS.SAVE_CUSTOMER_INVITE_CSV, formData, {
    //         'Content-Type': 'multipart/form-data',
    //         maxContentLength: 10000000,
    //         maxBodyLength: 10000000,
    //     });
    //
    //     if (saveCsv) {
    //         await AlertService.successAlert('Successfully saved.', 'Customer Invite CSV');
    //         await dispatch('set_customerInvites');
    //     }
    //
    //     commit('set_is_reloading', false);
    //     return saveCsv;
    // },

};


const getters = {
    customerInvites: state => state.customerInvites,
    isReloading: state => state.isReloading,
};


/** export **/
export default {state, actions, mutations, getters};