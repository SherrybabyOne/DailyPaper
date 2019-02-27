import axios from 'axios'
import { func } from 'prop-types';
import  {gettoday,getweek} from '../services/example'
export default {
    namespace:'tagmodel',
    state:{
        list:{},
        
    },

    effects:{
        *getweek({payload}, {put,call} ) {
            if(JSON.parse(localStorage.getItem("data")).tokenStr)
                {const res=yield call(getweek);
                const b=res.data.data;
                yield put({ type:"success",b});
            }
            },
            *gettoday( {payload},{put,call} ) {
                if(JSON.parse(localStorage.getItem("data")).tokenStr)
                    {const res=yield call(gettoday);
                     const b=res.data.data;
                    yield put({ type:"success",b});
                    }
                    },
       
        
            },

    reducers:{
                'success'(state,b){
                  
                return{ ...state,list:b }
                
                  
            },     
            },  
    
  
}