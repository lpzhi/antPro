import request from '../utils/request';

export default {
    namespace: 'car',
    state: {
        data: [],
        counter: 0,
          },

    effects: {
        *queryInitCards(_, sagaEffects) {
          const { call, put } = sagaEffects;
          const endPointURI = 'api/car';
        console.log('aa');
          const puzzle = yield call(request, endPointURI);
                         
          console.log(puzzle)
          yield put({
            type: 'saveSearch',
            payload: puzzle,
          });

        //  yield put({ type: 'addNewCard', payload: puzzle });
    
        //   yield call(delay, 3000);
    
        //   const puzzle2 = yield call(request, endPointURI);
        //   yield put({ type: 'addNewCard', payload: puzzle2 });
        }
      },

    reducers:{
        addNewCard(state,{payload:newCard}){
            const nextCounter = state.counter + 1
            const newCardWithId = {...newCard,id:nextCounter}
            const nextData = state.data.concat(newCardWithId)
          
            return {
                data:nextData,
                counter:nextCounter,
            }
        },
        saveSearch(state, { payload }) {
            console.log('cc');
            console.log(state)
            return { ...state, data: payload };
          },
    }
  };
