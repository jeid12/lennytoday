import React, { useEffect, useState } from 'react';
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    title: '',
    description: '',
    categories: '',
    imageurl: '',
};

const options = ["Travel", "Fashion", "Sports", "Food", "Technology"];

function AddEdetBlog() {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const { title, description, categories, imageurl } = formValue;
    const navigate = useNavigate();

    const { id } =useParams();

    useEffect(()=>{

        if(id){
            setEditMode(true)
            getSingleBlog(id)
        }else{
            setEditMode(false)
            setFormValue({...initialState})
        }
    } ,[id])

    const getSingleBlog =  async (id)=>{
        const singleBlog = await  axios.get(`https://lennytodaydata.onrender.com/blogs/${id}`)

        if (singleBlog.status === 200){
        setFormValue({...singleBlog.data});
        }else{
            toast.error("something went wrong")
        }

    }

    const getDate=()=>{
        let today =new Date();
        let dd= String(today.getDate()).padStart(2,"0");
        let mm=String(today.getMonth()+1).padStart(2,"0");
        let yyy= today.getFullYear();

        today = mm+ "/"+dd+"/"+yyy;
        return today;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categories) {
            setCategoryErrMsg("Please select a category");
            return;
        }


       // const imageValidation = !editMode ? imageurl : true;

        if (title && description && imageurl && categories){
            const currentDate = getDate();

            if(!editMode){
                const updatedBlogData = {...formValue, date:currentDate}
                const response = await axios.post("https://lennytodaydata.onrender.com/blogs",updatedBlogData);
                if (response.status=== 201){
                    toast.success("Blog added successfully!");
                }else{
                    toast.error("Error adding blog");
                    
                }
                
            }else{
                const response = await axios.put(`https://lennytodaydata.onrender.com/blogs/${id}`,formValue);
                if (response.status=== 200){
                    toast.success("Blog updated successfully!");
                }else{
                    toast.error("Error adding blog");
                    
                }
            }

            setFormValue({
                title: "",
                description: "",
                categories: "",
                imageurl: ""
              });
              navigate('/');
            }
           
     
    };

    const onInputChange = (e) => {
        let {name,value}=e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const onUploadImage = (e) => {
        
        const file = e.target.files[0];
        const formData = new FormData();
        console.log("file",file)
        formData.append("file", file);
        formData.append("upload_preset", "o65ng44i");
        axios.post("https://api.cloudinary.com/v1_1/dxufhhhbl/image/upload", formData)
            .then((resp) => {
                setFormValue({ ...formValue, imageurl: resp.data.secure_url });
                toast.success("Image uploaded successfully!");
            })
            .catch((err) => {
                toast.error("Error uploading image");
                console.error(err);
            });
    };

    const onCategoryChange = (e) => {
        setCategoryErrMsg(null)
        setFormValue({ ...formValue, categories: e.target.value });
    };

    return (
        <MDBValidation className='row g-3' style={{ marginTop: '100px' }} noValidate onSubmit={handleSubmit}>
            <p className='fs-2 fw-bold'>{ editMode ? "Update Blog" : "Add Blog"  }</p>
            <div style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center' }}>
                <MDBInput
                    value={title || ""}
                    onChange={onInputChange}
                    label='Title'
                    id='title'
                    type='text'
                    name='title'
                    required
                    validation='Please provide a title'
                    invalid
                />
                <br />
                <MDBTextArea
                    label="Description"
                    id="description"
                    rows="4"
                    value={description || ""}
                    onChange={onInputChange}
                    name='description'
                    required
                    validation='Please provide a description'
                    invalid
                />
                <br />
                {!editMode &&(
                   <>
                     <MDBInput
                    type='file'
                    onChange={onUploadImage}
                    required
                    validation='Please provide an image'
                    invalid
                />
                <br />
                   </>
                )

                }
              
                <select
                    className="categoryDropdown"
                    onChange={onCategoryChange}
                    value={categories}
                    required
                >
                    <option value="">Please select a category</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {categoryErrMsg && <div className="text-danger">{categoryErrMsg}</div>}
                <br />
                <MDBBtn type='submit' style={{ marginRight: "10px" }}>
                    {editMode ? "Update" :"Add"}
                </MDBBtn>
                <MDBBtn color='danger' style={{ marginRight: "10px" }} onClick={() => navigate('/')}>
                    Go back
                </MDBBtn>
            </div>
        </MDBValidation>
    );
}

export default AddEdetBlog;