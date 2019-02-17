import React from "react";
import { StyleSheet } from "react-native";
import StepIndicator from 'react-native-step-indicator';

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013'
}

export default class Steps extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {step,titles}=this.props
    return (      
            <StepIndicator
              customStyles={stepIndicatorStyles}
              stepCount={titles.length}
              currentPosition={step}
              labels={titles}
              />
    );
  }
}


const styles = StyleSheet.create({
  
    btn: {
        alignSelf: 'center',
        margin: 0,
      }
});






