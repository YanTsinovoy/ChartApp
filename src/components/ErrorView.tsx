import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface IProps {
    text: string; 
}

export const ErrorView = ({text}: IProps) =>  (
    <View style={styles.main} ><Text style={styles.text}>{text}</Text></View>
)


const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        color: '#ff0000'
    }
});