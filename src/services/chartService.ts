import { getEtherumChartPricesParameters } from "../types";
import http from "./index";

class ChartService {
    static async getChartPrices({projectId, currency, numberOfDays}: getEtherumChartPricesParameters){
        return http.get(`${projectId}/market_chart?vs_currency=${currency}&days=${numberOfDays}`)
    } 
}

export default ChartService;