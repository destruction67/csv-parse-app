import axios from 'axios';

import {TASK_MGMT_CONSTANTS, TASK_MGMT_KEYS, TOKEN} from '@/config/constants.config';
import {AlertService} from "@/service/AlertService";
import {UtilityService} from "@/service/UtilityService";

const initializeState = () => {
    return {
        task: {},
        tasks: [],
        newTask: {},

        taskFormParam: {
            searchValue: null,
            type: null,
            level: null,
            count: 10,
            status: null,
            page: null,
        },


        taskPagination: {
            from: 1,
            currentPage: 1,
            lastPage: 0,
            perPage: 10,
            to: 10,
            total: 0,
        },

        isReloading: false,

    }
}


const state = {
    ...initializeState()
};



const mutations = {
    set_tasks(state, params) {
        state.tasks = params
    },

    set_task(state, params) {
        state.task = params
    },

    create_task(state) {
        state.newTask = {};
    },

    update_task(state, params) {
        let task = state.tasks.find((val, index) => val.id === params.id)
        Object.assign(task, params)
    },

    delete_task(state, params) {
        let index = state.tasks.findIndex((val, index) => val.id === params)
        state.tasks.splice(index, 1)
    },


    set_tasks_pagination(state, params) {
        state.taskPagination = {
            from: params.from,
            currentPage: params.current_page,
            lastPage: params.last_page,
            perPage: params.per_page,
            to: params.to,
            total: params.total,
        }
    },

    set_is_reloading(state, payload) {
        state.isReloading = payload
    },
};


const actions = {
    async set_tasks({commit}, params) {
        commit('set_is_reloading', true)
        return await axios.get(TASK_MGMT_CONSTANTS.TASK, {params}).then((r) => {
            commit('set_tasks', r.data.data)
            commit('set_tasks_pagination', r.data)
            commit('set_is_reloading', false)
            return true

        }).catch((er) => {
            commit('set_is_reloading', false)
            UtilityService.generateResponseMessage(er, 'Get tasks')
            console.log(er, ' this is er')
            return false
        })
    },

    async set_task({commit}, params) {
        return await axios.get(`${TASK_MGMT_CONSTANTS.TASK}/${params}`).then((r) => {
            commit('set_task', r.data)
            console.log(r.data, 'task')
            return true

        }).catch((er) => {
            commit('set_is_reloading', false)
            UtilityService.generateResponseMessage(er, 'Get Task')
            return false
        })
    },

    async update_mark_task({commit}, params) {
        return axios.post(TASK_MGMT_CONSTANTS.MARK_TASK, params).then((r)=>{
            // commit('marked',r.data.updatedMarkTask);
            console.log('marked task', r.data.updatedMarkTask)
            return true;

        }).catch((error)=>{
            UtilityService.generateResponseMessage(error,'Mark Task');
            return false;

        });
    },

    async create_task({commit}, params) {
        return axios.post(TASK_MGMT_CONSTANTS.TASK, params).then((r) => {
            commit('create_task', r.data);
            return true;

        }).catch((error) => {
            UtilityService.generateResponseMessage(error, 'Create Task');
            return false;
        })
    },


    async update_task({commit}, params) {
        return axios.put(`${TASK_MGMT_CONSTANTS.TASK}/${params.id}`, params).then((r)=>{
            commit('update_task',r.data.updatedTask);
            console.log(r.data.updatedTask, 'r.data.updatedTask')
            return true;

        }).catch((error)=>{
            UtilityService.generateResponseMessage(error,'Update Task');
            return false;

        });
    },

    async delete_task({ commit }, params) {
        let _del = AlertService.questionAlertService("Do you want to delete this task.",'Delete Task','question');
        if(await _del){
            return axios.delete(`${TASK_MGMT_CONSTANTS.TASK}/${params}`).then((r)=>{
                AlertService.successAlert("Deleted successfully",'Delete Task');
                commit('delete_task',r.data.id);
                return true;

            }).catch((er)=>{
                UtilityService.generateResponseMessage(er,"Delete Task");
                return false;

            })
        }
    },

};


const getters = {
    tasks: state => state.tasks,
    task: state => state.task,
    taskFormParam: state => state.taskFormParam,
    taskPagination: state => state.taskPagination,
    isReloading: state => state.isReloading,
};


/** export **/
export default {state, actions, mutations, getters};