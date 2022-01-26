import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { LineChart } from "react-native-chart-kit";

import { View, StyleSheet, Dimensions} from 'react-native';
import chartStore from '../store/index'
import Svg, { Rect, Text, Line, Circle } from 'react-native-svg';
import { CHART_HEIGHT, selectionToToolTipWidth, TOOLTIP_HEIGHT } from '../constants';

export const ChartContainer = observer(() => {
    const {  chartPrices, getDateByIndex, setDifferenceByIndex, selectedDate, selectedPeriod } = chartStore;
    const [tooltipPos, setTooltipPos] = useState(
        { x:0, y:0, visible: false, value:0 }
    )
    const TOOLTIP_WIDTH = selectionToToolTipWidth[selectedPeriod] || 140;
    const screenWidth = Dimensions.get("window").width;
    const coordXNearRightSide = (tooltipPos.x + TOOLTIP_WIDTH/2) > screenWidth;

    const data = {
        labels: [],
        datasets: [
          {
            data: chartPrices,
            color: (opacity = 1) => `rgb(134, 65, 244)`, // optional
            strokeWidth: 2 // optional
          }
        ],
    };

    return (
        <View style={styles.main}>
            <LineChart
                data={data}
                withHorizontalLines={false}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                width={screenWidth}
                height={CHART_HEIGHT}
                withShadow={false}
                withDots={true}
                onDataPointClick={({value, dataset, getColor, index, x, y}) => {
                    console.log(value, dataset, getColor, index, x, y)
                    // check if we have clicked on the same point again
                    const isSamePoint = (tooltipPos.x === x && tooltipPos.y ===  y);

                    // if clicked on the same point again toggle visibility
                    // else,render tooltip to new position and update its value
                    if(isSamePoint){
                        setTooltipPos((previousState)=> {
                            return {
                                    ...previousState, 
                                    value: value,
                                    visible: !previousState.visible}
                            }
                        )
                    } else {
                        setTooltipPos({x: x, 
                            value: value, y: y,
                            visible: true
                        });
                    } 
                    getDateByIndex(index);    
                    setDifferenceByIndex(index);        
                }}
                chartConfig={{
                    backgroundColor: "#444",
                    backgroundGradientFrom: '#444',
                    backgroundGradientTo: '#444',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 110, 199, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "1",
                        fill: "rgb(0, 110, 199)"
                    }
                }}
                decorator={() => {
                    if(!tooltipPos.visible) return null;
                    return <View>
                    <Svg>
                        <Line x1={tooltipPos.x} y1={0} x2={tooltipPos.x} y2={CHART_HEIGHT - 50} stroke="red" strokeWidth="2" />
                        <Rect 
                            x={coordXNearRightSide ? tooltipPos.x - TOOLTIP_WIDTH : tooltipPos.x - TOOLTIP_WIDTH/2} 
                            y={tooltipPos.y + 12} 
                            width={TOOLTIP_WIDTH} 
                            height={TOOLTIP_HEIGHT} 
                            fill="black" />
                        <Circle cx={tooltipPos.x} cy={tooltipPos.y} r="5" strokeWidth="1" stroke="red" fill="red" />
                        <Text
                            x={coordXNearRightSide ? tooltipPos.x - TOOLTIP_WIDTH/2 : tooltipPos.x}
                            y={tooltipPos.y + 30}
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle">
                            {tooltipPos.value}
                        </Text>
                        <Text
                            x={coordXNearRightSide ? tooltipPos.x - TOOLTIP_WIDTH/2 : tooltipPos.x}
                            y={tooltipPos.y + 60}
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle">
                            {selectedDate}
                        </Text>
                    </Svg>
                    </View>
                }}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 400
    },
});