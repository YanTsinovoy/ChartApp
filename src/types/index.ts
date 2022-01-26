export type period = '1d' | '1w' | '1m' | '1y' | 'All';

export type dayNumber = '1' | '7' | '30' | '365' | 'max';
 
export type getEtherumChartPricesParameters = {
    projectId: string | 'ethereum';
    currency: string | 'usd';
    numberOfDays: string | dayNumber;
}
