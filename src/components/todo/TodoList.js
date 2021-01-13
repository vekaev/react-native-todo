import React from 'react';
import { FlatList,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { AppText } from '../ui/AppText';

export const TodoList = ({list, removeTodo, openTodo}) =>  (
  <FlatList
    data={list}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => <TodoList.Item item={item} removeTodo={removeTodo} openTodo={openTodo}/>}
  />
)


TodoList.Item = ({item, removeTodo, openTodo}) => (
  <TouchableOpacity activeOpacity={0.5} onPress={openTodo.bind(null, item)} onLongPress={removeTodo.bind(null, item)}>
    <View style={styles.container}>
      <AppText style={styles.item} key={item?.id}>
        {item?.title}
      </AppText>
    </View>
  </TouchableOpacity>
)


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: THEME.COLOR_GREY,
    borderStyle: 'solid',
  },
  item: {
    fontSize: 20,
  }
});
