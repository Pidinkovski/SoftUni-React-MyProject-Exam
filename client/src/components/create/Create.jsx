import './create.css';
import {useContext } from 'react';
import { useNavigate } from 'react-router';

import UserContext from '../../contexts/UserContext';
import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:3030'

export default function Create() {

    const { user , categories } = useContext(UserContext)
    const allCategories = Object.values(categories)
    const { request , isPending} = useRequest()
    const navigate = useNavigate()

    const onSubmitHandler = async() => {
        if(!data.title || !data.imageUrl || !data.description || !data.conciseContent || !data.category) {
            toast.error('All fields are required', {
                autoClose : 1500
            })
            return
        }

        if(data.description.length < 30) {
            toast.error('Description must be at least 30 characters long', {
                autoClose : 1500
            })
            return
        }

        if(data.conciseContent.length < 10 || data.conciseContent.length > 50) {
            toast.error('Concise content must be between 10 and 50 characters long', {
                autoClose : 1500
            })
            return
        } 
        try {
           const resp = await request(`${BASE_URL}/data/ideas`, 'POST', {...data  } , {accessToken : user.accessToken})
           navigate(`/ideas/${data.category}`)
        }catch(err) {
            toast.error(err.message, {
                autoClose : 1500
            })
            return
        }
        
    }

    const { data,
        formAction,
        dataSetterHandler
    } = useForm(onSubmitHandler, {
        title: '',
        imageUrl: '',
        description: '',
        conciseContent: '',
        category: ''
    })

    return (
        <section className="create-page">
            <div className="create-card">
                <h2 className="create-title">Create a New Idea</h2>

                <form className="create-form" action={formAction}>

                    <div className="form-item">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input
                            className="form-input"
                            id="title"
                            type="text"
                            name="title"
                            onChange={dataSetterHandler}
                            value={data.title}
                        />
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="imageUrl">Image URL</label>

                        <input
                            className="form-input"
                            id="imageUrl"
                            type="url"
                            name="imageUrl"
                            onChange={dataSetterHandler}
                            value={data.imageUrl}
                        />

                        {data.imageUrl && (
                            <img
                            src={data.imageUrl}
                            alt="Preview"
                            className="image-preview"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        )}
                        </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                            className="form-input textarea"
                            id="description"
                            name="description"
                            onChange={dataSetterHandler}
                            value={data.description}
                        ></textarea>
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="conciseContent">Concise Content</label>
                        <textarea
                            className="form-input textarea"
                            id="conciseContent"
                            name="conciseContent"
                            placeholder='Say in few fords what is it about'
                            onChange={dataSetterHandler}
                            value={data.conciseContent}
                        ></textarea>
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="category">Category</label>
                        <select
                            className="form-input"
                            id="category"
                            name="category"
                            onChange={dataSetterHandler}
                            value={data.category}
                        ><option value="">-- Choose a category --</option>
                            {allCategories.map((category) => <option
                                key={category.categoryType}
                                value={category.categoryType}>
                                {category.categoryAbout}
                            </option>)
                            }
                        </select>
                    </div>

                    <button type="submit" disabled={isPending} className="btn create-btn">
                        {isPending ? 'Creating ' : 'Create Idea'}
                    </button>

                </form>
            </div>
        </section>
    )
}