import {AlertService} from "@/service/AlertService";


export const UtilityService = {
    generateResponseMessage(obj, actionType = '') {
        let stat = "";
        let msg = "";

        if (obj.hasOwnProperty('response')) {
            stat = obj.response.status;
        } else {
            stat = obj.status;
        }

        switch (stat) {
            case 200:
                //success
                AlertService.successAlert(`${actionType} success`, actionType)
                    .then(r => {
                        return r
                    });
                break;

            case 201:
                //success created
                AlertService.successAlert(`${actionType} success`)
                    .then(r => {
                        return r
                    });
                break;

            case 203:
                // NON_AUTHORITATIVE_INFORMATION
                console.log(203);
                break;

            case 204:
                console.log(204);
                break;

            case 301:
                console.log(301);
                break;

            case 400:
                this.handleReqErrors(obj.response.data.errors, actionType);
                return this.parseErrors(obj.response.data.errors);
                break;

            case 403:
                this.handleReqErrors(obj.response.data.errors, 'Forbidden');
                return this.parseErrors(obj.response.data.errors);
                break;

            case 405:
                this.handleReqErrors(obj.response.data.errors, 'Forbidden');
                return this.parseErrors(obj.response.data.errors);
                break;

            case 409:
                this.handleReqErrors(obj.response.data.errors, 'Conflict');
                return this.parseErrors(obj.response.data.errors);
                break;

            case 401:
                if (obj.response.data.hasOwnProperty('message')) {
                    msg = obj.response.data.message;
                } else {
                    msg = 'You dont have authorize to access this service';
                }
                AlertService.errorAlert(msg, 'Unauthorized');
                break;

            case 404:
                AlertService.errorAlert([], 'Not Found');
                break;

            case 422:
                this.handleReqErrors(obj.response.data.errors, obj.response.data.message);
                // return this.parseErrors(obj.response.data.errors);
                break;

            case 500:
                AlertService.errorAlert('Internal server error', actionType);
                break;

            case 501:
                AlertService.errorAlert('Failed to implement', actionType);
                break;

            case 503:
                AlertService.errorAlert('Service un-available', actionType);
                break;

            default:
                AlertService.warningActionService('', 'Default');
                // console.log('this is default')
                break;
        }
    },


    handleReqErrors(erMsg, source) {
        let msgHtml = '';
        if (erMsg) {
            Object.keys(erMsg).forEach((key, index) => {
                console.log('erMessage keys',key)
                msgHtml += `<p class="text-left">${index + 1}. ${erMsg[key]}</p>`;
            })
        }

        AlertService.errorWithResponseDataService(null, msgHtml, source, 'warning');
    },


    capitalizeProperties(value) {
        try {
            Object.keys(value).forEach(key => {
                if (value[key] && typeof value[key] === 'string') {
                    if (!this.caseException.includes(key)) {
                        value[key] = (value[key]) ? String(value[key]).toUpperCase() : '';
                    }
                } else {
                    value[key] = this.capitalizeProperties(value[key]);
                }
            });
        } catch (e) {
            return value;
        }
        return value;
    },

}

export default {UtilityService}