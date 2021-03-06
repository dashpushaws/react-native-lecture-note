import React, { useEffect, useCallback, useState} from 'react';
import { Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

import { useDispatch, useSelector } from 'react-redux'
import { addTask, removeTask } from '../redux/actions/tasks'

import { LISTDATA } from '../shared/list'

import api from '../api/list'
// 함수의 리턴 값이 JSX.Element면
// React 컴포넌트가 된다.

// JSX를 쓸려면 import React from 'react';
// Navigator로 화면을 이동할 때 컴포넌트 속성으로 route, navigation이 전달됨
const Details = ( { route, navigation }) => {
  console.log('&&&&&&&&&&&&&&&&&& DETAILS TAB &&&&&&&&&&&&&&&&&&')
  // navigation.navigate("스크린이름", 매개변수)
  console.log("--detail");
  console.log(route.params);  // navigate로 넘어온 매개변수

  // const id = route.params.id;
  const { id } = route.params;


  const [item, setItem] = useState({});

  // 로컬에서 데이터 받아와서 렌더링
  // const item = LISTDATA.filter(item => item.id == id)[0];
  // console.log(item);

  const dispatch = useDispatch();

  const tasks = useSelector(state => state.tasks);
  console.log("--tasks--");
  console.log(tasks);

  const isExistedTask = tasks.filter(item => item.id == id).length > 0 ? true : false;
  console.log("--isExistedTask--");
  console.log(isExistedTask);
// 뷰는 바인딩 된 데이터가 업데이트 시, 그것만 재렌더링
// 리엑튼-네이티브는 state가 업데이트되면, 그 state가 있는 컴포넌트
// 전부가 리렌더링 -> 컴포넌트를 가능한 작게 만든다
  const getDetails = useCallback(async () => {
    const result = await api.get(id);
    console.log(result.data);
    setItem(result.data);
  }, [])

  useEffect(() => {
    getDetails();
  }, []);
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider/>
        <Card.Image source={{uri: item.image}}>
        </Card.Image>
        <Card.Divider/>        
        <Text style={{marginBottom: 10}}>
          {item.description}
        </Text>
        {
          isExistedTask 
            ?
            <Button
              onPress={()=>{dispatch(removeTask(id))}}
              icon={<Icon name='close' type='ionicon' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:"gray"}}
              title='REMOVE TASK' 
            /> 
            :
            <Button
              onPress={()=>{dispatch(addTask(item))}}
              icon={<Icon name='checkmark' type='ionicon' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:"tomato"}}
              title='ADD TASK' 
            />    
        }
            
      </Card>
    </View>
  )
}
export default Details;