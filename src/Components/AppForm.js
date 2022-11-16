import React, { useRef, useState } from "react";
const formState = {
    text1: "",
    text2: "",
    text3: "",
    text4: "+92-",
    text5: "",
    text6: "",
    text7: "",
    text8: [],

    forminfo: [],
};

const AppForm = () => {
    const [state, setState] = useState(formState);
    const [file, setFile] = useState(null);
    const [formData,setFormData]=useState({
        gender:"male",
        skills :["HTML","CSS"],
        city :"Islamabad"
    });
    const ref = useRef();
    function onSubmit() {
        
    }
    const handleChange = (e) => {
        setState((oldState) => {
          
            return {
                ...oldState,
                [e.target.name]: e.target.value,
            };
        });
    };
    const handleinfoChange = (e, dummyObject_) => {
        // here e stand for event and dummyobject is coming here from button click
        // see on button element i created an anonymous ftn first and then call this ftn why ?
        // because if you call directly it will call imidiatly when the comp render so this behavior is not good
        // to prevent it i created an anonymous ftn there to accpet event and then call the ftn
        console.log("e -", e);
        console.log("dummyObject -", dummyObject);
        setState((oldState) => {
            document.getElementById('display').style.display = 'block';
        document.getElementById('form').style.display = 'none';
            return {
                ...oldState,
                forminfo: [...oldState.forminfo, dummyObject_],
            };
            
        });
    };
    const dummyObject = {
        Id: Math.random(),
        email: state.text1,
        password: state.text2,
        name: state.text3,
        phone_no: state.text4,
        gender: state.text5,
        city: state.text6,
        address: state.text7,
        skills: [state.text8],
        // adding img src here from internet
        Image:
            "https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    };

    const handleImage = (e) => {
        let reader = new FileReader();
        // reading files

        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            ref.current?.setAttribute("src", reader.result);
            setFile(reader.result);
        };
    };
    const handleFormDataChange =(e)=>{
        setFormData(old=>{
            return {...old,[e.target.name]:e.target.value}
        })
        if(e.target.value==="others"){
        document.getElementById('insert').style.display='inline';
        }
        return ;
    }
    const handleCheckboxChange =(e)=>{
        setFormData(old=>{
            // old.skills = ["html","css"]
            let  newSkills = [...old.skills];
            // newSkills=["html","css"]
            if(e.target.checked === true){
                newSkills.unshift(e.target.value);
            }else{
                newSkills = newSkills.filter(oldSkill=>oldSkill !== e.target.value); //oldsskill => html  | e.target.value=>html
                //newSkills= [css]
            }
            return {...old,skills:newSkills}
        })
    }
   
    return <>

        <div id="form" onSubmit={(e) => onSubmit()}>
        <table border={20} cellPadding="14" cellSpacing="42" align="center"  width="50%" className="table">
            <tr>
                <div>
            <label>Email :</label>
            <input onChange={handleChange} type="email" name="text1" placeholder="Enter Email" value={state.text1} /><br></br><br></br>
            <label>password :</label>
            <input onChange={handleChange} type="password" name="text2" placeholder="Enter password" value={state.text2} /><br></br><br></br>
            <label>Name :</label>
            <input onChange={handleChange} type="text" name="text3" placeholder="Enter Name" value={state.text3} /><br></br><br></br>
            <label>Phone Number :</label>
            <input onChange={handleChange} type="text" name="text4" placeholder="Enter Phone Number"  value={state.text4} /><br></br><br></br>
            <div onChange={handleChange} >
                <label >Gender:</label> Male <input type="radio" name="gender" value="male" onChange={handleFormDataChange}  checked={formData.gender.includes("male")} />
                Female <input type="radio" name="gender" value={"female"} onChange={handleFormDataChange}  checked={formData.gender.includes("female")}/> </div><br></br><br></br>
            <label>Skills :</label> HTML
             <input onChange={handleCheckboxChange} type="checkbox" name="skills" value="HTML"   checked={formData.skills.includes("HTML")}/>
            CSS <input onChange={handleCheckboxChange} type="checkbox" name="skills" value="CSS"   checked={formData.skills.includes("CSS")}/>
            ReactJS <input onChange={handleCheckboxChange} type="checkbox" name="skills" value={"React JS"}  checked={formData.skills.includes("React JS")}/>
            NodeJS <input onChange={handleCheckboxChange} type="checkbox" name="skills" value={"Node js"} checked={formData.skills.includes("Node js")} />
            AngularJS <input onChange={handleCheckboxChange} type="checkbox" name="skills" value={"Angular js"} checked={formData.skills.includes("Angular js")} />
            Wordpress <input onChange={handleCheckboxChange} type="checkbox" name="skills" value={"Wordpress"}  checked={formData.skills.includes("Wordpress")}/><br></br><br></br>
            <label >Choose a city:</label>
            <select name="city" value={formData.city} onChange={handleFormDataChange}>
               
                {
                    ["Islamabad","Lahore","Karachi","others",].map(city=>{
                        return <option value={city} key={city}>{city}</option>
                    })
                }
                
            </select><br></br> <input type="text" id="insert" name="city"   onChange={handleFormDataChange}  style={{display:'none',float:'center'}} placeholder="Enter City"/><br></br>
            

            <label> Address:   </label><br></br><textarea onChange={handleChange} name="text7" rows="2" cols="40" value={state.text7} /><br></br><br></br>
            <label>Profile Picture:</label><input onChange={handleImage} type="file" name="image" /><br></br><br></br>
            <button
                onClick={(e) =>
                    handleinfoChange(e, { ...dummyObject, Image: file ?? "" })
                }
            >
                submit{" "}
            </button>
            </div>
            </tr>
         </table>
           
         
        </div>
        <div id="display" style={{ display: 'none' }}>
            <h1>View Page</h1>
            {state.forminfo.map((forminfo) => {
                return (
                    <div className={{ color: 'red' }} key={forminfo.email + Date.now() + Math.random() * 2423}>
                        <br></br>


                        <table border={2} cellPadding="4" cellSpacing="12">
                            <tr><th>Email</th><th>Name</th><th>Phone #</th><th>Address</th><th>Gender</th><th>Skills</th><th>City</th><th>Image</th></tr>
                            <tr><td>{forminfo.email}</td>
                                <td>{forminfo.name}</td>

                                <td>{forminfo.phone_no}</td>

                                <td>  {forminfo.address}</td>
                                <td>  {formData.gender}</td>

                                <td>  {formData.skills.map(data=>{
                                    return <li key={data}>{data}</li>
                                })}</td>
                                <td>  {formData.city}</td>


                                <td><img src={forminfo.Image} alt="" height={100} width={100} /></td></tr></table> </div>
                );
            })}

        </div>





    </>
};
export default AppForm;