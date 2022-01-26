import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';

interface IProps {
    onPress: () => void;
    text: string; 
    style?: ViewStyle | null;
}

export const Button = ({onPress, text, style}: IProps) =>  (
    <TouchableOpacity style={[styles.main, style]} onPress={onPress}><Text style={styles.text}>{text}</Text></TouchableOpacity>
)


const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 20,
    },
    text: {
        textTransform: 'uppercase',
        fontSize: 16,
        color: '#090466'
    }
});