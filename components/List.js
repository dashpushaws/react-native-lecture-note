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
  console.log('================== LIST TAB ==================')
  // console.log(navigation);
  // 통신 없이 했던 코드
  // const list = LISTDATA;
  // console.log(list);

  // 백엔드에 API요청후 응답 받은 데이터
  // 데이터를 받으면 화면 재렌더링하여 state처리
  console.log('1')
  const [list, setList] = useState([]);
  console.log('2')

  // [] < 컴포넌트가 App.js에 처음 마운트 됐을 때만 생성
  // memoizing function: []안의 객체 또는 변수가 생성되거나 바뀔때 함수가 생성
  // 컴포넌트가 새로 마운트 됐을때 데이터를 호출시킬 것이기 때문에

  // useCallback(function(), [xxx]): 특정 조건에서 생성되는 함수를 만들 때 쓰는 hook
  // useCallback(function(), []): 컴포넌트가 처음 마운트 될 때, 함수 생성
  // useCallback(function(), [data]): data(변수, 객체)가 생성 혹은 수정될 때, 함수 생성
  // useCallback(function()): 컴포넌트 렌더링 될때마다 계속 함수 생성
  const getList = useCallback(async () => {
    console.log('useCallback')
    const result = await api.list();
    // state를 갱신 -> 재렌더링
    setList(result.data);
  }, [])
  console.log('3')

 

  // useEffect(function(), [xxx]): 특정 조건에서 실행하는 함수를 만들 때 쓰는 hook
  // useEffect(function(), []): 컴포넌트가 처음 마운트 될 때, 함수 실행
  // useEffect(function(), [data]): data(변수, 객체)가 생성 혹은 수정될 때, 함수 실행
  // useEffect(function()): 컴포넌트가 렌더링 될때마다 계속 함수 호출
  // componentDidMount(event hook)-컴포넌트가 마운트 됐을때 함수 실행

  // useEffect(() => {
  //   console.log('1-useEffect')
  //   getList();
  // }, []) 
  useEffect(() => {
  console.log('useEffect')
  // navigation 이벤트 리스너를 생성
  // navigation.addListener(현재 네비게이션에 'focus'이벤트가 발생했을때, 호출되는 함수)
  // 반환 값: 이벤트 리스너 해제하는 함수
  const unsubscribe = navigation.addListener( //useEeffect로 이벤트 리스너 등록
    'focus',
    () => {                   // 등록되는 이벤트 리스너 함수
      console.log('focus')
      getList();
    }
  )
  console.log('4')
  // useEffect(() => {
  //   ...
  //  return 함수 <- clean-up function(객체소멸함수), 이 훅(useEffect)이 갱신될 때, 함수가 실행(그렇게 되도록 예약 거는듯)
  // }, [])       
  // 마운트 시, 실행([])이므로, 이 때는 componenet가 unmmount 되는 시점에 clean-up 함수가 실행됨

  // 객체소멸 함수 -> 다음에 useEffect가 실행되어 이벤트 리스너 생성 전에 실행되도록 예약을 검
  return unsubscribe;
  // return () => { navigation.removelistener(unsubscribe);} 과 같음
  }, [navigation])
  // 1. navigation 객체의 생성 혹은 수정 -> useEffect실행
  // 2. 예약된 return unsubscribe 실행: 기존의 존재하는 이벤트 리스너 해제
  // 3. useEffect 함수 첫부분 navigation.addListener으로 이벤트 리스너 생성하여 getList()실행

  // stack navigator: stack이 사라지면 컴포넌트 자체가 날라가므로, 다시 stack으로 진입하면 mount됨. useEffect(f,[])
  // tab navigator: 컴포넌트가 mount 된 상태로 유지되므로 useEffect(f,[navigation])사용
  console.log('5')

  return (
    <View style={{flex: 1}}>
      <ScrollView 
        contentContainerStyle={
          { flexGrow:1, alignItems:"center", justifyContent:"center"}}
      >
        {
          [1,2,3,4].map((item, i) => {
            console.log('+')
          return <Text key={i}>{item}</Text>})
        }


        {
          list.map((item, i) => {
            console.log('-')
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
        {
          [1].map((item, i) => {
            console.log('--------------- 렌더링 종료 ---------------')
          return <Text key={i}>{item}</Text>})
        }
      </ScrollView>
    </View>
  )
}
export default List;