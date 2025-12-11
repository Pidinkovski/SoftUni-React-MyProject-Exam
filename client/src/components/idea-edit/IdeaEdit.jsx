import { useParams } from 'react-router'
import './ideaEdit.css'
import useFetchOnMount from '../../hooks/useFetchOnMount'
import useForm from '../../hooks/useForm'
import { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'

const BASE_URL = 'http://localhost:3030'

const initialValues = {
    title: '',
    imageUrl: '',
    description: '',
    conciseContent: '',
    category: ''
}

export default function IdeaEdit() {

    const {categoryName , ideaId} = useParams()
    const {categories} = useContext(UserContext)
    const allCategories = Object.values(categories)
    const {currentData} = useFetchOnMount(`${BASE_URL}/data/ideas/${ideaId}`, {
        title: '',
        imageUrl: '',
        description: '',
        conciseContent: '',
        category: ''
        })

    const onEditHandler = (allData) => {
        console.log(allData);
        
    }
    const {data,
        dataSetterHandler ,
        formAction ,
        setData
    } = useForm(onEditHandler , initialValues)

    useEffect( () => {
        if(currentData) {
            setData({
                title: currentData.title,
                imageUrl: currentData.imageUrl,
                description: currentData.description,
                conciseContent: currentData.conciseContent,
                category: currentData.category
            })
        }
    } , [currentData])

        

    return (

        <section className="edit-page">
            <div className="edit-card">
                <h2 className="edit-title">Edit Idea</h2>

                <form className="edit-form" action={formAction}>
                    <div className="edit-item">
                        <label className="edit-label" htmlFor="title">Title</label>
                        <input
                            className="edit-input"
                            id="title"
                            type="text"
                            name="title"
                            onChange={dataSetterHandler}
                            value={data.title}
                        />
                    </div>

                    <div className="edit-item">
                        <label className="edit-label" htmlFor="imageUrl">Image URL</label>
                        <input
                            className="edit-input"
                            id="imageUrl"
                            type="text"
                            name="imageUrl"
                            onChange={dataSetterHandler}
                            value={data.imageUrl}
                        />
                    </div>

                    <div className="edit-item">
                        <label className="edit-label" htmlFor="description">Description</label>
                        <textarea
                            className="edit-input edit-textarea"
                            id="description"
                            name="description"
                            onChange={dataSetterHandler}
                            value={data.description}
                        ></textarea>
                    </div>

                    <div className="edit-item">
                        <label className="edit-label" htmlFor="conciseContent">Concise Content</label>
                        <textarea
                            className="edit-input edit-textarea"
                            id="conciseContent"
                            name="conciseContent"
                            onChange={dataSetterHandler}
                            value={data.conciseContent}
                        ></textarea>
                    </div>

                    <div className="edit-item">
                        <label className="edit-label" htmlFor="category">Category</label>
                        <select
                            className="edit-input"
                            id="category"
                            name="category"
                            onChange={dataSetterHandler}
                            value={data.category}
                        >
                            <option value="">-- Choose a category --</option>
                            {allCategories.map((category) => (
                                <option
                                    key={category.categoryType}
                                    value={category.categoryType}
                                >
                                    {category.categoryAbout}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn edit-btn">
                        Save Changes
                    </button>
                </form>
            </div>
        </section>
    )
}