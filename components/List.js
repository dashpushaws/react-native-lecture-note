import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';

import { LISTDATA } from '../shared/list'

import { ListItem, Avatar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

import api from '../api/list'
// 함수의 리턴 값이 JSX.Element면
// React 컴포넌트가 된다.

// JSX를 쓸려면 import React from 'react';
// Navigator로 화면을 이동할 때 컴포넌트 속성으로 전달됨
const List = ({ navigation }) => {

  // 통신 없이 했던 코드
  // const list = LISTDATA;
  // console.log(list);

  // 백엔드에 API요청후 응답 받은 데이터
  // 데이터를 받으면 화면 재렌더링하여 state처리
  console.log('?')
  const [list, setList] = useState([]);
  console.log('??')
  // [] < 컴포넌트가 App.js에 처음 마운트 됐을 때만 생성
  // [] 생략시 재렌더링시마다 함수 재생성
  // memoizing function: []안의 객체 또는 변수가 생성되거나 바뀔때 함수가 생성
  // 컴포넌트가 새로 마운트 됐을때 데이터를 호출시킬 것이기 때문에

  // useCallback(function(), [xxx]): 특정 조건에서 생성되는 함수를 만들 때 쓰는 hook
  // useCallback(function(), []): 컴포넌트가 처음 마운트 될 때, 함수 생성
  // useCallback(function(), [data]): data(변수, 객체)가 생성 혹은 수정될 때, 함수 생성
  const getList = useCallback(async () => {
    const result = await api.list();
    console.log('2-useCallback')
    // console.log(result.data);
    // state를 갱신 -> 재렌더링
    setList(result.data);
  }, [])
  console.log('???')

  // componentDidMount(event hook)-컴포넌트가 마운트 됐을때 함수 정의

  // useEffect(function(), [xxx]): 특정 조건에서 실행하는 함수를 만들 때 쓰는 hook
  // useEffect(function(), []): 컴포넌트가 처음 마운트 될 때, 함수 실행
  // useEffect(function(), [data]): data(변수, 객체)가 생성 혹은 수정될 때, 함수 실행
   
  // useEffect(() => {
  //   console.log('1-useEffect')
  //   getList();
  // }, []) 
  console.log('????')
  useEffect(() => {
    console.log('$$$')
    // navigation 이벤트 리스너를 생성
    // 반환 값이 이벤트 리스너 해제 함수
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        console.log('focus')
        getList();
      }
    )

    // clean-up function
    // 객체소멸 함수
    // useEffect(() =>{
    //    ...
    //   return 함수
    // }, []) 

    // componenet가 unmmount 되는 시점에 clean-up 함수가 실행됨


    return unsubscribe;
    // return () => { navigation.removelistener(unsubscribe);}

  }, [navigation])

  return (
    <View style={{flex: 1}}>
      <ScrollView 
        contentContainerStyle={
          { flexGrow:1, alignItems:"center", justifyContent:"center"}}
      >
        {
          [1,2,3,4].map((item, i) => {
            console.log('0')
          return <Text key={i}>{item}</Text>})
        }


        {
          list.map((item, i) => {
            console.log('3')
           return <ListItem 
            containerStyle={{width:"80%"}} 
            key={i}
            // stack -> stack 
            // .navigate(스택스크린이름, 매개변수객체)
            onPress={()=>{navigation.navigate("Details", {id: item.id})}}
            
            // A tab> a stack -> B tab> a stack 
            // https://reactnavigation.org/docs/nesting-navigators/#passing-params-to-a-screen-in-a-nested-navigator
            // .navigate(탭스크린이름, {params: 매개변수객체, screen: 스택스크린이름})
            // onPress={()=>{navigation.navigate("Tasks", {params: {id: item.id}, screen: "Tasks"})}}
            >
             <Avatar source={{uri: item.image}} />
             <ListItem.Content>
               <ListItem.Title>{item.title}</ListItem.Title>
               <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
             </ListItem.Content>
            </ListItem>
          })
        }
      </ScrollView>
    </View>
  )
}
export default List;