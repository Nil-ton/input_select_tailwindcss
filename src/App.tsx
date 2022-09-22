import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { req } from './mock'
import { useForm } from "react-hook-form";
import { InputSearch } from './components/InputSearch';

function App() {
  const {handleSubmit, register} = useForm()

  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <div className="bg-gray-800 h-[100vh] m-0 p-0 p-10">
      <form onSubmit={onSubmit}>
       <InputSearch type='select' placeholder='Insira os dados' id="teste" options={req} valueKey="nome" labelKey='nome' required={register} name="Teste"/>
      <input type="submit" />
      </form>
    </div>
  )
}

export default App
