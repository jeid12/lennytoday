import React, { useState } from 'react';
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
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
    const { title, description, categories, imageurl } = formValue;
    const navigate = useNavigate();

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
        if (title && description && imageurl && categories){
            const currentDate = getDate();
            const updatedBlogData = {...formValue, date:currentDate}
            const response = await axios.post("http://localhost:5000/blogs",updatedBlogData);
            if (response.status=== 201){
                toast.success("Blog added successfully!");
            }else{
                toast.error("Error adding blog");
                
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
            <p className='fs-2 fw-bold'>Add Blog</p>
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
                <MDBInput
                    type='file'
                    onChange={onUploadImage}
                    required
                    validation='Please provide an image'
                    invalid
                />
                <br />
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
                    Add
                </MDBBtn>
                <MDBBtn color='danger' style={{ marginRight: "10px" }} onClick={() => navigate('/')}>
                    Go back
                </MDBBtn>
            </div>
        </MDBValidation>
    );
}

export default AddEdetBlog;