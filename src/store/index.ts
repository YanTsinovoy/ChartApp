import { action, observable, makeObservable, reaction, computed, autorun } from 'mobx';
import moment from 'moment';
import { selectionToDateFormat, selectionToValueDict } from '../constants';
import ChartService from '../services/chartService';

class ChartStore {
    @observable currency: 'usd' | 'eur' | 'gbp' = 'usd';

    @observable projectId: 'ethereum' | 'bitcoin' | 'xrp' = 'ethereum';

    @observable selectedPeriod = '1d';

    @observable numberOfDays = '1';

    @observable isLoading = false;

    @observable error: string = '';

    @observable prices: [number, number][] = [[0, 0]];

    @observable selectedDate = moment().format('h A');

    @observable difference = '';

    @observable differencePercentage = '';

    @computed get chartPrices (){
        return this.prices.map(priceObject => priceObject[1] ? priceObject[1]?.toFixed(2) : 0);
    }

    @action  getDateByIndex = (index: number) => {
        if(index in this.prices){
            const timestamp = this.prices[index][0];
            const timeFormat = selectionToDateFormat[this.selectedPeriod]
            const date = moment(timestamp).format(timeFormat);
            this.selectedDate = date;
        }
    }

    @action  setDifferenceByIndex = (index: number) => {
        if(index in this.prices){
            const firstValue = this.prices[0][1];
            const currentValue =  this.prices[index][1]
            const difference = currentValue - firstValue;
            const percDiff =  100 *  (currentValue - firstValue) / ( (currentValue + firstValue)/2 ) 
            this.difference = difference?.toFixed(2)?.toString()
            this.differencePercentage = percDiff?.toFixed(2)?.toString()
        }
    }

    @action setCurrency = (currency: 'usd' | 'eur' | 'gbp' ) => {
        this.currency = currency;
    }

    @action setProjectId = (projectId:  'ethereum' | 'bitcoin' ) => {
        this.projectId = projectId;
    }

    @action setNumberOfDays = (period: string) => {
        const days = selectionToValueDict[period];
        if(days) {
            this.selectedPeriod = period;
            this.numberOfDays = days;
        };
    }

    @action getPricesData = async () => {
        try {
            this.isLoading = true;
            this.error = '';
            this.difference = '';
            this.differencePercentage = '';
            const response = await ChartService.getChartPrices({projectId: this.projectId, currency: this.currency, numberOfDays: this.numberOfDays});
            const { data: { prices } } = response;
            this.prices = prices;
        } catch(err: any){
            console.dir(err)
            this.error = err?.response?.data?.error || 'Something went wrong';
        } finally {
            this.isLoading = false;
        }
    }

    constructor() {
        makeObservable(this);
        reaction(() => this.numberOfDays, this.getPricesData)
        reaction(() => this.currency, this.getPricesData)
        reaction(() => this.projectId, this.getPricesData)
        autorun(() => this.getPricesData())
     }
}

export default new ChartStore();