import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Card} from './src/Card';

const card = [
  'https://img.icons8.com/fluency/48/bear.png',
  'https://img.icons8.com/fluency/48/crocodile-icon.png',
  'https://img.icons8.com/fluency/48/deer.png',
  'https://img.icons8.com/fluency/48/leopard.png',
  'https://img.icons8.com/fluency/48/harambe-the-gorilla.png',
  'https://img.icons8.com/fluency/48/giraffe.png',
];

export const App = () => {
  const [board, setBoard] = useState<string[]>(shuffle([...card, ...card]));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState(30);

  useEffect(() => {
    if (selectedCards.length < 2) return;
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeOutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [selectedCards]);

  const handleTapcard = (index: number) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) {
      return;
    }
    setSelectedCards([...selectedCards, index]);
    setScore(score - 1);
  };

  const reset = () => {
    setMatchedCards([]);
    setScore(30), setSelectedCards([]), setBoard(shuffle([...card, ...card]));
  };

  if (score === -1) {
    setScore(score + 1);
    Alert.alert('No more attempts', 'Try again', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Reset', onPress: () => reset()},
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <Text style={styles.title}>Attempts: {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              card={card}
              isTurnedOver={isTurnedOver}
              onPress={() => handleTapcard(index)}
            />
          );
        })}
      </View>
      <Pressable style={styles.buttonReset} onPress={() => reset()}>
        <Text style={styles.title}>Reset</Text>
      </Pressable>

      <StatusBar backgroundColor="#61dafb" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: '900',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonReset: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 25,
  },
});

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
