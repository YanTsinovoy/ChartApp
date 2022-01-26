import { dayNumber, period } from "../types";

export const currencies = ['usd', 'eur', 'gbp'];

export const projectIds = ['ethereum', 'bitcoin'];

export const currencyToSymbol: {[key: string]: string} = {
    'usd':'$',
    'eur': '€', 
    'gbp': '£'
}

export const selectionToValueDict: {
    [key: period | string]: dayNumber;
} = {
    '1d': '1',
    '1w': '7',
    '1m': '30',
    '1y': '365',
    'All': 'max'
}

export const selectionToDateFormat: {
    [key: period | string]: string;
} = {
    '1d': 'h A',
    '1w': 'ddd h A',
    '1m': 'Do h A',
    '1y': 'Do MMM h A',
    'All': 'MM-DD-YYYY h A'
}

export const selectionToToolTipWidth: {
    [key: period | string]: number;
} = {
    '1d': 80,
    '1w': 100,
    '1m': 100,
    '1y': 140,
    'All': 140
}

export const CHART_HEIGHT = 300;
export const TOOLTIP_HEIGHT = 60;