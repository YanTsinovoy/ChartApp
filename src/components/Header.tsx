import React from 'react';
import { observer } from 'mobx-react';

import { View, Text, StyleSheet } from 'react-native';
import chartStore from '../store/index'
import SelectDropdown from 'react-native-select-dropdown'
import { currencies, currencyToSymbol, projectIds } from '../constants';

export const Header = observer(() => {
    const { currency, projectId, setCurrency, setProjectId, isLoading, difference, differencePercentage } = chartStore;
    const negativeDiff = difference?.indexOf('-') !== -1;

    return (
        <View style={styles.main}>
            <SelectDropdown
            data={projectIds}
            buttonStyle={styles.firstButton}
            defaultValue={projectId}
            rowTextStyle={styles.coin}
            buttonTextStyle={styles.coin}
            disabled={isLoading}
            onSelect={(selectedItem) => {
                setProjectId(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
            <SelectDropdown
            data={currencies}
            defaultValue={currency}
            rowTextStyle={styles.currency}
            buttonTextStyle={styles.currency}
            disabled={isLoading}
            onSelect={(selectedItem) => {
                setCurrency(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
        <View style={styles.info}>
            {!!difference && <Text style={[styles.difference, negativeDiff ? styles.negative : styles.positive]}>{`${currencyToSymbol[currency]} ${difference}`}</Text>}
            {!!differencePercentage && <Text style={[styles.difference, negativeDiff ? styles.negative : styles.positive]}>{` ( ${differencePercentage}% )`}</Text>}      
        </View>
        </View>
    )
})

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
    },
    firstButton: {
        marginBottom: 10
    },
    coin: {
        textTransform: 'capitalize',
        fontSize: 18,
        marginTop: 15,
        marginBottom: 10,
        color: '#000000'
    },
    currency: {
        textTransform: 'uppercase',
        fontSize: 24,
        color: '#000000'
    },
    info: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        height: 30
    },
    difference: {
        fontSize: 16,
        color: '#000000'
    },
    positive: {
        color: '#045900'
    },
    negative: {
        color: '#570d05'
    }
});