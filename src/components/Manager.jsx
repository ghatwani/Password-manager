import React from 'react'
import { useRef, useState, useEffect } from 'react'

//react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//uuid 
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const Manager = () => {

  const ref = useRef()
  const pass_ref = useRef()


  const [form, setform] = useState({ id: "",site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])


  const getPasswords=async()=>{
    let req= await fetch("http://localhost:3000/")
    let passwords = await req.json();
    setpasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords()
    
  }, [])

  const ShowPassword = () => {
    pass_ref.current.type = "text"
    if (ref.current.src.includes("eye.png")) {
      ref.current.src = "hide.png"
      pass_ref.current.type = "password"
    }
    else {
      ref.current.src = "eye.png"
      pass_ref.current.type = "text"
    }
  }

  const SavePassword =async () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

    console.log(passwordArray)



    // Otherwise clear the form and show toast
    setform({ id: "", site: "", username: " ", password: " " })
    toast('Password saved successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  else{
    toast('invalid credentials', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

  const DeletePassword = async(id) => {
    let c = confirm("do you really want to delete?")
    if (c) {

      setpasswordArray(passwordArray.filter((item) => item.id !== id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
      let res= await fetch ('http://localhost/3000/',{method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    
      //make sure to serialize your JSON body
      body: JSON.stringify({id})})
    }
    toast('Deleted successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const editPassword = (id) => {
    setform({...passwordArray.filter(item => item.id === id)[0], id:id})

    setpasswordArray(passwordArray.filter((item) => item.id !== id))


    // since this returns an array and we know taht would be only single element we would take the first value 
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copytext = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className='bg-slate-600 w-full h-screen py-8'>
        <div className=" mx-auto max-w-3xl rounded-xl border-solid border-2 border-slate-300 md:my-container">
          <h1 className='logo font-bold text-4xl text-white text-center'>
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
          </h1>
          <p className='text-green-400 text-lg font-semibold text-center'>Your own password manager</p>
          <div className="text-black flex flex-col p-4 gap-4 items-center ">
            <input value={form.site} onChange={handleChange} className='rounded-full w-full px-4  py-1 bg-transparent border-2 text-black ' placeholder='Enter website URL' type="text" name="site" id="site" />
            <div className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-8">
              <input value={form.username} onChange={handleChange} className='rounded-full w-full px-4 py-1  bg-transparent border-2 ' type="text" placeholder='Enter Username' name="username" id="username" />
              <div className="relative min-w-fit items-center">
                <input ref={pass_ref} value={form.password} onChange={handleChange} className='rounded-full w-full px-4 py-1 bg-transparent border-2  ' type="password" placeholder="Enter Password" name="password" id="password" />
                <span className='absolute right-0 top-1 p-2 py-0 cursor-pointer' onClick={ShowPassword} >
                  <img ref={ref} width={29} src="eye.png" alt="" />
                </span>
              </div>
            </div>
            <button onClick={SavePassword} className=' gap-2 w-fit flex justify-center items-center px-4 p-2 rounded-full bg-green-500 hover:bg-green-400'>
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover">
              </lord-icon>
              Add Password</button>
          </div>
        </div>

        <div className="passwords ">
          <h2 className='text-center text-2xl font-bold text-white py-3'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 &&
            <table className="table-auto content-fit  mx-auto bg-slate-700 text-white overflow-hidden rounded-lg py-4">
              <thead className='bg-slate-900'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {

                  return (
                    <tr key={index}>
                      <td className='border py-2 md:px-4 px-1'>
                        <div className='flex justify-between'>
                          <a href={item.site} target='_blank'>{item.site}</a>
                          <svg className='cursor-pointer' onClick={() => { copytext(item.site) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#22c55e" fill="none">
                            <path d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokelinejoin="round" />
                          </svg>
                        </div>
                      </td>
                      <td className='border  py-2 px-1 md:px-4 '>
                        <div className='flex justify-between'>
                          {item.username}
                          <svg className='cursor-pointer' onClick={() => { copytext(item.username) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#22c55e" fill="none">
                            <path d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </td>
                      <td className='border py-2 px-2 md:px-4 '>
                        <div className=' flex justify-between'>
                          {"*".repeat(item.password.length)}
                          <svg className='cursor-pointer' onClick={() => { copytext(item.password) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#22c55e" fill="none">
                            <path d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </td>
                      <td className='border py-2 px-2 md:px-4 '>
                        <div className=' flex justify-around mx-2'>

                          <span className='flex md:px-3 px-1' onClick={() => { editPassword(item.id) }}>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#22c55e"} fill={"none"} >
                              <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                              <path d="M13 4L20 11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                              <path d="M14 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>


                          <span className='flex px-3 ' onClick={() => { DeletePassword(item.id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#22c55e"} fill={"none"}>
                              <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </span>

                        </div>
                      </td>
                    </tr>

                  )
                })}

              </tbody>
            </table>}
        </div>
      </div>




    </>
  )
}

export default Manager
