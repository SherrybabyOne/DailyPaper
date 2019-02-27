import React, { Component } from 'react';
import { connect } from 'dva';
//import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import {Card,TagItem,TagItem1,TagItem2,TagItem3,TagItem4,TagItem5,TagItem6,TagItem7,TagItem8,TagItem9} from './style';

import { Button  } from 'antd';



class Tags extends Component {
 
 
  showtag() {
    var arr = [];
    
    
    if(this.props.tagmodel)
    {
      
      for (let i in this.props.tagmodel) {
        let a= this.props.tagmodel[i];
        arr[a]='';
         
 }
      for (let i in this.props.tagmodel) {
       let a= this.props.tagmodel[i];
       arr[a]+=i;
       arr[a]+=' ';
        
}
     
    
    }
    var flag=0;
    return(
      arr.map((a,index) =>{
      flag++;
      if(flag/1===1) return <TagItem  key={a} > {a} </TagItem >
      else if(flag/2===1) return <TagItem1  key={a} >{a} </TagItem1 >
      else if(flag/3===1) return <TagItem2  key={a} > {a} </TagItem2 >
      else if(flag/4===1) return <TagItem3  key={a} > {a} </TagItem3 >
      else if(flag/5===1) return <TagItem4   key={a} > {a} </TagItem4 >
      else if(flag/6===1) return <TagItem5   key={a} > {a} </TagItem5 >
      else if(flag/7===1) return <TagItem6   key={a} > {a} </TagItem6 >
      else if(flag/8===1) return <TagItem7   key={a} > {a} </TagItem7 >
      else if(flag/9===1) return <TagItem8  key={a} >{a} </TagItem8 >
      else return <TagItem9 key={a} > {a} </TagItem9 >
      
      })
      
    )
     
  }

  
 

 render(){
 // console.log(  this.props.tagmodel.str[0] ); 

  return ( 
   
    <div> 
       <Card >
    
     <Button type="dashed" onClick={()=>(this.props.dispatch ({ type :'tagmodel/getweek' }))} >一周热点</Button>
    
     <Button type="dashed" onClick={()=>(this.props.dispatch ({ type :'tagmodel/gettoday' }))} >今日热点</Button>
     <p></p>
     {this.showtag()}
  
    
     
      <p></p>
      </Card>
    </div>
 
 
  )}
}



const mapStateToProps = (state) => {
  return {
    tagmodel:state.tagmodel.list.b
  };
};


  

export default connect(mapStateToProps)(Tags);

