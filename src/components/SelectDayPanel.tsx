import React, { useMemo } from 'react';
import { observer } from 'mobx-react';

import { View, Text, StyleSheet } from 'react-native';
import chartStore from '../store/index'
import { selectionToValueDict } from '../constants';
import { Button } from './Button';

type buttonsConfigType = {
    name: string;
    isSelected: boolean;
}

export const SelectDayPanel = observer(() => {
    const { selectedPeriod, setNumberOfDays } = chartStore;

    const buttonsConfig: buttonsConfigType[] = useMemo(() => {
        return Object.keys(selectionToValueDict).map(name => ({name, isSelected: name === selectedPeriod}))
    }, [selectedPeriod]);

    const onPressHandler = (name: string) => () => {
        setNumberOfDays(name);
    }

    return (
        <View style={styles.main}>
            {buttonsConfig.map((button: buttonsConfigType, index: number) => {
                return <Button key={index + button.name} text={button.name} style={button.isSelected ? styles.selectedPeriod : null } onPress={onPressHandler(button.name)}/>
            })}
        </View>
    )
})

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    selectedPeriod: {
        backgroundColor: '#bfbcf7'
    }
});