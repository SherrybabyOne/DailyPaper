import React from 'react'
import {Form,Button,Input,Icon,message} from 'antd'
import { routerRedux } from 'dva/router';
import styles from './index.less'
import { connect }from'dva'
@Form.create()
class Register extends React.Component{
    constructor(props) {
        super(props);
    
        this.handleSubmit= this.handleSubmit.bind(this);
      }
    componentDidMount(){
        class Circle{

            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.r = Math.random() * 14 + 1; 
                this._mx = Math.random() * 2 - 1;
                this._my = Math.random() * 2 - 1;
            }
        
            drawCircle(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 360);
                ctx.closePath();
                ctx.fillStyle = 'rgba(204, 204, 204, 0.2)';
                ctx.fill();
            }
        
            drawLine(ctx, _circle) {
                let dx = this.x - _circle.x; 
                let dy = this.y - _circle.y;
                let d = Math.sqrt(dx * dx + dy * dy);
                if(d < 150) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);//起始点
                    ctx.lineTo(_circle.x, _circle.y);//终点
                    ctx.closePath();
                    ctx.strokeStyle = 'rgba(204, 204, 204, 0.1)';
                    ctx.stroke();
                }
            }
        
            move(w, h) {
                this._mx = (this.x < w && this.x > 0) ? this._mx: ( - this._mx);
                this._my = (this.y < h && this.y > 0) ? this._my: ( - this._my);
                this.x += this._mx/2;
                this.y += this._my/2;
            }
        }
        
        
        class currentCircle extends Circle {
            constructor(x, y) {
                super(x, y); 
            }
            drawCircle(ctx) {
                ctx.beginPath();
                this.r = (this.r < 14 && this.r > 1)? this.r + (Math.random() * 2 - 1): 2;
                ctx.arc(this.x, this.y, this.r, 0, 360);
                ctx.closePath();
                ctx.fillStyle = 'rgba(45, 120, 244, ' + (parseInt(Math.random()*100,10)/100) + ')';
                ctx.fill();
            }
        }
        
        
        
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        let canvas = document.querySelector("#canvas");
        console.log(canvas)
        let ctx = canvas.getContext("2d");
        let w = canvas.width =  canvas.offsetWidth;
        let h = canvas.height = canvas.offsetHeight;
        let circles = [];
        let current_circle  = new currentCircle(0, 0);
        
        
        
        let draw = function(){
            ctx.clearRect(0, 0, w, h);
            for(let i = 0; i < circles.length; i++) {
                circles[i].move(w, h);
                circles[i].drawCircle(ctx);
                for(var j = i + 1; j < circles.length; j++) {
                    circles[i].drawLine(ctx, circles[j])
                }
            }
            if(current_circle.x){
                current_circle.drawCircle(ctx);
                for(var k = 1; k < circles.length; k++) {
                    current_circle.drawLine(ctx, circles[k]);
                }
            }
            requestAnimationFrame(draw);
        }
        
        let init = function(num){
            for(var i = 0; i < num; i ++){
                circles.push(new Circle(Math.random() * w, Math.random() * h));
            }
            draw();
        }
        
        window.addEventListener('load', init(80));
        window.onmousemove = function(e) {
            e = e || window.event;
            current_circle.x = e.clientX;
            current_circle.y = e.clientY;
        }, window.onmouseout = function() {
            current_circle.x = null;
            current_circle.y = null;
        };
        
    }
    handleSubmit (e) {
        e.preventDefault()
       
        this.props.form.validateFields((err, values) => {
          if (err) { console.log(err) }
          else {
            const body = {
              name:values.name,
              password:values.password,
              nickname:values.nickname
          } 
          
            //处理发送的数据
            fetch(`http://dailyreport.lyzwhh.top/user/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            }).then((res) => {
              return res.json()
            }).then((json) => {
              // 也可以直接对返回的res数据操作,看后端给的啥数据格式
              console.log(json)
              if (json.code === 0){
                localStorage.setItem("data",JSON.stringify(json.data))
                console.log(json.data);
                message.success("注册成功")
                fetch('http://dailyreport.lyzwhh.top/user/login',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then((res) => {
                return res.json()
              }).then((json) => {
                console.log(json)
                if(json.code===0){
                    localStorage.setItem("data",JSON.stringify(json.data))
                    
                    message.success("登陆成功")
                    routerRedux.push('/display')
                }
                else if(json.code===302){
                    message.error("用户不存在")
                }
              })
              }
              else if(json.code === 301)
              {
                message.error("用户名已存在")
              }
            }).catch((e) => {
              console.log(e.message)
            })
          }
        })
       
      }

    
    
    render(){
        const { getFieldDecorator } = this.props.form;
    
        return(
            <div >
                <canvas id="canvas" style={{position:'relative',width: '100%',height: '900px'}}></canvas>
                <div className={styles.form} >
                <h2 className={styles.title}>不洗碗工作室</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item
          
          label={(
            <span>
              账号&nbsp;
              
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your Username!', whitespace: true },
            {
              pattern:new RegExp('^\\w+$','g'),
              message:'用户名必须为字母或数字'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          
          label={(
            <span>
              昵称&nbsp; 
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
          
        
        <Form.Item
         
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        
        <Form.Item >
          <Button type="primary" htmlType="submit"  className="login-form-button" style={{marginLeft:'6vw'}} >注册</Button>
        </Form.Item>

      </Form>
                </div>
            </div>
        )
    }
}
export default Register