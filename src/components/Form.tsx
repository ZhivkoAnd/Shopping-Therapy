
import {useForm} from 'react-hook-form' // React-hook-form - displaying errors, submiting form
import {yupResolver} from '@hookform/resolvers/yup' // yupResolver connects the react hook form and yp, so we can use the schema we created
import * as yup from 'yup' // Yup - Validation 

const Form = () => {

// We list all the properties of our form object in a schema, and specify what validaiton rules should apply to them by adding yup methods.
// But we can also use regex us we want to
 const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  age: yup.number().positive().integer().min(12).required("Age is required"),
  password: yup.string().min(4).required("Password is required"),
  confirmPassword: yup.string().nullable().oneOf([yup.ref("password"), null]).required("Passwords don't match")
 })

 // The resolver connects the react hook form and yep, so we can use the schema we created
 const {register, handleSubmit, formState: {errors}} = useForm({
  resolver: yupResolver(schema)
 })

 const onSubmit = (data: {}) => {
  console.log(data)
 }

  return (
    // HandleSubmit comes from React Hook Form and takes care of everything before the actual submit
    // register is used to Register the data that we are using (like a key in an object)
    // the errors are used to specify which error message should we show for each field
    <div onSubmit={handleSubmit(onSubmit)}>
      <form className='form'>
        <input type='text' placeholder='Full name' {...register("fullName")}/> 
        <p className='form__error'>{errors.fullName?.message}</p>
        <input type='text' placeholder='Email' {...register("email")}/>
        <p className='form__error'>{errors.email?.message}</p>
        <input type='text' placeholder='Age' {...register("age")}/>
        <p className='form__error'>{errors.age?.message}</p>
        <input type='password' placeholder='Password' {...register("password")}/>
        <p className='form__error'>{errors.password?.message}</p>
        <input type='password' placeholder='Confirm Password'{...register("confirmPassword")}/>
        <p className='form__error'>{errors.confirmPassword?.message}</p>
        <input type='submit'/>
      </form>
    </div>
  )
}

export default Form