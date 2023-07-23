
export const API_URL = {
    index(){
        return 'http://localhost/csv-parse-api/public/api/v1/' + API_CSV_PARSE;
    }
};

export const API_CSV_PARSE = 'csv-parse/'

export default { API_URL, API_CSV_PARSE }