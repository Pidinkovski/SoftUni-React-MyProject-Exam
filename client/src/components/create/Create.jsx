import './create.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

import UserContext from '../../contexts/UserContext';
import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';
import { toast } from 'react-toastify';
import useFormValidation from '../../hooks/validateCreateEditForm';
const BASE_URL = 'http://localhost:3030'

export default function Create() {

    const { validate, setErrors, errors, clearError } = useFormValidation()
    const { user, categories } = useContext(UserContext)
    const allCategories = Object.values(categories)
    const { request, isPending } = useRequest()
    const navigate = useNavigate()

    const onSubmitHandler = async () => {
        const validationErrors = validate(data);

        if (Object.keys(validationErrors).length > 0) {
            return
        }

        try {
            const resp = await request(`${BASE_URL}/data/ideas`, 'POST', { ...data }, { accessToken: user.accessToken })
            navigate(`/ideas/${data.category}`)
            toast.success('Succesfull creation' , {
                autoClose : 1500
            })
        } catch (err) {
            toast.error(err.message, {
                autoClose: 1500
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
                            className={`form-input ${errors.title ? "input-error" : ""}`}
                            name="title"
                            value={data.title}
                            onChange={(e) => {
                                clearError("title");
                                dataSetterHandler(e);
                            }}
                        />
                        {errors.title && <p className="error-text">{errors.title}</p>}
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="imageUrl">Image URL</label>

                        <input
                            className={`form-input ${errors.imageUrl ? "input-error" : ""}`}
                            name="imageUrl"
                            value={data.imageUrl}
                            onChange={(e) => {
                                clearError("imageUrl");
                                dataSetterHandler(e);
                            }}
                        />
                        {errors.imageUrl && <p className="error-text">{errors.imageUrl}</p>}
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

                            className={`form-input ${errors.description ? "input-error" : ""}`}
                            name="description"
                            value={data.description}
                            onChange={(e) => {
                                clearError("description");
                                dataSetterHandler(e);
                            }}
                        ></textarea>
                        {errors.description && <p className="error-text">{errors.description}</p>}
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="conciseContent">Concise Content</label>
                        <textarea

                            className={`form-input ${errors.conciseContent ? "input-error" : ""}`}
                            name="conciseContent"
                            value={data.conciseContent}
                            onChange={(e) => {
                                clearError("conciseContent");
                                dataSetterHandler(e);
                            }}
                        ></textarea>
                        {errors.conciseContent && <p className="error-text">{errors.conciseContent}</p>}
                    </div>

                    <div className="form-item">
                        <label className="form-label" htmlFor="category">Category</label>
                        <select
                            className={`form-input ${errors.category ? "input-error" : ""}`}
                            name="category"
                            value={data.category}
                            onChange={(e) => {
                                clearError("category");
                                dataSetterHandler(e);
                            }}
                        ><option value="">-- Choose a category --</option>
                            {allCategories.map((category) => <option
                                key={category.categoryType}
                                value={category.categoryType}>
                                {category.categoryAbout}
                            </option>)
                            }
                        </select>
                        {errors.category && <p className="error-text">{errors.category}</p>}
                    </div>

                    <button type="submit" disabled={isPending} className="btn create-btn">
                        {isPending ? 'Creating ' : 'Create Idea'}
                    </button>

                </form>
            </div>
        </section>
    )
}