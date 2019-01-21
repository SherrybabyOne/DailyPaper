import React from 'react'
import {Form,Button,Input,Icon,Checkbox} from 'antd'
import styles from './index.less'

@Form.create()
class Login extends React.Component{
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
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div >
                <canvas id="canvas" style={{position:'relative',width: '100%',height: '900px'}}></canvas>
                <div className={styles.form} >
                <h2 className={styles.title}>不洗碗工作室</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入账号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
         
          <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft:'6vw'}}>
            登陆
          </Button>

        </Form.Item>
      </Form>
                </div>
            </div>
        )
    }
}
export default Login