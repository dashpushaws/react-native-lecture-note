  useEffect(() => {
  const unsubscribe = navigation.addListener( //useEeffect로 이벤트 리스너 등록
    'focus',
    () => {                   // 등록되는 이벤트 리스너 함수
      getList();
    }
  )
  return unsubscribe;
  }, [navigation])

  /*
  1. navigation 객체가 생성 혹은 수정 될때 useEffect 실행
  2. navigation 객체는 메소드들만 가지는 객체라서 1번 생성될때(상위컴포넌트에서 prop으로 navigation을 줄때)만 useEffect 실행
  3. 그 1번 실행될때, 리스트탭에 포커스 되면 실행할 함수를 등록함. navigation.addListener(행위, 등록함수)
  4. return xxx : useEffect가 다시 실행될때, 이미 있던 이벤트 리스너를 삭제함
  5. navigation.addListener 리턴값은 이벤트리스너 제거함수
  6. useEffect가 다시 실행되기 위한 조건인 navigation 생성 혹은 수정에서, 처음 생성 이후 수정되는 일이 없기때문에 쓰이진 않음

  */