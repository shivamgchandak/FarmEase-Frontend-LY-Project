import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProgressStepperProps {
  currentStep: 'language' | 'role' | 'profile';
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  const steps = [
    { key: 'language', label: 'Language' },
    { key: 'profile', label: 'Profile' },
    { key: 'role', label: 'Role' }
  ];

  const isStepCurrent = (stepKey: string) => {
    return stepKey === currentStep;
  };

  return (
    <View style={styles.container}>
        <View style={styles.labelsContainer}>
            {steps.map((step, index) => {
                const isCenter = step.key === "profile";
                return (
                    <Text
                    key={step.key}
                    style={[
                        styles.stepLabel,
                        isStepCurrent(step.key) && styles.activeStepLabel,
                        isCenter && styles.centerStepLabel
                    ]}
                    >
                    {step.label}
                    </Text>
                );
            })}
        </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressLineBackground} />

        {steps.map((step, index) => (
          <View
            key={step.key}
            style={[
              styles.stepCircle,
              isStepCurrent(step.key) && styles.activeStepCircle,
              {
                left: `${(index / (steps.length - 1)) * 100}%`,
                marginLeft: -6
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'relative',
  },
  stepLabel: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: '#999',
  },
  activeStepLabel: {
    color: '#169E1C',
    fontWeight: '600',
  },
  centerStepLabel: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -20 }],
  },
  progressContainer: {
    height: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  progressLineBackground: {
    height: 2,
    backgroundColor: '#E0E0E0',
    position: 'absolute',
    width: '100%',
  },
  stepCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    position: 'absolute',
    top: '50%',
    marginTop: -6,
  },
  activeStepCircle: {
    backgroundColor: '#169E1C',
  },
});

export default ProgressStepper;