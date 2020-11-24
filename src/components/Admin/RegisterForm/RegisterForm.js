import React, {useState} from 'react';
import './RegisterForm.scss';
import {Form, Icon, Input, Button, Checkbox, notification} from 'antd'
import {emailValidation, minLengthValidation} from '../../../utils/formValidation'
import {signUpApi} from '../../../Api/user'

export default function RegisterForm(){

    const [inputs, setinputs] = useState({
        email:"",
        password:"",
        repeatPassword:"",
        privacyPolicy:false
    });
    const [formValid, setFormValid] = useState({
        email:false,
        password:false,
        repeatPassword:false,
        privacyPolicy:false
    });

    const changeForm= event=>{
        if(event.target.name=== "privacyPolicy"){
            setinputs({
                ...inputs,
                [event.target.name]:event.target.checked
            });
        }else{
            setinputs({
                ...inputs,
                [event.target.name]:event.target.value
            });
        }
    }
    
    const inputValidation= e =>{
        const {type, name}=e.target;

        if(type==="email"){setFormValid({...setFormValid[name]= emailValidation(e.target)});
        }
        if (type==="password") {
            setFormValid({
                ...setFormValid
                [name]=minLengthValidation(e.target,6)
            });                    
        }
        if (type==="checkbox") {
            setFormValid({
                ...setFormValid
                [name]=e.target.checked
            });       
        
    }
}
    const register= async e=>{
        e.preventDefault();

        const passwordValue=inputs.password;
        const repeatPasswordValue= inputs.repeatPassword;
        const emailValue=inputs.email;
        const privacyPolicyValue=inputs.privacyPolicy;

        if(!emailValue|| !passwordValue || !repeatPasswordValue || !privacyPolicyValue){
            notification['error']({
                message:"Todos los campos son obligatorios"
            })
        }else{
            if(passwordValue !==repeatPasswordValue){
                notification['error']({
                    message:"Las contraseñas tienen que coincidir"
                })
            }else{
              const result= await signUpApi(inputs);

              if(!result.ok){
                  notification["error"]({
                      message: result.message
                  });
              }else{
                  notification["success"]({
                      message: result.message
                  })
                  resetForm();
              }
            }
        }
    }

    const resetForm = () =>{
        const inputs=document.getElementsByTagName('input');
        for(let i=0; i<inputs.length;i++){
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }

        setinputs({
        email:"",
        password:"",
        repeatPassword:"",
        privacyPolicy:false
        });

        setFormValid({
        email:false,
        password:false,
        repeatPassword:false,
        privacyPolicy:false
        });    
    }
    return(
        <Form className="register-form" onSubmit={register} onChange={changeForm}>
            <Form.Item>
                <Input
                prefix={<Icon type="user" style={{color:"rgba(0,0,0.25)"}}/>}
                type="email"
                name="email"
                placeholder="Correo electronico"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<Icon type="lock" style={{color:"rgba(0,0,0.25)"}}/>}
                type="password"
                name="password"
                placeholder="Contraseña"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input
                prefix={<Icon type="lock" style={{color:"rgba(0,0,0.25)"}}/>}
                type="password"
                name="repeatPassword"
                placeholder="Repetir contraseña"
                className="register-form__input"
                onChange={inputValidation}
                value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
              <Checkbox
              name="privacyPolicy" 
              onChange={inputValidation}
              checked={inputs.privacyPolicy}>
                  He leido y acepto la política de privacidad
              </Checkbox>
            </Form.Item>
            <Form.Item>
               <Button htmlType="submit" className="register-form__button">
                   Crear cuenta
               </Button>
            </Form.Item>

        </Form>
    )
}