import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

interface CardProps {
  card: string;
  isTurnedOver: boolean;
  onPress: () => void;
}

export const Card = ({card, isTurnedOver, onPress}: CardProps) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={isTurnedOver ? styles.cardUp : styles.cardDown}>
        {isTurnedOver ? (
          <Image
            style={styles.imgStyle}
            source={{
              uri: card,
            }}
          />
        ) : (
          <Image
            style={styles.imgStyle}
            source={{
              uri: 'https://img.icons8.com/ios/50/question-mark--v1.png',
            }}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    width: 50,
    height: 50,
  },
  cardUp: {
    width: 100,
    height: 100,
    backgroundColor: '#1e293b',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDown: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderColor: '#334155',
    backgroundColor: '#1e293b',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
